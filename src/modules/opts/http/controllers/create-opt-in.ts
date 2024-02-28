import { FastifyReply, FastifyRequest } from 'fastify'
import { addYears, isAfter, isBefore, isSameDay } from 'date-fns'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeCreateOptInUseCase } from '@modules/opts/use-cases/factories/make-create-opt-in'

const bodySchema = z.object({
  company_name: z.string(zodStringParser('nome da empresa')),
  company_document: z
    .string(zodStringParser('CPF/CNPJ'))
    .min(11, 'O CPF deve ter 11 caracteres.')
    .max(14, 'O CNPJ deve ter 14 caracteres.'),
  financial_agent_document: z
    .string(zodStringParser('CPF/CNPJ'))
    .min(11, 'O CPF deve ter 11 caracteres.')
    .max(14, 'O CNPJ deve ter 14 caracteres.'),
  responsible_name: z.string(zodStringParser('nome do responsável')),
  responsible_email: z
    .string(zodStringParser('e-mail do responsável'))
    .email('O e-mail do responsável informado é inválido.'),
  responsible_phone: z
    .string(zodStringParser('telefone do responsável'))
    .min(1, 'O telefone é obrigatório.'),
  responsible_document: z
    .string(zodStringParser('CPF do responsável'))
    .transform((cpf) => cpf.replace(/\D/g, '')),
  signature_date: z.string(zodStringParser('data de assinatura')),
  activation_date: z.string(zodStringParser('data de ativação')),
  expiration_date: z.string(zodStringParser('data de expiração')).optional(),
})

export async function createOptIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    company_name: companyName,
    company_document: companyDocument,
    financial_agent_document: financialAgentDocument,
    responsible_name: responsibleName,
    responsible_email: responsibleEmail,
    responsible_phone: responsiblePhone,
    responsible_document: responsibleDocument,
    signature_date: signatureDate,
    activation_date: activationDate,
    expiration_date: expirationDate,
  } = bodySchema.parse(request.body)

  const today = new Date()

  function isExpirationDateWithin2Years(expirationDate: string) {
    const twoYearsFromNow = addYears(today, 2)
    return isBefore(expirationDate, twoYearsFromNow)
  }

  // Verifica se a data de expiração é válida
  if (expirationDate && !isExpirationDateWithin2Years(expirationDate)) {
    throw new Error(
      'A data de expiração deve ser no máximo 2 anos a partir de hoje.',
    )
  }

  // Verifica se a data de expiração é posterior a hoje
  if (expirationDate) {
    const isExpirationDateAfterToday = isAfter(expirationDate, today)
    if (!isExpirationDateAfterToday) {
      throw new Error('A data de expiração deve ser posterior a hoje.')
    }
  }

  // Verifica se a data de assinatura é anterior ou igual a hoje
  if (!isBefore(signatureDate, today) && !isSameDay(signatureDate, today)) {
    throw new Error('A data de assinatura deve ser anterior ou igual a hoje.')
  }

  // Verifica se a data de ativação é igual ou posterior a hoje
  if (isBefore(activationDate, today) && !isSameDay(activationDate, today)) {
    throw new Error('A data de ativação deve ser igual ou posterior a hoje.')
  }

  // Verifica se a data de ativação é anterior à data de expiração
  if (expirationDate && isAfter(activationDate, expirationDate)) {
    throw new Error('A data de ativação deve ser anterior à data de expiração.')
  }
  const createOptInUseCase = makeCreateOptInUseCase()

  const isSignatureDateValid = isBefore(signatureDate, today)
    ? signatureDate
    : today
  const isActivationDateValid = isSameDay(activationDate, today)
    ? activationDate
    : today

  await createOptInUseCase.execute({
    companyName,
    companyDocument,
    financialAgentDocument,
    responsibleName,
    responsibleEmail,
    responsiblePhone,
    responsibleDocument,
    signatureDate: isSignatureDateValid as string,
    activationDate: isActivationDateValid as string,
    expirationDate,
  })

  return reply.status(201).send()
}

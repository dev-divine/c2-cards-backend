import { addYears, isAfter, isBefore, isSameDay } from 'date-fns'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeCreateOptInUseCase } from '@modules/opt/use-cases/factories/make-create-opt-in'
import { OptInViewModel } from '@modules/opt/http/view-models/opt-in-view-model'

const bodySchema = z.object({
  companyName: z.string(zodStringParser('nome da empresa')),
  companyDocument: z
    .string(zodStringParser('CPF/CNPJ'))
    .min(11, 'O CPF deve ter 11 caracteres.')
    .max(14, 'O CNPJ deve ter 14 caracteres.'),
  financialAgentDocument: z
    .string(zodStringParser('CPF/CNPJ'))
    .min(11, 'O CPF deve ter 11 caracteres.')
    .max(14, 'O CNPJ deve ter 14 caracteres.'),
  responsibleName: z.string(zodStringParser('nome do responsável')),
  responsibleEmail: z
    .string(zodStringParser('e-mail do responsável'))
    .email('O e-mail do responsável informado é inválido.'),
  responsiblePhone: z
    .string(zodStringParser('telefone do responsável'))
    .min(1, 'O telefone é obrigatório.'),
  responsibleDocument: z
    .string(zodStringParser('CPF do responsável'))
    .transform((cpf) => cpf.replace(/\D/g, '')),
  signatureDate: z.string(zodStringParser('data de assinatura')),
  activationDate: z.string(zodStringParser('data de ativação')),
  expirationDate: z.string(zodStringParser('data de expiração')).optional(),
})

export async function createOptIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    companyName,
    companyDocument,
    financialAgentDocument,
    responsibleName,
    responsibleEmail,
    responsiblePhone,
    responsibleDocument,
    signatureDate,
    activationDate,
    expirationDate,
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

  const { optIn } = await createOptInUseCase.execute({
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

  return reply.status(201).send({
    optIn: optIn ? OptInViewModel.toHTTP(optIn) : undefined,
  })
}

import { addYears, isAfter, isBefore, isSameDay } from 'date-fns'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeCreateContractUseCase } from '@modules/contract/use-cases/factories/make-create-contract'

const bodySchema = z.object({
  debtor_contract_document: z
    .string(zodStringParser('CPF/CNPJ do EC'))
    .min(11, 'O CPF deve ter 11 caracteres.')
    .max(14, 'O CNPJ deve ter 14 caracteres.'),
  holder_document: z
    .string(zodStringParser('CPF/CNPJ do agente financeiro'))
    .min(11, 'O CPF deve ter 11 caracteres.')
    .max(14, 'O CNPJ deve ter 14 caracteres.'),
  contract_effect_type: z.number(zodStringParser('tipo de efeito do contrato')),
  outstanding_balance_or_limit: z.number(
    zodStringParser('limite de operação garantida'),
  ),
  minimum_value_to_be_maintained: z.number(
    zodStringParser('valor mínimo a ser mantido'),
  ),
  signature_date: z.string(zodStringParser('data de assinatura')),
  expiration_date: z.string(zodStringParser('data de expiração')),
})

export async function createContract(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    debtor_contract_document: debtorContractDocument,
    holder_document: holderDocument,
    contract_effect_type: contractEffectType,
    outstanding_balance_or_limit: outstandingBalanceOrLimit,
    minimum_value_to_be_maintained: minimumValueToBeMaintained,
    signature_date: signatureDate,
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

  const createContractUseCase = makeCreateContractUseCase()

  const isSignatureDateValid = isBefore(signatureDate, today)
    ? signatureDate
    : today

  await createContractUseCase.execute({
    debtorContractDocument,
    holderDocument,
    contractEffectType,
    outstandingBalanceOrLimit,
    minimumValueToBeMaintained,
    signatureDate: isSignatureDateValid as string,
    expirationDate,
  })

  return reply.status(201).send()
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeEditContractUseCase } from '@modules/contract/use-cases/factories/make-edit-contract'

const bodySchema = z.object({
  external_code: z.string(zodStringParser('código externo')),
  outstanding_balance_or_limit: z.number(
    zodStringParser('limite de operação garantida'),
  ),
  minimum_value_to_be_maintained: z.number(
    zodStringParser('valor mínimo a ser mantido'),
  ),
})

export async function editContract(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    external_code: externalCode,
    outstanding_balance_or_limit: outstandingBalanceOrLimit,
    minimum_value_to_be_maintained: minimumValueToBeMaintained,
  } = bodySchema.parse(request.body)

  const editContractUseCase = makeEditContractUseCase()

  await editContractUseCase.execute({
    externalCode,
    outstandingBalanceOrLimit,
    minimumValueToBeMaintained,
  })

  return reply.status(204).send()
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeRemoveURUseCase } from '@modules/ur/use-cases/factories/make-remove-ur'

const bodySchema = z.object({
  operation_type: z.string(zodStringParser('tipo de operação')),
  external_contract_code: z.string(
    zodStringParser('código externo do contrato'),
  ),
  contract_identifier: z.string(zodStringParser('identificador do contrato')),
})

export async function removeUr(request: FastifyRequest, reply: FastifyReply) {
  const {
    operation_type: operationType,
    external_contract_code: externalContractCode,
    contract_identifier: contractIdentifier,
  } = bodySchema.parse(request.body)

  const removeURUseCase = makeRemoveURUseCase()

  await removeURUseCase.execute({
    operationType,
    externalContractCode,
    contractIdentifier,
  })

  return reply.status(204).send()
}

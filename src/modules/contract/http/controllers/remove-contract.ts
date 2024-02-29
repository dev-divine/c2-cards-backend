import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeRemoveContractUseCase } from '@modules/contract/use-cases/factories/make-remove-contract'

const bodySchema = z.object({
  operation_type: z.string(zodStringParser('tipo de operação')),
  external_code: z.string(zodStringParser('código externo')),
  contract_identifier: z.string(zodStringParser('identificador do contrato')),
})

export async function removeContract(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    operation_type: operationType,
    external_code: externalCode,
    contract_identifier: contractIdentifier,
  } = bodySchema.parse(request.body)

  const removeContractUseCase = makeRemoveContractUseCase()

  await removeContractUseCase.execute({
    operationType,
    externalCode,
    contractIdentifier,
  })

  return reply.status(204).send()
}

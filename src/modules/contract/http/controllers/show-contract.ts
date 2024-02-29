import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeShowContractUseCase } from '@modules/contract/use-cases/factories/make-show-contract'
import { ContractViewModel } from '@modules/contract/http/view-models/contract-view-model'

const querySchema = z.object({
  external_code: z.string(zodStringParser('código externo')),
  contract_identifier: z.string(zodStringParser('identificador do contrato')),
})

export async function showContract(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    external_code: externalCode,
    contract_identifier: contractIdentifier,
  } = querySchema.parse(request.query)

  const showContractUseCase = makeShowContractUseCase()

  const { contract } = await showContractUseCase.execute({
    externalCode,
    contractIdentifier,
  })

  return reply.status(200).send({
    contract: contract ? ContractViewModel.toHTTP(contract) : undefined,
  })
}

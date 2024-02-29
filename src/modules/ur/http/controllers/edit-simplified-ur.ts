import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeEditSimplifiedURUseCase } from '@modules/ur/use-cases/factories/make-edit-simplified-ur'

const bodySchema = z.object({
  operation_type: z.string(zodStringParser('tipo de operação')),
  external_contract_code: z.string(
    zodStringParser('código externo do contrato'),
  ),
  contract_identifier: z.string(zodStringParser('identificador do contrato')),
  covered_receivables: z.any({ description: 'recebiveis abrangidos' }),
})

export async function editSimplifiedUr(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    operation_type: operationType,
    external_contract_code: externalContractCode,
    contract_identifier: contractIdentifier,
    covered_receivables: coveredReceivables,
  } = bodySchema.parse(request.body)

  const editSimplifiedURUseCase = makeEditSimplifiedURUseCase()

  await editSimplifiedURUseCase.execute({
    operationType,
    externalContractCode,
    contractIdentifier,
    coveredReceivables,
  })

  return reply.status(200).send()
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodDateParser, zodNumberParser } from '@core/utils/custom-zod-error'

import { makeListContractsUseCase } from '@modules/contract/use-cases/factories/make-list-contracts'
import { ContractViewModel } from '@modules/contract/http/view-models/contract-view-model'

export const querySchema = z.object({
  page: z.coerce
    .number(zodNumberParser('página'))
    .int({ message: 'O campo página deve ser um número inteiro.' })
    .positive({ message: 'O campo valor deve ser um número positivo.' })
    .finite({ message: 'O campo valor deve ser um número finito.' })
    .optional()
    .default(1),

  per_page: z.coerce
    .number(zodNumberParser('quantidade por página'))
    .int({
      message: 'O campo quantidade por página deve ser um número inteiro.',
    })
    .positive({
      message: 'O campo quantidade por página deve ser um número positivo.',
    })
    .finite({
      message: 'O campo quantidade por página deve ser um número finito.',
    })
    .optional()
    .default(20),
  start_date: z.coerce.date(zodDateParser('data de início')).optional(),
  end_date: z.coerce.date(zodDateParser('data de fim')).optional(),
})

export async function listContracts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    page,
    per_page: perPage,
    start_date: startDate,
    end_date: endDate,
  } = querySchema.parse(request.query)

  const listContractsUseCase = makeListContractsUseCase()

  const { contracts, totalPages, totalContracts } =
    await listContractsUseCase.execute({
      page,
      perPage,
      startDate,
      endDate,
    })

  return reply.status(200).send({
    contracts:
      contracts?.map((contract) => ContractViewModel.toHTTP(contract)) ?? [],
    total_pages: totalPages,
    total_contracts: totalContracts,
  })
}

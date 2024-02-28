import { FastifyReply, FastifyRequest } from 'fastify'

import { querySchema } from '@core/utils/zod-pagination-query-schema'

import { makeListECClientsUseCase } from '@modules/ec-clients/use-cases/factories/make-list-ec-client'
import { CitizenViewModel } from '@modules/citizen/http/view-models/citizen-view-model'

export async function listECClients(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page, per_page: perPage } = querySchema.parse(request.query)

  const listECClientsUseCase = makeListECClientsUseCase()

  const { ecClients, totalPages } = await listECClientsUseCase.execute({
    page,
    perPage,
  })

  return reply.status(200).send({
    citizens:
      citizens?.map((citizen) => CitizenViewModel.toHTTP(citizen)) ?? [],
    totalPages,
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'

import { querySchema } from '@core/utils/zod-pagination-query-schema'

import { makeListECClientsUseCase } from '@modules/ec-client/use-cases/factories/make-list-ec-client'
import { ECClientViewModel } from '@modules/ec-client/http/view-models/ec-client-view-model'

export async function listECClients(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page, per_page: perPage } = querySchema.parse(request.query)

  const listECClientsUseCase = makeListECClientsUseCase()

  const { eCClients, totalPages } = await listECClientsUseCase.execute({
    page,
    perPage,
  })

  return reply.status(200).send({
    citizens:
      eCClients?.map((eCClient) => ECClientViewModel.toHTTP(eCClient)) ?? [],
    totalPages,
  })
}

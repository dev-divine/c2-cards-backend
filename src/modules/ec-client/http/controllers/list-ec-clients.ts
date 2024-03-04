import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodNumberParser } from '@core/utils/custom-zod-error'

import { EcClientViewModel } from '@modules/ec-client/http/view-models/ec-client-view-model'
import { makeListECClientsUseCase } from '@modules/ec-client/use-cases/factories/make-list-ec-client'

const querySchema = z.object({
  page: z.coerce
    .number(zodNumberParser('página'))
    .int({ message: 'O campo página deve ser um número inteiro.' })
    .positive({ message: 'O campo valor deve ser um número positivo.' })
    .finite({ message: 'O campo valor deve ser um número finito.' })
    .optional()
    .default(1),

  perPage: z.coerce
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
})

export async function listECClients(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page, perPage } = querySchema.parse(request.query)

  const listECClientsUseCase = makeListECClientsUseCase()

  const { ecClients, totalPages } = await listECClientsUseCase.execute({
    page,
    perPage,
  })

  return reply.status(200).send({
    ecClients:
      ecClients?.map((ecClient) => EcClientViewModel.toHTTP(ecClient)) ?? [],
    totalPages,
  })
}

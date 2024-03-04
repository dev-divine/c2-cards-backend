import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodNumberParser } from '@core/utils/custom-zod-error'

import { makeListUsersUseCase } from '@modules/user/use-cases/factories/make-list-users'
import { UserViewModel } from '@modules/user/http/view-models/user-view-model'

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

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const { page, perPage } = querySchema.parse(request.query)

  const listUsersUseCase = makeListUsersUseCase()

  const { users, totalPages } = await listUsersUseCase.execute({
    page,
    perPage,
  })

  return reply.status(200).send({
    users: users?.map((user) => UserViewModel.toHTTP(user)) ?? [],
    totalPages,
  })
}

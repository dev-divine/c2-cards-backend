import { FastifyReply, FastifyRequest } from 'fastify'

import { querySchema } from '@core/utils/zod-pagination-query-schema'

import { makeListUsersUseCase } from '@modules/user/use-cases/factories/make-list-users'
import { UserViewModel } from '@modules/user/http/view-models/user-view-model'

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const { page, per_page: perPage } = querySchema.parse(request.query)

  const listUsersUseCase = makeListUsersUseCase()

  const { users, totalPages, sportsFacilitiesOptions } =
    await listUsersUseCase.execute({
      page,
      perPage,
    })

  return reply.status(200).send({
    users: users?.map((user) => UserViewModel.toHTTP(user)) ?? [],
    totalPages,
    sportsFacilitiesOptions,
  })
}

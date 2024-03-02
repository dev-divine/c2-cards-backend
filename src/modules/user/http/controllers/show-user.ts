import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeShowUserUseCase } from '@modules/user/use-cases/factories/make-show-user'
import { UserViewModel } from '@modules/user/http/view-models/user-view-model'

const paramsSchema = z.object({
  id: z
    .string(zodStringParser('id'))
    .uuid({ message: 'O campo id deve ser um uuid.' }),
})

export async function showUser(request: FastifyRequest, reply: FastifyReply) {
  const { id } = paramsSchema.parse(request.params)

  const showUserUseCase = makeShowUserUseCase()

  const { user } = await showUserUseCase.execute({
    id,
  })

  return reply.status(200).send({
    user: user ? UserViewModel.toHTTP(user) : null,
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'

import { makeProfileUseCase } from '@modules/user/use-cases/factories/make-profile'
import { UserViewModel } from '@modules/user/http/view-models/user-view-model'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileUseCase = makeProfileUseCase()

  const { user } = await profileUseCase.execute({
    user: request.user.data,
  })

  return reply.status(200).send({
    user: user ? UserViewModel.toHTTP(user) : null,
  })
}

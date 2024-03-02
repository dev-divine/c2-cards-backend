import { FastifyReply, FastifyRequest } from 'fastify'

import { makeUserProfileUseCase } from '@modules/user/use-cases/factories/make-user-profile'
import { UserViewModel } from '@modules/user/http/view-models/user-view-model'

export async function userProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const userProfileUseCase = makeUserProfileUseCase()

  const { rawUser } = await userProfileUseCase.execute({
    userId: request.user.sub,
  })

  const userToReturn = rawUser ? UserViewModel.toHTTP(rawUser) : null

  return reply.status(200).send({
    user: userToReturn,
  })
}

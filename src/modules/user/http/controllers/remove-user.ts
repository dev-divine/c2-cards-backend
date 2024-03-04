import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeRemoveUserUseCase } from '@modules/user/use-cases/factories/make-remove-user'

const paramsSchema = z.object({
  id: z
    .string(zodStringParser('id'))
    .uuid({ message: 'O campo id deve ser um uuid.' }),
})

export async function removeUser(request: FastifyRequest, reply: FastifyReply) {
  const { id } = paramsSchema.parse(request.params)

  const removeUserUseCase = makeRemoveUserUseCase()

  const { success } = await removeUserUseCase.execute({
    id,
  })

  return reply.status(200).send({
    success,
  })
}

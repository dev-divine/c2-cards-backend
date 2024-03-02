import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeDeleteUserUseCase } from '@modules/user/use-cases/factories/make-delete-user'

const paramsSchema = z.object({
  id: z
    .string(zodStringParser('id'))
    .uuid({ message: 'O campo id deve ser um uuid.' }),
})

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const { id } = paramsSchema.parse(request.params)

  const deleteUserUseCase = makeDeleteUserUseCase()

  await deleteUserUseCase.execute({
    id,
  })

  return reply.status(204).send()
}

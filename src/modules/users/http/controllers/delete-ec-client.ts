import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeDeleteECClientUseCase } from '@modules/ec-client/use-cases/factories/make-delete-ec-client'

const paramsSchema = z.object({
  id: z
    .string(zodStringParser('id'))
    .uuid({ message: 'O campo id deve ser um uuid.' }),
})

export async function deleteECClient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const deleteECClientUseCase = makeDeleteECClientUseCase()

  await deleteECClientUseCase.execute({
    id,
  })

  return reply.status(204).send()
}

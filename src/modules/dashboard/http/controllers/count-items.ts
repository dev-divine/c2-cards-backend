import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCountItemsUseCase } from '@modules/dashboard/use-cases/factories/make-count-items'

export async function countItems(request: FastifyRequest, reply: FastifyReply) {
  const countItemsUseCase = makeCountItemsUseCase()

  const { eCClientCount, optInCount, uRCount } =
    await countItemsUseCase.execute()

  return reply.status(200).send({
    ec_client_count: eCClientCount,
    opt_in_count: optInCount,
    ur_count: uRCount,
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodNumberParser, zodStringParser } from '@core/utils/custom-zod-error'

import { OptOutViewModel } from '@modules/opt/http/view-models/opt-out-view-model'
import { makeListOptOutsUseCase } from '@modules/opt/use-cases/factories/make-list-opt-outs'

export const querySchema = z.object({
  page: z.coerce
    .number(zodNumberParser('página'))
    .int({ message: 'O campo página deve ser um número inteiro.' })
    .positive({ message: 'O campo valor deve ser um número positivo.' })
    .finite({ message: 'O campo valor deve ser um número finito.' })
    .optional()
    .default(1),

  per_page: z.coerce
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
  id: z.string(zodStringParser('id')).optional(),
})

export async function listOptOuts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page, per_page: perPage, id } = querySchema.parse(request.query)

  const listOptOutsUseCase = makeListOptOutsUseCase()

  const { optOuts } = await listOptOutsUseCase.execute({
    page,
    perPage,
    id,
  })

  return reply.status(200).send({
    opt_outs: optOuts?.map((optOut) => OptOutViewModel.toHTTP(optOut)) ?? [],
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import {
  zodDateParser,
  zodNumberParser,
  zodStringParser,
} from '@core/utils/custom-zod-error'

import { makeListOptOutsUseCase } from '@modules/opts/use-cases/factories/make-list-opt-outs'
import { OptOutViewModel } from '@modules/opts/http/view-models/opt-out-view-model'

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
  start_date: z.coerce.date(zodDateParser('data de início')).optional(),
  end_date: z.coerce.date(zodDateParser('data de fim')).optional(),
})

export async function listOptOuts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page, per_page: perPage, id } = querySchema.parse(request.query)

  const listOptOutsUseCase = makeListOptOutsUseCase()

  const { optOuts, totalPages } = await listOptOutsUseCase.execute({
    page,
    perPage,
    id,
  })

  return reply.status(200).send({
    opt_outs: optOuts?.map((optOut) => OptOutViewModel.toHTTP(optOut)) ?? [],
    total_pages: totalPages,
  })
}

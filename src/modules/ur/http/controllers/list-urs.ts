import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodDateParser, zodNumberParser } from '@core/utils/custom-zod-error'

import { makeListURsUseCase } from '@modules/ur/use-cases/factories/make-list-urs'

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
  start_date: z.coerce.date(zodDateParser('data de início')).optional(),
  end_date: z.coerce.date(zodDateParser('data de fim')).optional(),
})

export async function listUrs(request: FastifyRequest, reply: FastifyReply) {
  const {
    page,
    per_page: perPage,
    start_date: startDate,
    end_date: endDate,
  } = querySchema.parse(request.query)
  const listURsUseCase = makeListURsUseCase()

  const { totalPages, totalUrs, urs } = await listURsUseCase.execute({
    page,
    perPage,
    startDate,
    endDate,
  })

  return reply.status(200).send({
    urs: urs?.map((ur) => CitizenViewModel.toHTTP(ur)) ?? [],
    total_urs: totalUrs,
    total_pages: totalPages,
  })
}

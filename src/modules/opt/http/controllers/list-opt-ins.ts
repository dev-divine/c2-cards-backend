import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodDateParser, zodNumberParser } from '@core/utils/custom-zod-error'

import { OptInViewModel } from '@modules/opt/http/view-models/opt-in-view-model'
import { makeListOptInsUseCase } from '@modules/opt/use-cases/factories/make-list-opt-ins'

export const querySchema = z.object({
  page: z.coerce
    .number(zodNumberParser('página'))
    .int({ message: 'O campo página deve ser um número inteiro.' })
    .positive({ message: 'O campo valor deve ser um número positivo.' })
    .finite({ message: 'O campo valor deve ser um número finito.' })
    .optional()
    .default(1),

  perPage: z.coerce
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
  startDate: z.string(zodDateParser('data de início')).optional(),
  endDate: z.string(zodDateParser('data de fim')).optional(),
})

export async function listOptIns(request: FastifyRequest, reply: FastifyReply) {
  const { page, perPage, startDate, endDate } = querySchema.parse(request.query)

  const listOptInsUseCase = makeListOptInsUseCase()

  const { optIns, totalPages, totalOptIns } = await listOptInsUseCase.execute({
    page,
    perPage,
    startDate,
    endDate,
  })

  return reply.status(200).send({
    optIns: optIns?.map((optIn) => OptInViewModel.toHTTP(optIn)) ?? [],
    totalPages,
    totalOptIns,
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import {
  zodDateParser,
  zodNumberParser,
  zodStringParser,
} from '@core/utils/custom-zod-error'

import { makeSaveUserUseCase } from '@modules/user/use-cases/factories/make-save-user'
import { UserViewModel } from '@modules/user/http/view-models/user-view-model'

const paramsSchema = z.object({
  id: z
    .string(zodStringParser('id'))
    .uuid({ message: 'O campo id deve ser um uuid.' }),
})

const bodySchema = z.object({
  sports_facility_id: z
    .string(zodStringParser('centro esportivo'))
    .uuid({ message: 'O campo centro esportivo deve ser um uuid.' }),
  name: z.string(zodStringParser('nome')),
  email: z
    .string(zodStringParser('e-mail'))
    .email('O e-mail informado é inválido.'),
  document: z.string(zodStringParser('CPF')),
  phone: z
    .string(zodStringParser('telefone'))
    .min(13, 'O telefone deve ter 13 caracteres.')
    .max(14, 'O telefone deve ter 14 caracteres.'),
  position: z.string(zodStringParser('posição')),
  job: z.string(zodStringParser('cargo')),
  role: z.enum(['SECRETARY', 'DIRECTOR', 'DIVISION_HEAD']),
  last_rent: z.coerce.date(zodDateParser('último aluguel')).optional(),
  number_of_rentals: z.number(zodNumberParser('número de aluguéis')).optional(),
})

export async function saveUser(request: FastifyRequest, reply: FastifyReply) {
  const { id } = paramsSchema.parse(request.params)

  const {
    sports_facility_id: sportsFacilityId,
    name,
    email,
    document,
    phone,
    position,
    job,
    role,
    last_rent: lastRent,
    number_of_rentals: numberOfRentals,
  } = bodySchema.parse(request.body)

  const saveUserUseCase = makeSaveUserUseCase()

  const { user } = await saveUserUseCase.execute({
    id,
    sportsFacilityId,
    name,
    email,
    document,
    phone,
    position,
    job,
    role,
    lastRent,
    numberOfRentals,
  })

  return reply.status(200).send({
    user: user ? UserViewModel.toHTTP(user) : null,
  })
}

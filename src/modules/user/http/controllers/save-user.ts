import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import {
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
  name: z.string(zodStringParser('nome')),
  surname: z.string(zodStringParser('nome')),
  email: z
    .string(zodStringParser('e-mail'))
    .email('O e-mail informado é inválido.'),
  document: z.string(zodStringParser('CPF')),
  phone: z
    .string(zodStringParser('telefone'))
    .min(13, 'O telefone deve ter 13 caracteres.')
    .max(14, 'O telefone deve ter 14 caracteres.'),
  whatsapp: z
    .string(zodStringParser('whatsapp'))
    .min(13, 'O whatsapp deve ter 13 caracteres.')
    .max(14, 'O whatsapp deve ter 14 caracteres.'),
  job: z.string(zodStringParser('cargo')),
  role: z.enum(['CLIENTE_EC']),
})

export async function saveUser(request: FastifyRequest, reply: FastifyReply) {
  const { id } = paramsSchema.parse(request.params)

  const {
    name,
    surname,
    email,
    document,
    phone,
    whatsapp,
    job,
    role
  } = bodySchema.parse(request.body)

  const saveUserUseCase = makeSaveUserUseCase()

  const { user } = await saveUserUseCase.execute({
    id,
    name,
    surname,
    email,
    document,
    phone,
    whatsapp,
    job,
    role,
  })

  return reply.status(200).send({
    user: user ? UserViewModel.toHTTP(user) : null,
  })
}

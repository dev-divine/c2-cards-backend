import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { UserViewModel } from '@modules/user/http/view-models/user-view-model'
import { makeCreateUserUseCase } from '@modules/user/use-cases/factories/make-create-user'
import { Role } from '@modules/user/entities/user'

const bodySchema = z.object({
  name: z.string(zodStringParser('nome')).min(1, 'O nome é obrigatório.'),
  document: z
    .string(zodStringParser('CPF'))
    .min(11, 'O CPF deve ter 11 caracteres.'),
  email: z
    .string(zodStringParser('e-mail'))
    .email('O e-mail informado é inválido.'),
  phone: z
    .string(zodStringParser('telefone'))
    .min(13, 'O telefone deve ter 13 caracteres.')
    .max(14, 'O telefone deve ter 14 caracteres.'),
  whatsapp: z
    .string(zodStringParser('whatsapp'))
    .min(13, 'O número deve ter 13 caracteres.')
    .max(14, 'O número deve ter 14 caracteres.'),
  job: z.string(zodStringParser('função')),
  role: z.string(zodStringParser('permissões')),
  accessLevel: z.string(zodStringParser('nivél de acesso')),
  password: z.string(zodStringParser('senha')),
})

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const {
    name,
    document,
    email,
    phone,
    whatsapp,
    job,
    role,
    accessLevel,
    password,
  } = bodySchema.parse(request.body)

  const createUserUseCase = makeCreateUserUseCase()

  const { user } = await createUserUseCase.execute({
    name,
    document,
    email,
    phone,
    whatsapp,
    job,
    role: Role[role as keyof typeof Role] as Role,
    accessLevel,
    password,
  })

  const token = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: user.id,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: user.id,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(201)
    .send({
      accessToken: token,
      user: UserViewModel.toHTTP(user),
    })
}

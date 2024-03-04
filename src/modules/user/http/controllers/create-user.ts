import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

// import { UserRole } from '@modules/user/entities/user'
import { makeCreateUserUseCase } from '@modules/user/use-cases/factories/make-create-user'
import { UserViewModel } from '@modules/user/http/view-models/user-view-model'

const bodySchema = z.object({
  name: z.string(zodStringParser('nome')),
  surname: z.string(zodStringParser('sobrenome')),
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
    .min(13, 'O número deve ter 13 caracteres.')
    .max(14, 'O número deve ter 14 caracteres.'),
  job: z.string(zodStringParser('job')),
  role: z.string(zodStringParser('role')),
  password: z.string(zodStringParser('senha')),
})

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const { name, surname, email, document, phone, whatsapp, job, role, password } = bodySchema.parse(
    request.body,
)

  const createUserUseCase = makeCreateUserUseCase()

  const { user } = await createUserUseCase.execute({
    name,
    surname,
    email,
    document,
    phone,
    whatsapp,
    job,
    role,
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
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      user: user ? UserViewModel.toHTTP(user) : null,
      access_token: token,
    })
}

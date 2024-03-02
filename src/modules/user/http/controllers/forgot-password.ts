import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeForgotPasswordUseCase } from '@modules/user/use-cases/factories/make-forgot-password'
import { zodStringParser } from '@core/utils/custom-zod-error'

const bodySchema = z.object({
  token: z
    .string(zodStringParser('token'))
    .uuid({ message: 'O token deve ser um UUID válido.' })
    .min(1, { message: 'O token é obrigatório.' }),
  code: z
    .string(zodStringParser('código'))
    .length(6, { message: 'O código deve ter 6 dígitos.' })
    .regex(/^[0-9]+$/, { message: 'O código deve conter apenas números.' })
    .min(1, { message: 'O código é obrigatório.' }),
  password: z
    .string(zodStringParser('senha'))
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/g, {
      message:
        'A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um caractere especial',
    }),
})

export async function forgotPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { token, code, password } = bodySchema.parse(request.body)

  const forgotPasswordUseCase = makeForgotPasswordUseCase()

  await forgotPasswordUseCase.execute({
    token,
    code,
    password,
  })

  return reply.status(200).send()
}
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeChangePasswordUseCase } from '@modules/user/use-cases/factories/make-change-password'
import { zodStringParser } from '@core/utils/custom-zod-error'

const registerUserPinBodySchema = z.object({
  password: z
    .string(zodStringParser('senha'))
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/g, {
      message:
        'A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um caractere especial',
    }),
})

export async function changePassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { password } = registerUserPinBodySchema.parse(request.body)

  const changePasswordUseCase = makeChangePasswordUseCase()

  await changePasswordUseCase.execute({
    userId: request.user.sub,
    password,
  })

  return reply.status(200).send()
}

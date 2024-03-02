import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSendForgotPasswordCode } from '@modules/user/use-cases/factories/make-send-forgot-password-code'
import { zodStringParser } from '@core/utils/custom-zod-error'

const bodySchema = z.object({
  email: z
    .string(zodStringParser('email'))
    .email({
      message: 'O email deve ser um endereço de email.',
    })
    .min(1, {
      message: 'O email deve ser um endereço de email válido.',
    }),
})

export async function sendForgotPasswordCode(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email } = bodySchema.parse(request.body)

  const sendForgotPasswordCode = makeSendForgotPasswordCode()

  const { token } = await sendForgotPasswordCode.execute({
    email,
  })

  return reply.status(200).send({
    token,
  })
}

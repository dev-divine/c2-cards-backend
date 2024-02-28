/* eslint-disable no-useless-return */
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(
  rolesToVerify: Array<'SECRETARY' | 'DIRECTOR' | 'DIVISION_HEAD'>,
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user.data

    if (rolesToVerify.includes(role)) {
      return
    } else {
      return reply.status(401).send({
        code: 'auth.authorization',
        error: 'unauthorized',
        message: 'Acesso não autorizado',
        data: [],
      })
    }
  }
}

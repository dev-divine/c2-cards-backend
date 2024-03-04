import { FastifyReply, FastifyRequest } from 'fastify'
import { User as RawUser } from '@prisma/client'

import { User } from '@modules/user/entities/user'
import { PrismaUserMapper } from '@modules/user/repositories/prisma/mappers/prisma-user-mapper'

import { prisma } from '@infra/database/prisma'


export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()

    let user: User | undefined

      const prismaUser = await prisma.user.findUnique({
        where: {
          id: request.user.sub,
        }
      })

      if (prismaUser) {
    
        user = PrismaUserMapper.toDomain(prismaUser)
      
    } 

    if (!user) {
      return reply.status(401).send({
        code: 'auth.authorization',
        error: 'unauthorized',
        message: 'Acesso não autorizado',
        data: [],
      })
    }

    request.user.data = user
  } catch (error) {
    return reply.status(401).send({
      code: 'auth.authorization',
      error: 'unauthorized',
      message: 'Acesso não autorizado',
      data: [],
    })
  }
}

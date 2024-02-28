import { FastifyReply, FastifyRequest } from 'fastify'
import { User as RawUser } from '@prisma/client'

import { User } from '@modules/user/entities/user'
import { PrismaUserMapper } from '@modules/user/repositories/prisma/mappers/prisma-user-mapper'

import { prisma } from '@infra/database/prisma'
import { RedisCache } from '@infra/providers/cache/redis/redis'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()

    const cache = RedisCache.getInstance()

    let user: User | undefined

    const userCached = await cache.get<RawUser>(`user:${request.user.sub}`)

    if (!userCached) {
      const prismaUser = await prisma.user.findUnique({
        where: {
          id: request.user.sub,
        },
      })

      if (prismaUser) {
        await cache.set(
          `user:${request.user.sub}`,
          JSON.stringify(prismaUser),
          60 * 30, // 30 minutes in cache
        )

        user = PrismaUserMapper.toDomain(prismaUser)
      }
    } else {
      user = PrismaUserMapper.toDomain(userCached)
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

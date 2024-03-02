import { PrismaClient } from '@prisma/client'

import { UserToken } from '@modules/user/entities/user-token'
import { UserTokensRepository } from '@modules/user/repositories/user-tokens-respository'
import { PrismaUserTokensMapper } from '@modules/user/repositories/prisma/mappers/prisma-user-tokens-mapper'

import { prisma } from '@infra/database/prisma'

export class PrismaUserTokensRepository implements UserTokensRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.repository.userToken.findFirst({
      where: {
        token,
      },
    })

    if (!userToken) {
      return
    }

    return PrismaUserTokensMapper.toDomain(userToken)
  }

  async create(userToken: UserToken): Promise<void> {
    const prismaUserToken = PrismaUserTokensMapper.toPrisma(userToken)

    await this.repository.userToken.create({
      data: {
        ...prismaUserToken,
      },
    })
  }

  async save(userToken: UserToken): Promise<void> {
    const prismaUserToken = PrismaUserTokensMapper.toPrisma(userToken)

    await this.repository.userToken.update({
      where: {
        id: prismaUserToken.id,
      },
      data: prismaUserToken,
    })
  }
}

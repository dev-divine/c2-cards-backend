import { PrismaClient } from '@prisma/client'

import { User } from '@modules/user/entities/user'
import { PrismaUserMapper } from '@modules/user/repositories/prisma/mappers/prisma-user-mapper'
import { UserRepository } from '@modules/user/repositories/user-repository'

import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@infra/database/prisma'
import { PaginationDTO } from '@modules/user/dtos/pagination-dto'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class PrismaUserRepository implements UserRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById(userId: string): Promise<User | undefined> {
    const user = await this.repository.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByDocument(document: string): Promise<User | undefined> {
    const user = await this.repository.user.findFirst({
      where: {
        document,
      },
    })

    if (!user) {
      return
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    const user = await this.repository.user.findUnique({
      where: {
        phone,
      },
    })

    if (!user) {
      return
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByWhatsapp(whatsapp: string): Promise<User | undefined> {
    const user = await this.repository.user.findUnique({
      where: {
        whatsapp,
      },
    })

    if (!user) {
      return
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findMany({
    page,
    perPage,
  }: PaginationDTO): Promise<User[] | undefined> {
    const skip = (page - 1) * perPage

    const users = await this.repository.user.findMany({
      skip,
      take: perPage,
      orderBy: {
        updatedAt: 'desc',
      },
    })

    if (!users) {
      return
    }

    return users.map((user) => PrismaUserMapper.toDomain(user))
  }

  async getTotalPages(perPage: number): Promise<number> {
    const totalItems = await this.repository.user.count()

    return Math.ceil(totalItems / perPage)
  }

  async create(user: User): Promise<User> {
    const prismaUser = PrismaUserMapper.toPrisma(user)

    const createdUser = await this.repository.user.create({
      data: prismaUser,
    })

    return PrismaUserMapper.toDomain(createdUser)
  }

  async save(user: User): Promise<User> {
    const prismaUser = PrismaUserMapper.toPrisma(user)

    const updatedUser = await this.repository.user.update({
      where: {
        id: prismaUser.id,
      },
      data: prismaUser,
    })

    return PrismaUserMapper.toDomain(updatedUser)
  }

  async remove(userId: string): Promise<boolean> {
    try {
      await this.repository.ecClient.delete({
        where: {
          id: userId,
        },
      })

      return true
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AppError({
            code: 'prisma.user_not_found',
          })
        }
      }
      throw new AppError({
        code: 'internal',
      })
    }
  }
}

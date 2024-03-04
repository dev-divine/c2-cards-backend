import { PrismaClient } from '@prisma/client'

import { EcClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@infra/database/prisma'
import { EcClient } from '@modules/ec-client/entities/ec-client'
import { PrismaECClientMapper } from '@modules/ec-client/repositories/prisma/mappers/prisma-ec-client-mapper'
import { FilterDTO } from '@modules/opt/dtos/filter-dto'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class PrismaECClientRepository implements EcClientRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById(id: string): Promise<EcClient | undefined> {
    const ecClient = await this.repository.ecClient.findUnique({
      where: {
        id,
      },
    })

    if (!ecClient) {
      return
    }

    return PrismaECClientMapper.toDomain(ecClient)
  }

  async findByName(name: string): Promise<EcClient | undefined> {
    const ecClient = await this.repository.ecClient.findFirst({
      where: {
        companyName: name,
      },
    })

    if (!ecClient) {
      return
    }

    return PrismaECClientMapper.toDomain(ecClient)
  }

  async findByDocument(document: string): Promise<EcClient | undefined> {
    const ecClient = await this.repository.ecClient.findFirst({
      where: {
        companyDocument: document,
      },
    })

    if (!ecClient) {
      return
    }

    return PrismaECClientMapper.toDomain(ecClient)
  }

  async findByEmail(email: string): Promise<EcClient | undefined> {
    const ecClient = await this.repository.ecClient.findFirst({
      where: {
        companyEmail: email,
      },
    })

    if (!ecClient) {
      return
    }

    return PrismaECClientMapper.toDomain(ecClient)
  }

  async findByPhone(phone: string): Promise<EcClient | undefined> {
    const ecClient = await this.repository.ecClient.findFirst({
      where: {
        companyPhone: phone,
      },
    })

    if (!ecClient) {
      return
    }

    return PrismaECClientMapper.toDomain(ecClient)
  }

  async count(): Promise<number> {
    return await this.repository.ecClient.count()
  }

  async fetchTotalPages(perPage: number): Promise<number> {
    const totalItems = await this.repository.ecClient.count()
    return Math.ceil(totalItems / perPage)
  }

  async listECClients({ page, perPage }: FilterDTO): Promise<EcClient[]> {
    const skip = (page - 1) * perPage

    const ecClients = await this.repository.ecClient.findMany({
      skip,
      take: perPage,
      orderBy: {
        updatedAt: 'desc',
      },
    })

    if (!ecClients) {
      return []
    }

    return ecClients.map((ecClient) => PrismaECClientMapper.toDomain(ecClient))
  }

  async create(ecClient: EcClient): Promise<EcClient> {
    const prismaeCClient = PrismaECClientMapper.toPrisma(ecClient)

    const createdECClient = await this.repository.ecClient.create({
      data: prismaeCClient,
    })

    return PrismaECClientMapper.toDomain(createdECClient)
  }

  async save(ecClient: EcClient): Promise<EcClient> {
    const prismaECClient = PrismaECClientMapper.toPrisma(ecClient)

    const updatedECClient = await this.repository.ecClient.update({
      where: {
        id: prismaECClient.id,
      },
      data: prismaECClient,
    })

    return PrismaECClientMapper.toDomain(updatedECClient)
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.repository.ecClient.delete({
        where: {
          id,
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

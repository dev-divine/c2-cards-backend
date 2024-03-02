import { PrismaClient } from '@prisma/client'

import { ECClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

import { prisma } from '@infra/database/prisma'
import { ECClient } from '@modules/ec-client/entities/ec-client'
import { PrismaECClientMapper } from '@modules/ec-client/repositories/prisma/mappers/prisma-ec-client-mapper'
import { AppError } from '@core/domain/errors/app-error'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FilterDTO } from '@modules/opt/dtos/filter-dto'

export class PrismaECClientRepository implements ECClientRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById(id: string): Promise<ECClient | undefined> {
    const eCClient = await this.repository.eCClient.findUnique({
      where: {
        id,
      },
    })

    if (!eCClient) {
      return
    }

    return PrismaECClientMapper.toDomain(eCClient)
  }

  async findByDocument(document: string): Promise<ECClient | undefined> {
    const eCClient = await this.repository.eCClient.findUnique({
      where: {
        company_document: document,
      },
    })

    if (!eCClient) {
      return
    }

    return PrismaECClientMapper.toDomain(eCClient)
  }

  async count(): Promise<number> {
    return await this.repository.eCClient.count()
  }

  async fetchTotalPages(perPage: number): Promise<number> {
    const totalItems = await this.repository.eCClient.count()
    return Math.ceil(totalItems / perPage)
  }

  async listECClients({ page, perPage }: FilterDTO): Promise<ECClient[]> {
    const skip = (page - 1) * perPage

    const eCClients = await this.repository.eCClient.findMany({
      skip,
      take: perPage,
      orderBy: {
        updated_at: 'desc',
      },
    })

    if (!eCClients) {
      return []
    }

    return eCClients.map((eCClient) => PrismaECClientMapper.toDomain(eCClient))
  }

  async create(eCClient: ECClient): Promise<ECClient> {
    const prismaeCClient = PrismaECClientMapper.toPrisma(eCClient)

    const createdECClient = await this.repository.eCClient.create({
      data: prismaeCClient,
    })

    return PrismaECClientMapper.toDomain(createdECClient)
  }

  async save(eCClient: ECClient): Promise<ECClient> {
    const prismaECClient = PrismaECClientMapper.toPrisma(eCClient)

    const updatedECClient = await this.repository.eCClient.update({
      where: {
        id: prismaECClient.id,
      },
      data: prismaECClient,
    })

    return PrismaECClientMapper.toDomain(updatedECClient)
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.eCClient.delete({
        where: { id },
      })

      return true
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new AppError({
          code: 'EC_CLIENT.not_found',
          message:
            'O estabelecimento comercial não foi encontrado e não pode ser deletado.',
        })
      } else {
        console.error('Erro ao deletar cliente:', error)
        throw new AppError({
          code: 'internal',
          message:
            'Erro interno ao tentar deletar o estabelecimento comercial.',
        })
      }
    }
  }
}

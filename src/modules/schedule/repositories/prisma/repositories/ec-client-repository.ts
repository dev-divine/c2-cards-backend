import { PrismaClient } from '@prisma/client'

import { ECClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

import { prisma } from '@infra/database/prisma'
import { ECClient } from '@modules/ec-client/entities/ec-client'
import { PrismaECClientMapper } from '@modules/ec-client/repositories/prisma/mappers/prisma-ec-client-mapper'

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

  async create(eCClient: ECClient): Promise<ECClient> {
    const prismaeCClient = PrismaECClientMapper.toPrisma(eCClient)

    const createdECClient = await this.repository.eCClient.create({
      data: prismaeCClient,
    })

    return PrismaECClientMapper.toDomain(createdECClient)
  }

  async delete(id: string): Promise<boolean> {
    const itemToRemove = await this.repository.eCClient.findUnique({
      where: { id },
    })

    if (!itemToRemove) {
      return false
    }

    await this.repository.eCClient.delete({
      where: {
        id,
      },
    })
  }
}

import { PrismaClient } from '@prisma/client'

import { EcClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

import { prisma } from '@infra/database/prisma'
import { EcClient } from '@modules/ec-client/entities/ec-client'
import { PrismaECClientMapper } from '@modules/ec-client/repositories/prisma/mappers/prisma-ec-client-mapper'

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

  async findByDocument(document: string): Promise<EcClient | undefined> {
    const ecClient = await this.repository.ecClient.findUnique({
      where: {
        company_document: document,
      },
    })

    if (!ecClient) {
      return
    }

    return PrismaECClientMapper.toDomain(ecClient)
  }

  async create(ecClient: EcClient): Promise<EcClient> {
    const prismaeCClient = PrismaECClientMapper.toPrisma(ecClient)

    const createdECClient = await this.repository.ecClient.create({
      data: prismaeCClient,
    })

    return PrismaECClientMapper.toDomain(createdECClient)
  }

  async delete(id: string): Promise<boolean> {
    const itemToRemove = await this.repository.ecClient.findUnique({
      where: { id },
    })

    if (!itemToRemove) {
      return false
    }

    await this.repository.ecClient.delete({
      where: {
        id,
      },
    })
  }
}

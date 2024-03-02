import { PrismaClient } from '@prisma/client'

import { FilterDTO } from '@modules/opt/dtos/filter-dto'
import { OptOut } from '@modules/opt/entities/opt-out'
import { OptOutRepository } from '@modules/opt/repositories/opt-out-repository'
import { PrismaOptOutMapper } from '@modules/opt/repositories/prisma/mappers/prisma-opt-out-mapper'

import { prisma } from '@infra/database/prisma'

export class PrismaOptOutRepository implements OptOutRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async listOptOuts(filters: FilterDTO): Promise<OptOut[]> {
    const { page, perPage, id } = filters

    const whereCondition = {} as { id?: string }
    if (id !== undefined) {
      whereCondition.id = id
    }

    const skip = (page - 1) * perPage

    const optOuts = await this.repository.optOut.findMany({
      skip,
      take: perPage,
      where: whereCondition,
      orderBy: {
        updated_at: 'desc',
      },
    })

    if (!optOuts) {
      return []
    }

    return optOuts.map((optOut) => PrismaOptOutMapper.toDomain(optOut))
  }

  async createOptOut(optOut: OptOut): Promise<OptOut> {
    const prismaOptOut = PrismaOptOutMapper.toPrisma(optOut)

    const createdOptOut = await this.repository.optOut.create({
      data: prismaOptOut,
    })

    return PrismaOptOutMapper.toDomain(createdOptOut)
  }

  async saveOptOut(optOut: OptOut): Promise<OptOut> {
    const prismaOptOut = PrismaOptOutMapper.toPrisma(optOut)

    const updatedOptOut = await this.repository.optOut.update({
      where: {
        id: prismaOptOut.id,
      },
      data: prismaOptOut,
    })

    return PrismaOptOutMapper.toDomain(updatedOptOut)
  }
}

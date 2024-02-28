import { PrismaClient } from '@prisma/client'

import { FilterDTO } from '@modules/opts/dtos/filter-dto'
import { OptOut } from '@modules/opts/entities/opt-out'
import { OptOutRepository } from '@modules/opts/repositories/opt-out-repository'
import { PrismaOptOutMapper } from '@modules/opts/repositories/prisma/mappers/prisma-opt-out-mapper'

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

  async createOptOut(optOut: OptOut): Promise<void> {
    const prismaOptOut = PrismaOptOutMapper.toPrisma(optOut)

    await this.repository.optOut.create({
      data: prismaOptOut,
    })
  }

  async saveOptOut(optOut: OptOut): Promise<void> {
    const prismaOptOut = PrismaOptOutMapper.toPrisma(optOut)

    await this.repository.optOut.update({
      where: {
        id: prismaOptOut.id,
      },
      data: prismaOptOut,
    })
  }
}

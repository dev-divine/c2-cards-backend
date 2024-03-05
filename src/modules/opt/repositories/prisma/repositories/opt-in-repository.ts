import { PrismaClient } from '@prisma/client'

import { FilterDTO } from '@modules/opt/dtos/filter-dto'
import { OptIn } from '@modules/opt/entities/opt-in'
import { OptInRepository } from '@modules/opt/repositories/opt-in-repository'
import { PrismaOptInMapper } from '@modules/opt/repositories/prisma/mappers/prisma-opt-in-mapper'

import { prisma } from '@infra/database/prisma'

export class PrismaOptInRepository implements OptInRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async fetchTotalPages(perPage: number): Promise<number> {
    const totalItems = await this.repository.optIn.count()
    return Math.ceil(totalItems / perPage)
  }

  async count(): Promise<number> {
    return await this.repository.optIn.count()
  }

  async listOptIns(filters: FilterDTO): Promise<OptIn[]> {
    const { page, perPage, endDate, startDate } = filters

    const skip = (page - 1) * perPage

    const optIns = await this.repository.optIn.findMany({
      skip,
      take: perPage,
      where: {
        AND: [
          {
            activationDate: {
              gte: startDate, // Garanta que startDate esteja no formato ISO string
            },
          },
          {
            expirationDate: {
              lte: endDate, // Garanta que endDate esteja no formato ISO string
            },
          },
        ],
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    if (!optIns) {
      return []
    }

    return optIns.map((optIn) => PrismaOptInMapper.toDomain(optIn))
  }

  async createOptIn(optIn: OptIn): Promise<OptIn> {
    const prismaOptIn = PrismaOptInMapper.toPrisma(optIn)

    const createdOptIn = await this.repository.optIn.create({
      data: prismaOptIn,
    })

    return PrismaOptInMapper.toDomain(createdOptIn)
  }

  async saveOptIn(optIn: OptIn): Promise<OptIn> {
    const prismaOptIn = PrismaOptInMapper.toPrisma(optIn)

    const updatedOptIn = await this.repository.optIn.update({
      where: {
        id: prismaOptIn.id,
      },
      data: prismaOptIn,
    })

    return PrismaOptInMapper.toDomain(updatedOptIn)
  }
}

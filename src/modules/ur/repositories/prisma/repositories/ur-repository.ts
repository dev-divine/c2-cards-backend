import { PrismaClient } from '@prisma/client'

import { UR } from '@modules/ur/entities/ur'
import { URRepository } from '@modules/ur/repositories/ur-repository'
import { PrismaURMapper } from '@modules/ur/repositories/prisma/mappers/prisma-ur-mapper'

import { prisma } from '@infra/database/prisma'
import { SaveURSimplifiedInputDTO } from '@infra/providers/registering-entities/dtos/save-ur-simplified-dto'
import { SaveURDomicileInputDTO } from '@infra/providers/registering-entities/dtos/save-ur-domicile-dto'
import { FilterDTO } from '@modules/ur/dtos/filter-dto'

export class PrismaURRepository implements URRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async fetchTotalPages(perPage: number): Promise<number> {
    const totalItems = await this.repository.uR.count()
    return Math.ceil(totalItems / perPage)
  }

  async fetchTotalUrs(): Promise<number> {
    return await this.repository.uR.count()
  }

  async listUrs(filters: FilterDTO): Promise<UR[]> {
    const { page, perPage, endDate, startDate } = filters

    const skip = (page - 1) * perPage

    const contracts = await this.repository.uR.findMany({
      skip,
      take: perPage,
      where: {
        AND: [
          {
            signature_date: {
              gte: startDate,
            },
          },
          {
            expiration_date: {
              lte: endDate,
            },
          },
        ],
      },
      orderBy: {
        updated_at: 'desc',
      },
    })

    if (!contracts) {
      return []
    }

    return contracts.map((contract) => PrismaURMapper.toDomain(contract))
  }

  async saveDomicile(data: SaveURDomicileInputDTO): Promise<void> {
    await this.repository.uR.update({
      where: {
        contract_identifier: data.contractIdentifier,
      },
      data,
    })
  }

  async saveSimplified(data: SaveURSimplifiedInputDTO): Promise<void> {
    await this.repository.uR.update({
      where: {
        contract_identifier: data.contractIdentifier,
      },
      data,
    })
  }

  async create(ur: UR): Promise<void> {
    const prismaUr = PrismaURMapper.toPrisma(ur)

    await this.repository.uR.create({
      data: prismaUr,
    })
  }

  async remove(externalCode: string): Promise<void> {
    await this.repository.contract.delete({
      where: {
        external_code: externalCode,
      },
    })
  }
}

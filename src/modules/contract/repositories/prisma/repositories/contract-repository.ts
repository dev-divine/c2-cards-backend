import { PrismaClient } from '@prisma/client'

import { SaveDTO } from '@modules/contract/dtos/save-dto'
import { FilterDTO } from '@modules/contract/dtos/filter-dto'
import { Contract } from '@modules/contract/entities/contract'
import { ContractRepository } from '@modules/contract/repositories/contract-repository'
import { PrismaContractMapper } from '@modules/contract/repositories/prisma/mappers/prisma-contract-mapper'

import { prisma } from '@infra/database/prisma'

export class PrismaContractRepository implements ContractRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findByExternalCode(
    externalCode: string,
  ): Promise<Contract | undefined> {
    const contract = await this.repository.contract.findUnique({
      where: {
        external_code: externalCode,
      },
    })

    if (!contract) {
      return
    }

    return PrismaContractMapper.toDomain(contract)
  }

  async fetchTotalPages(perPage: number): Promise<number> {
    const totalItems = await this.repository.contract.count()
    return Math.ceil(totalItems / perPage)
  }

  async fetchTotalContracts(): Promise<number> {
    return await this.repository.contract.count()
  }

  async listContracts(filters: FilterDTO): Promise<Contract[]> {
    const { page, perPage, endDate, startDate } = filters

    const skip = (page - 1) * perPage

    const contracts = await this.repository.contract.findMany({
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

    return contracts.map((contract) => PrismaContractMapper.toDomain(contract))
  }

  async create(contract: Contract): Promise<void> {
    const prismaContract = PrismaContractMapper.toPrisma(contract)

    await this.repository.contract.create({
      data: prismaContract,
    })
  }

  async save({
    externalCode,
    minimumValueToBeMaintained,
    outstandingBalanceOrLimit,
  }: SaveDTO): Promise<void> {
    await this.repository.contract.update({
      where: {
        external_code: externalCode,
      },
      data: {
        minimum_value_to_be_maintained: minimumValueToBeMaintained,
        outstanding_balance_or_limit: outstandingBalanceOrLimit,
      },
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

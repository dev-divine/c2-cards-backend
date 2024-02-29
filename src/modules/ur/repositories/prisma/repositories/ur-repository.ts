import { PrismaClient } from '@prisma/client'

import { UR } from '@modules/ur/entities/ur'
import { URRepository } from '@modules/ur/repositories/ur-repository'
import { PrismaURMapper } from '@modules/ur/repositories/prisma/mappers/prisma-ur-mapper'

import { FilterDTO } from '@modules/ur/dtos/filter-dto'
import { SaveURDomicileDTO } from '@modules/contract/dtos/save-ur-domicile-dto'
import { SaveURSimplifiedDTO } from '@modules/contract/dtos/save-ur-simplified'

import { prisma } from '@infra/database/prisma'

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
            created_at: {
              gte: startDate,
            },
          },
          {
            created_at: {
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

  async saveDomicile(data: SaveURDomicileDTO): Promise<void> {
    const ur = await this.repository.uR.findFirst({
      where: {
        contract_identifier: data.contractIdentifier,
      },
      select: {
        id: true,
      },
    })

    if (!ur) {
      throw new Error('UR not found')
    }

    await this.repository.payment.update({
      where: {
        ur_id: ur.id,
      },
      data: {
        holder_domicile_document: data.payment.holderDomicileDocument,
        account_type: data.payment.accountType,
        compe: data.payment.compe,
        ispb: data.payment.ispb,
        agency: data.payment.agency,
        account_number: data.payment.accountNumber,
      },
    })
  }

  async saveSimplified(data: SaveURSimplifiedDTO): Promise<void> {
    const ur = await this.repository.uR.findFirst({
      where: {
        contract_identifier: data.contractIdentifier,
      },
      select: {
        id: true,
      },
    })

    if (!ur) {
      throw new Error('UR not found')
    }

    await this.repository.coveredReceivable.createMany({
      data: data.coveredReceivables.map((receivable) => ({
        ur_id: ur.id,
        accreditor_cnpj: receivable.accreditorCnpj,
        final_recipient_user_document: receivable.finalRecipientUserDocument,
        payment_arrangement_code: receivable.paymentArrangementCode,
        settlement_date: new Date(receivable.settlementDate),
        amount_to_encumber: receivable.amountToEncumber,
      })),
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

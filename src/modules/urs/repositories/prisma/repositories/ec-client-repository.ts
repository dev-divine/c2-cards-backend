import { PrismaClient } from '@prisma/client'

import { ECClientRepository } from '@modules/ec-clients/repositories/ec-client-repository'

import { prisma } from '@infra/database/prisma'
import { ECClient } from '@modules/ec-clients/entities/ec-client'
import { PrismaECClientMapper } from '@modules/ec-clients/repositories/prisma/mappers/prisma-ec-client-mapper'

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

  // async findByPhone(phone: string): Promise<Citizen | undefined> {
  //   const citizen = await this.repository.citizen.findUnique({
  //     where: {
  //       phone,
  //     },
  //   })

  //   if (!citizen) {
  //     return
  //   }

  //   return PrismaCitizenMapper.toDomain(citizen)
  // }

  // async findMany({
  //   page,
  //   perPage,
  // }: PaginationDTO): Promise<Citizen[] | undefined> {
  //   const skip = (page - 1) * perPage

  //   const citizens = await this.repository.citizen.findMany({
  //     skip,
  //     take: perPage,
  //     orderBy: {
  //       updated_at: 'desc',
  //     },
  //   })

  //   if (!citizens) {
  //     return
  //   }

  //   return citizens.map((citizen) => PrismaCitizenMapper.toDomain(citizen))
  // }

  // async getTotalPages(perPage: number): Promise<number> {
  //   const totalItems = await this.repository.citizen.count()

  //   return Math.ceil(totalItems / perPage)
  // }

  async create(citizen: ECClient): Promise<ECClient> {
    const prismaeCClient = PrismaECClientMapper.toPrisma(citizen)

    const createdECClient = await this.repository.eCClient.create({
      data: prismaeCClient,
    })

    return PrismaECClientMapper.toDomain(createdECClient)
  }

  // async save(citizen: Citizen): Promise<Citizen> {
  //   const prismaCitizen = PrismaCitizenMapper.toPrisma(citizen)

  //   const updatedCitizen = await this.repository.citizen.update({
  //     where: {
  //       id: prismaCitizen.id,
  //     },
  //     data: prismaCitizen,
  //   })

  //   return PrismaCitizenMapper.toDomain(updatedCitizen)
  // }

  async delete(id: string): Promise<void> {
    const itemToRemove = await this.repository.eCClient.findUnique({
      where: { id },
    })

    if (!itemToRemove) {
      return
    }

    await this.repository.eCClient.delete({
      where: {
        id,
      },
    })
  }
}

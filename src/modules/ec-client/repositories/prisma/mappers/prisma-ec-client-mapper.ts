import { EcClient as RawECClient } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { EcClient } from '@modules/ec-client/entities/ec-client'

export class PrismaECClientMapper {
  static toPrisma(ecClient: EcClient) {
    return {
      id: ecClient.id.toString(),
      companyName: ecClient.companyName,
      companyDocument: ecClient.companyDocument,
      companyPhone: ecClient.companyName,
      companyEmail: ecClient.companyEmail,
      companyZipCode: ecClient.companyZipCode,
      companyState: ecClient.companyState,
      companyCity: ecClient.companyCity,
      companyNeighborhood: ecClient.companyNeighborhood,
      companyStreet: ecClient.companyStreet,
      companyNumber: ecClient.companyNumber,
      companyComplement: ecClient.companyComplement,
      responsibleName: ecClient.responsibleName,
      responsibleEmail: ecClient.responsibleEmail,
      responsiblePhone: ecClient.responsiblePhone,
      responsibleDocument: ecClient.responsibleDocument,
      responsibleZipCode: ecClient.responsibleZipCode,
      responsibleState: ecClient.responsibleState,
      responsibleCity: ecClient.responsibleCity,
      responsibleNeighborhood: ecClient.responsibleNeighborhood,
      responsibleStreet: ecClient.responsibleStreet,
      responsibleNumber: ecClient.responsibleNumber,
      responsibleComplement: ecClient.responsibleComplement,
      createdAt: ecClient.createdAt,
      updatedAt: ecClient.updatedAt,
      deletedAt: ecClient.deletedAt,
    }
  }

  static toDomain(raw: RawECClient): EcClient {
    return EcClient.create(
      {
        companyName: raw.companyName,
        companyDocument: raw.companyDocument,
        companyPhone: raw.companyPhone,
        companyEmail: raw.companyEmail,
        companyZipCode: raw.companyZipCode,
        companyState: raw.companyState,
        companyCity: raw.companyCity,
        companyNeighborhood: raw.companyNeighborhood,
        companyStreet: raw.companyStreet,
        companyNumber: raw.companyNumber,
        companyComplement: raw.companyComplement ?? undefined,
        responsibleName: raw.responsibleName ?? undefined,
        responsibleEmail: raw.responsibleEmail ?? undefined,
        responsiblePhone: raw.responsiblePhone ?? undefined,
        responsibleDocument: raw.responsibleDocument ?? undefined,
        responsibleZipCode: raw.responsibleZipCode ?? undefined,
        responsibleState: raw.responsibleState ?? undefined,
        responsibleCity: raw.responsibleCity ?? undefined,
        responsibleNeighborhood: raw.responsibleNeighborhood ?? undefined,
        responsibleStreet: raw.responsibleStreet ?? undefined,
        responsibleNumber: raw.responsibleNumber ?? undefined,
        responsibleComplement: raw.responsibleComplement ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

import { OptOut as RawOptOut } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { OptOut } from '@modules/opt/entities/opt-out'

export class PrismaOptOutMapper {
  static toPrisma(optOut: OptOut) {
    return {
      id: optOut.id,
      externalCode: optOut.externalCode,
      ecClientName: optOut.ecClientName,
      ecClientDocument: optOut.ecClientDocument,
      c2CardsDocument: optOut.c2cardsDocument,
      responsibleName: optOut.responsibleName,
      responsibleDocument: optOut.responsibleDocument,
      responsibleEmail: optOut.responsibleEmail,
      responsibleWhatsapp: optOut.responsibleWhatsapp,
      protocol: optOut.protocol,
      createdAt: optOut.createdAt,
      updatedAt: optOut.updatedAt,
      deletedAt: optOut.deletedAt ?? undefined,
    }
  }

  static toDomain(raw: RawOptOut): OptOut {
    return OptOut.create(
      {
        externalCode: raw.externalCode,
        ecClientName: raw.ecClientName,
        ecClientDocument: raw.ecClientDocument,
        c2cardsDocument: raw.c2CardsDocument,
        responsibleName: raw.responsibleName,
        responsibleDocument: raw.responsibleDocument,
        responsibleEmail: raw.responsibleEmail,
        responsibleWhatsapp: raw.responsibleWhatsapp,
        protocol: raw.protocol,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

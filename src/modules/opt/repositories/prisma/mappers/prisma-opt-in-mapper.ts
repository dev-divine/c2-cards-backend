import { OptIn as RawOptIn } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { OptIn } from '@modules/opt/entities/opt-in'

export class PrismaOptInMapper {
  static toPrisma(optIn: OptIn) {
    return {
      id: optIn.id,
      externalCode: optIn.externalCode,
      ecClientName: optIn.ecClientName,
      ecClientDocument: optIn.ecClientDocument,
      c2CardsDocument: optIn.c2cardsDocument,
      financialAgentDocument: optIn.financialAgentDocument,
      responsibleName: optIn.responsibleName,
      responsibleDocument: optIn.responsibleDocument,
      responsibleEmail: optIn.responsibleEmail,
      responsibleWhatsapp: optIn.responsibleWhatsapp,
      signatureDate: optIn.signatureDate,
      activationDate: optIn.activationDate,
      expirationDate: optIn.expirationDate ?? undefined,
      protocol: optIn.protocol,
      createdAt: optIn.createdAt,
      updatedAt: optIn.updatedAt,
      deletedAt: optIn.deletedAt ?? undefined,
    }
  }

  static toDomain(raw: RawOptIn): OptIn {
    return OptIn.create(
      {
        externalCode: raw.externalCode,
        ecClientName: raw.ecClientName,
        ecClientDocument: raw.ecClientDocument,
        c2cardsDocument: raw.c2CardsDocument,
        financialAgentDocument: raw.financialAgentDocument,
        responsibleName: raw.responsibleName,
        responsibleDocument: raw.responsibleDocument,
        responsibleEmail: raw.responsibleEmail,
        responsibleWhatsapp: raw.responsibleWhatsapp,
        signatureDate: raw.signatureDate ?? undefined,
        activationDate: raw.activationDate ?? undefined,
        expirationDate: raw.expirationDate ?? undefined,
        protocol: raw.protocol,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

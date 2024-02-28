import { OptIn as RawOptIn } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Format } from '@core/utils/format'

import { OptIn } from '@modules/opts/entities/opt-in'

export class PrismaOptInMapper {
  static toPrisma(optIn: OptIn) {
    return {
      id: optIn.id,
      external_code: optIn.externalCode,
      ec_client_name: optIn.ecClientName,
      ec_client_document: optIn.ecClientDocument,
      c2cards_document: optIn.c2cardsDocument,
      financial_agent_document: optIn.financialAgentDocument,
      responsible_name: optIn.responsibleName,
      responsible_document: optIn.responsibleDocument,
      responsible_email: optIn.responsibleEmail,
      responsible_whatsapp: optIn.responsibleWhatsapp,
      signature_date: new Date(optIn.signatureDate),
      activation_date: new Date(optIn.activationDate),
      expiration_date: optIn.expirationDate
        ? new Date(optIn.expirationDate)
        : undefined,
      protocol: optIn.protocol,
      created_at: optIn.createdAt,
      updated_at: optIn.updatedAt,
      deleted_at: optIn.deletedAt ?? undefined,
    }
  }

  static toDomain(raw: RawOptIn): OptIn {
    return OptIn.create(
      {
        externalCode: raw.external_code,
        ecClientName: raw.ec_client_name,
        ecClientDocument: raw.ec_client_document,
        c2cardsDocument: raw.c2cards_document,
        financialAgentDocument: raw.financial_agent_document,
        responsibleName: raw.responsible_name,
        responsibleDocument: raw.responsible_document,
        responsibleEmail: raw.responsible_email,
        responsibleWhatsapp: raw.responsible_whatsapp,
        signatureDate: Format.dateToIsoString(raw.signature_date),
        activationDate: Format.dateToIsoString(raw.activation_date),
        expirationDate: raw.expiration_date
          ? Format.dateToIsoString(raw.expiration_date)
          : undefined,
        protocol: raw.protocol,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        deletedAt: raw.deleted_at ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

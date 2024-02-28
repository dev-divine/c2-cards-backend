import { OptOut as RawOptOut } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { OptOut } from '@modules/opts/entities/opt-out'

export class PrismaOptOutMapper {
  static toPrisma(optOut: OptOut) {
    return {
      id: optOut.id,
      ec_client_name: optOut.ecClientName,
      ec_client_document: optOut.ecClientDocument,
      external_code: optOut.externalCode,
      c2cards_document: optOut.c2cardsDocument,
      responsible_name: optOut.responsibleName,
      responsible_document: optOut.responsibleDocument,
      responsible_email: optOut.responsibleEmail,
      responsible_whatsapp: optOut.responsibleWhatsapp,
      protocol: optOut.protocol,
      processing_protocol: optOut.processingProtocol,
      processing_date_time: optOut.processingDateTime
        ? optOut.processingDateTime
        : undefined,
      created_at: optOut.createdAt,
      updated_at: optOut.updatedAt,
      deleted_at: optOut.deletedAt ? optOut.deletedAt : undefined,
    }
  }

  static toDomain(raw: RawOptOut): OptOut {
    return OptOut.create(
      {
        ecClientName: raw.ec_client_name,
        ecClientDocument: raw.ec_client_document,
        externalCode: raw.external_code ?? undefined,
        c2cardsDocument: raw.c2cards_document ?? undefined,
        responsibleName: raw.responsible_name,
        responsibleDocument: raw.responsible_document,
        responsibleEmail: raw.responsible_email,
        responsibleWhatsapp: raw.responsible_whatsapp,
        protocol: raw.protocol ?? undefined,
        processingProtocol: raw.processing_protocol ?? undefined,
        processingDateTime: raw.processing_date_time ?? undefined,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        deletedAt: raw.deleted_at ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

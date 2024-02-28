import { OptOut } from '@modules/opts/entities/opt-out'

export class OptOutViewModel {
  static toHTTP(optOut: OptOut) {
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
        ? optOut.processingDateTime.toISOString()
        : undefined,
      created_at: optOut.createdAt.toISOString(),
      updated_at: optOut.updatedAt.toISOString(),
      deleted_at: optOut.deletedAt ? optOut.deletedAt.toISOString() : undefined,
    }
  }
}

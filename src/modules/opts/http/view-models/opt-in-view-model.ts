import { OptIn } from '@modules/opts/entities/opt-in'

export class OptInViewModel {
  static toHTTP(optIn: OptIn) {
    return {
      id: optIn.id,
      ec_client_name: optIn.ecClientName,
      ec_client_document: optIn.ecClientDocument,
      external_code: optIn.externalCode,
      c2cards_document: optIn.c2cardsDocument,
      financial_agent_document: optIn.financialAgentDocument,
      responsible_name: optIn.responsibleName,
      responsible_document: optIn.responsibleDocument,
      responsible_email: optIn.responsibleEmail,
      responsible_whatsapp: optIn.responsibleWhatsapp,
      signature_date: optIn.signatureDate
        ? optIn.signatureDate.toISOString()
        : undefined,
      activation_date: optIn.activationDate
        ? optIn.activationDate.toISOString()
        : undefined,
      expiration_date: optIn.expirationDate
        ? optIn.expirationDate?.toISOString()
        : undefined,
      protocol: optIn.protocol,
      processing_protocol: optIn.processingProtocol,
      processing_date_time: optIn.processingDateTime
        ? optIn.processingDateTime?.toISOString()
        : undefined,
      created_at: optIn.createdAt.toISOString(),
      updated_at: optIn.updatedAt.toISOString(),
      deleted_at: optIn.deletedAt ? optIn.deletedAt.toISOString() : undefined,
    }
  }
}

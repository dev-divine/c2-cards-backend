import { OptIn } from '@modules/opt/entities/opt-in'

export class OptInViewModel {
  static toHTTP(optIn: OptIn) {
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
    }
  }
}

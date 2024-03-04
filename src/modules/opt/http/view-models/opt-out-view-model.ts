import { OptOut } from '@modules/opt/entities/opt-out'

export class OptOutViewModel {
  static toHTTP(optOut: OptOut) {
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
}

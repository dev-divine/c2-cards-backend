import { CoveredReceivable } from '@modules/ur/entities/covered-receivable'

export class CoveredReceivableViewModel {
  static parse(coveredReceivable: CoveredReceivable) {
    return {
      id: coveredReceivable.id,
      accreditor_cnpj: coveredReceivable.accreditorCnpj,
      final_recipient_user_document:
        coveredReceivable.finalRecipientUserDocument,
      payment_arrangement_code: coveredReceivable.paymentArrangementCode,
      settlement_date: coveredReceivable.settlementDate,
      amount_to_encumber: coveredReceivable.amountToEncumber,
    }
  }
}

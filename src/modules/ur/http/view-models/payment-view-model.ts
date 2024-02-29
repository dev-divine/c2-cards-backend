import { Payment } from '@modules/ur/entities/payment'

export class PaymentViewModel {
  static parse(payment: Payment) {
    return {
      id: payment.id,
      holder_domicile_document: payment.holderDomicileDocument,
      account_type: payment.accountType,
      compe: payment.compe,
      ispb: payment.ispb,
      agency: payment.agency,
      account_number: payment.accountNumber,
    }
  }
}

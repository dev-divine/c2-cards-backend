import { UR } from '@modules/ur/entities/ur'
import { PaymentViewModel } from '@modules/ur/http/view-models/payment-view-model'
import { CoveredReceivableViewModel } from '@modules/ur/http/view-models/covered-receivable-view-model'

export class URViewModel {
  static toHTTP(ur: UR) {
    return {
      id: ur.id,
      external_code: ur.externalCode,
      external_contract_code: ur.externalContractCode,
      contract_identifier: ur.contractIdentifier,
      covered_receivables: ur.coveredReceivables.map(
        CoveredReceivableViewModel.parse,
      ),
      payment: PaymentViewModel.parse(ur.payment),
    }
  }
}

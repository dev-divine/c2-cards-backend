import { CoveredReceivable } from '@infra/config/unused/covered-receivable-show'

export class CoveredReceivableViewModel {
  static parseCoveredReceivable(coveredReceivable: CoveredReceivable) {
    return {
      id: coveredReceivable.id,
      registrar_cnpj: coveredReceivable.registrarCnpj,
      accreditor_cnpj: coveredReceivable.accreditorCnpj,
      contract_effect_identifier: coveredReceivable.contractEffectIdentifier,
      final_recipient_user_document:
        coveredReceivable.finalRecipientUserDocument,
      payment_arrangement_code: coveredReceivable.paymentArrangementCode,
      constitution_status: coveredReceivable.constitutionStatus,
      settlement_date: coveredReceivable.settlementDate.toISOString(),
      requested_effect_value: coveredReceivable.requestedEffectValue,
      committed_effect_value: coveredReceivable.committedEffectValue,
      queue_value: coveredReceivable.queueValue,
      commitment_order: coveredReceivable.commitmentOrder,
      total_constituted_value: coveredReceivable.totalConstitutedValue,
      pre_contracted_value: coveredReceivable.preContractedValue,
      free_balance: coveredReceivable.freeBalance,
      blocked_value: coveredReceivable.blockedValue,
      receivable_unit_id: coveredReceivable.receivableUnitId,
    }
  }
}

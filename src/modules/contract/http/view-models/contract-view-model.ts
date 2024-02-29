import { Contract } from '@modules/contract/entities/contract'
import { DistributionResult } from '@modules/contract/entities/distribution-result'

export class ContractViewModel {
  static toHTTP(contract: Contract) {
    return {
      external_code: contract.externalCode,
      contract_identifier: contract.contractIdentifier,
      contract_status: contract.contractStatus ?? undefined,
      debtor_contract_document: contract.debtorContractDocument,
      participant_cnpj: contract.participantCnpj,
      holder_document: contract.holderDocument,
      contract_effect_type: contract.contractEffectType,
      outstanding_balance_or_limit: contract.outstandingBalanceOrLimit,
      minimum_value_to_be_maintained: contract.minimumValueToBeMaintained,
      signature_date: contract.signatureDate,
      expiration_date: contract.expirationDate,
      division_rule: contract.divisionRule,
      created_at: contract.createdAt.toISOString(),
      updated_at: contract.updatedAt
        ? contract.updatedAt.toISOString()
        : undefined,
      deleted_at: contract.deletedAt
        ? contract.deletedAt.toISOString()
        : undefined,
      distribution_result: contract.distributionResult
        ? ContractViewModel.parse(contract.distributionResult)
        : undefined,
    }
  }

  static parse(distributionResult: DistributionResult) {
    return {
      contract_id: distributionResult.contractId,
      affected_receivables_units_quantity:
        distributionResult.affectedReceivablesUnitsQuantity,
      affected_receivables_units_value:
        distributionResult.affectedReceivablesUnitsValue,
      commitment_situation: distributionResult.commitmentSituation,
    }
  }
}

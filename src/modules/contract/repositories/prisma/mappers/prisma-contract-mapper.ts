import {
  Contract as RawContract,
  DistributionResult as RawDistributionResult,
} from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Format } from '@core/utils/format'

import { Contract } from '@modules/contract/entities/contract'
import { DistributionResult } from '@modules/contract/entities/distribution-result'

export class PrismaContractMapper {
  static toPrisma(contract: Contract) {
    return {
      id: contract.id,
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
      created_at: new Date(contract.createdAt),
      updated_at: contract.updatedAt ? new Date(contract.updatedAt) : undefined,
      deleted_at: contract.deletedAt ? new Date(contract.deletedAt) : undefined,
      distributionResult: {
        create: {
          contract_id: contract.id,
          affected_receivables_units_quantity:
            contract!.distributionResult!.affectedReceivablesUnitsQuantity,
          affected_receivables_units_value:
            contract!.distributionResult!.affectedReceivablesUnitsValue,
          commitment_situation:
            contract!.distributionResult!.commitmentSituation,
        },
      },
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

  static toDomain(
    raw: RawContract & { distributionResult?: RawDistributionResult },
  ): Contract {
    const distributionResultData = raw.distributionResult
      ? DistributionResult.create({
          contractId: raw.id,
          affectedReceivablesUnitsQuantity:
            raw.distributionResult.affected_receivables_units_quantity,
          affectedReceivablesUnitsValue:
            raw.distributionResult.affected_receivables_units_value,
          commitmentSituation: raw.distributionResult.commitment_situation,
        })
      : undefined

    return Contract.create(
      {
        externalCode: raw.external_code,
        contractIdentifier: raw.contract_identifier,
        contractStatus: raw.contract_status ?? undefined,
        debtorContractDocument: raw.debtor_contract_document,
        participantCnpj: raw.participant_cnpj,
        holderDocument: raw.holder_document,
        contractEffectType: raw.contract_effect_type,
        outstandingBalanceOrLimit: raw.outstanding_balance_or_limit,
        minimumValueToBeMaintained: raw.minimum_value_to_be_maintained,
        signatureDate: Format.dateToIsoString(raw.signature_date),
        expirationDate: Format.dateToIsoString(raw.expiration_date),
        divisionRule: raw.division_rule,
        distributionResult: distributionResultData,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        deletedAt: raw.deleted_at ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

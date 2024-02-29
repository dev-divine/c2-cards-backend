import {
  Payment as RawPayment,
  CoveredReceivable as RawCoveredReceivable,
  UR as RawUR,
} from '@prisma/client'

import { Format } from '@core/utils/format'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { UR } from '@modules/ur/entities/ur'
import { Payment } from '@modules/ur/entities/payment'
import { CoveredReceivable } from '@modules/ur/entities/covered-receivable'

type RawType = RawUR & {
  payment?: RawPayment
  covered_receivables?: RawCoveredReceivable[]
}

export class PrismaURMapper {
  static toPrisma(ur: UR) {
    return {
      external_code: ur.externalCode,
      external_contract_code: ur.externalContractCode,
      contract_identifier: ur.contractIdentifier,
      holder_document: ur.holderDocument,
      created_at: ur.createdAt,
      updated_at: ur.updatedAt ? ur.updatedAt : undefined,
      deleted_at: ur.deletedAt ? ur.deletedAt : undefined,
      covered_receivables: ur.coveredReceivables
        ? {
            create: ur.coveredReceivables.map((cr) => ({
              accreditor_cnpj: cr.accreditorCnpj,
              final_recipient_user_document: cr.finalRecipientUserDocument,
              payment_arrangement_code: cr.paymentArrangementCode,
              settlement_date: new Date(cr.settlementDate),
              amount_to_encumber: cr.amountToEncumber,
            })),
          }
        : [],
      payment: ur.payment
        ? {
            create: {
              holder_domicile_document: ur.payment.holderDomicileDocument,
              account_type: ur.payment.accountType,
              compe: ur.payment.compe,
              ispb: ur.payment.ispb,
              agency: ur.payment.agency,
              account_number: ur.payment.accountNumber,
            },
          }
        : undefined,
    }
  }

  static toDomain(raw: RawType): UR {
    return UR.create(
      {
        externalCode: raw.external_code,
        externalContractCode: raw.external_contract_code,
        contractIdentifier: raw.contract_identifier,
        holderDocument: raw.holder_document,
        coveredReceivables:
          raw.covered_receivables?.map((cr) =>
            CoveredReceivable.create(
              {
                accreditorCnpj: cr.accreditor_cnpj,
                finalRecipientUserDocument: cr.final_recipient_user_document,
                paymentArrangementCode: cr.payment_arrangement_code,
                settlementDate: Format.dateToIsoString(cr.settlement_date),
                amountToEncumber: cr.amount_to_encumber,
              },
              new UniqueEntityID(cr.id),
            ),
          ) ?? ([] as CoveredReceivable[]),
        payment: raw.payment
          ? Payment.create(
              {
                holderDomicileDocument: raw.payment.holder_domicile_document,
                accountType: raw.payment.account_type,
                compe: raw.payment.compe,
                ispb: raw.payment.ispb,
                agency: raw.payment.agency,
                accountNumber: raw.payment.account_number,
              },
              new UniqueEntityID(raw.payment.id),
            )
          : ({} as Payment),
        createdAt: new Date(raw.created_at),
        updatedAt: raw.updated_at ? new Date(raw.updated_at) : undefined,
        deletedAt: raw.deleted_at ? new Date(raw.deleted_at) : undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

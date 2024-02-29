import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'
import { URRepository } from '@modules/ur/repositories/ur-repository'

import { C2CardsCode } from '@core/utils/c2-cards-code'

import { UR } from '@modules/ur/entities/ur'
import { Payment } from '@modules/ur/entities/payment'
import { CoveredReceivable } from '@modules/ur/entities/covered-receivable'
import { CoveredReceivablesDTO } from '@modules/ur/dtos/covered-receivables-dto'

interface Input {
  contractExternalCode: string
  contractIdentifier: string
  holderDocument: string
  coveredReceivables: CoveredReceivablesDTO[]
  holderDomicileDocument: string
  accountType: string
  compe: string
  ispb: string
  agency: string
  accountNumber: string
}

type Output = void

export class CreateURUseCase {
  constructor(
    private readonly uRRepository: URRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({
    contractExternalCode,
    contractIdentifier,
    holderDocument,
    holderDomicileDocument,
    coveredReceivables,
    accountType,
    compe,
    ispb,
    agency,
    accountNumber,
  }: Input): Promise<Output> {
    const response = await this.registeringEntities.createUR({
      externalCode: C2CardsCode.generateExternalCode(),
      externalContractCode: contractExternalCode,
      contractIdentifier,
      holderDocument,
      coveredReceivables,
      payment: {
        holderDomicileDocument,
        accountType,
        compe,
        ispb,
        agency,
        accountNumber,
      },
    })

    if (!response || !!response?.success) {
      throw new Error('Error creating UR')
    }

    const ur = UR.create({
      externalCode: C2CardsCode.generateExternalCode(),
      externalContractCode: contractExternalCode,
      contractIdentifier,
      holderDocument,
      coveredReceivables: coveredReceivables.map((cr) => {
        return CoveredReceivable.create({
          accreditorCnpj: cr.accreditorCnpj,
          finalRecipientUserDocument: cr.finalRecipientUserDocument,
          paymentArrangementCode: cr.paymentArrangementCode,
          settlementDate: cr.settlementDate,
          amountToEncumber: cr.amountToEncumber,
        })
      }),
      payment: Payment.create({
        holderDomicileDocument,
        accountType,
        compe,
        ispb,
        agency,
        accountNumber,
      }),
    })

    await this.uRRepository.create(ur)
  }
}

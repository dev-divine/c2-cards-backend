import { C2CardsCode } from '@core/utils/c2-cards-code'

import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'
import { URRepository } from '@modules/ur/repositories/ur-repository'

interface Input {
  externalContractCode: string
  contractIdentifier: string
  holderDomicileDocument: string
  accountType: string
  compe: string
  ispb: string
  agency: string
  accountNumber: string
}

type Output = void

export class EditDomicileURUseCase {
  constructor(
    private readonly uRRepository: URRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({
    externalContractCode,
    contractIdentifier,
    holderDomicileDocument,
    accountType,
    compe,
    ispb,
    agency,
    accountNumber,
  }: Input): Promise<Output> {
    const response = await this.registeringEntities.saveDomicileUR({
      externalCode: C2CardsCode.generateExternalCode(),
      externalContractCode,
      contractIdentifier,
      payment: {
        accountNumber,
        accountType,
        agency,
        compe,
        holderDomicileDocument,
        ispb,
      },
    })

    if (!response || !!response?.success) {
      throw new Error('Error removing UR')
    }
    await this.uRRepository.saveDomicile({
      externalCode: C2CardsCode.generateExternalCode(),
      externalContractCode,
      contractIdentifier,
      payment: {
        holderDomicileDocument,
        accountType,
        compe,
        ispb,
        agency,
        accountNumber,
      },
    })
  }
}

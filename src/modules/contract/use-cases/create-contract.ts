import { Contract } from '@modules/contract/entities/contract'
import { ContractRepository } from '@modules/contract/repositories/contract-repository'

import { env } from '@infra/env'
import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'

interface Input {
  debtorContractDocument: string
  holderDocument: string
  contractEffectType: number
  outstandingBalanceOrLimit: number
  minimumValueToBeMaintained: number
  signatureDate: string
  expirationDate: string
}

type Output = void

export class CreateContractUseCase {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({
    debtorContractDocument,
    holderDocument,
    contractEffectType,
    outstandingBalanceOrLimit,
    minimumValueToBeMaintained,
    signatureDate,
    expirationDate,
  }: Input): Promise<Output> {
    const response = await this.registeringEntities.createContract({
      debtorContractDocument,
      holderDocument,
      contractEffectType,
      outstandingBalanceOrLimit,
      minimumValueToBeMaintained,
      signatureDate,
      expirationDate,
    })

    if (!response || !!response.success) {
      throw new Error('Error on registering opt-in')
    }

    const { externalCode, contractIdentifier } = response

    const optInEntity = Contract.create({
      externalCode,
      contractIdentifier,
      debtorContractDocument,
      participantCnpj: env.C2_CARDS_DOCUMENT,
      holderDocument,
      contractEffectType,
      outstandingBalanceOrLimit,
      minimumValueToBeMaintained,
      signatureDate,
      expirationDate,
      divisionRule: 2,
    })

    await this.contractRepository.create(optInEntity)
  }
}

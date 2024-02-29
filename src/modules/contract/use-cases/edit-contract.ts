import { ContractRepository } from '@modules/contract/repositories/contract-repository'

import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'

interface Input {
  externalCode: string
  outstandingBalanceOrLimit: number
  minimumValueToBeMaintained: number
}

type Output = void

export class EditContractUseCase {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({
    externalCode,
    outstandingBalanceOrLimit,
    minimumValueToBeMaintained,
  }: Input): Promise<Output> {
    const response = await this.registeringEntities.saveContract({
      externalCode,
      outstandingBalanceOrLimit,
      minimumValueToBeMaintained,
    })

    if (!response || !!response?.success) {
      throw new Error('Error on registering opt-out')
    }

    await this.contractRepository.save({
      externalCode,
      outstandingBalanceOrLimit,
      minimumValueToBeMaintained,
    })
  }
}

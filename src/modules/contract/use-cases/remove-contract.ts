import { ContractRepository } from '@modules/contract/repositories/contract-repository'

import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'

interface Input {
  operationType: string
  externalCode: string
  contractIdentifier: string
}

type Output = void

export class RemoveContractUseCase {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({
    operationType,
    externalCode,
    contractIdentifier,
  }: Input): Promise<Output> {
    const response = await this.registeringEntities.removeContract({
      operationType,
      externalCode,
      contractIdentifier,
    })

    if (!response || !!response.success) {
      throw new Error('Error on registering opt-in')
    }

    await this.contractRepository.remove(externalCode)
  }
}

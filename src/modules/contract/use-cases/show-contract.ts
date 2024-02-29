import { Contract } from '@modules/contract/entities/contract'
import { ContractRepository } from '@modules/contract/repositories/contract-repository'

import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'

interface Input {
  externalCode: string
  contractIdentifier: string
}

interface Output {
  contract: Contract | undefined
}

export class ShowContractUseCase {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({ externalCode, contractIdentifier }: Input): Promise<Output> {
    const response = await this.registeringEntities.showContract({
      externalCode,
      contractIdentifier,
    })

    if (!response || !!response.success) {
      throw new Error('Error on registering opt-in')
    }

    const contract =
      await this.contractRepository.findByExternalCode(externalCode)

    return {
      contract,
    }
  }
}

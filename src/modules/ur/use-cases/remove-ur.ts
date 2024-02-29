import { C2CardsCode } from '@core/utils/c2-cards-code'
import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'
import { URRepository } from '@modules/ur/repositories/ur-repository'

interface Input {
  operationType: string
  externalContractCode: string
  contractIdentifier: string
}

type Output = void

export class RemoveURUseCase {
  constructor(
    private readonly uRRepository: URRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({
    operationType,
    contractIdentifier,
    externalContractCode,
  }: Input): Promise<Output> {
    const response = await this.registeringEntities.removeUR({
      externalCode: C2CardsCode.generateExternalCode(),
      externalContractCode,
      contractIdentifier,
      operationType,
    })

    if (!response || !!response?.success) {
      throw new Error('Error removing UR')
    }

    await this.uRRepository.remove(response.externalCode)
  }
}

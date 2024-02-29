import { AppError } from '@core/domain/errors/app-error'

import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'
import { URRepository } from '@modules/ur/repositories/ur-repository'
import { CoveredReceivablesDTO } from '../dtos/covered-receivables-dto'
import { C2CardsCode } from '@core/utils/c2-cards-code'

interface Input {
  operationType: string
  externalContractCode: string
  contractIdentifier: string
  coveredReceivables: CoveredReceivablesDTO[]
}

type Output = void

export class EditSimplifiedURUseCase {
  constructor(
    private readonly uRRepository: URRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({
    contractIdentifier,
    coveredReceivables,
    externalContractCode,
    operationType,
  }: Input): Promise<Output> {
    const response = await this.registeringEntities.saveSimplifiedUR({
      externalCode: C2CardsCode.generateExternalCode(),
      externalContractCode,
      contractIdentifier,
      actionType: operationType,
      coveredReceivables,
    })

    if (!response || !!response?.success) {
      throw new Error('Error removing UR')
    }

    await this.eCClientRepository.delete(id)
  }
}

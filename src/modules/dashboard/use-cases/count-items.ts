import { ECClientRepository } from '@modules/ec-client/repositories/ec-client-repository'
import { OptInRepository } from '@modules/opt/repositories/opt-in-repository'
import { URRepository } from '@modules/ur/repositories/ur-repository'

interface Output {
  eCClientCount: number
  optInCount: number
  uRCount: number
}

export class CountItemsUseCase {
  constructor(
    private readonly eCClientRepository: ECClientRepository,
    private readonly optInRepository: OptInRepository,
    private readonly uRRepository: URRepository,
  ) {}

  async execute(): Promise<Output> {
    const eCClientCount = await this.eCClientRepository.count()
    const optInCount = await this.optInRepository.count()
    const uRCount = await this.uRRepository.count()

    return {
      eCClientCount,
      optInCount,
      uRCount,
    }
  }
}

import { ECClientRepository } from '@modules/ec-clients/repositories/ec-client-repository'
import { ECClient } from '@modules/ec-clients/entities/ec-client'

interface Input {
  page: number
  perPage: number
}

interface Output {
  citizens: ECClient[] | undefined
  totalPages: number
}

export class ListECClientsUseCase {
  constructor(private readonly eCClientRepository: ECClientRepository) {}

  async execute({ page, perPage }: Input): Promise<Output> {
    const citizens = await this.eCClientRepository.findMany({
      page,
      perPage,
    })

    const totalPages = await this.eCClientRepository.getTotalPages(perPage)

    return {
      citizens,
      totalPages,
    }
  }
}

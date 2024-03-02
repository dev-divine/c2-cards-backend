import { ECClient } from '@modules/ec-client/entities/ec-client'
import { ECClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

interface Input {
  page: number
  perPage: number
}

interface Output {
  eCClients: ECClient[] | undefined
  totalPages: number
}

export class ListECClientsUseCase {
  constructor(private readonly eCClientRepository: ECClientRepository) {}

  async execute({ page, perPage }: Input): Promise<Output> {
    const eCClients = await this.eCClientRepository.listECClients({
      page,
      perPage,
    })

    const totalPages = await this.eCClientRepository.fetchTotalPages(perPage)

    return {
      eCClients,
      totalPages,
    }
  }
}

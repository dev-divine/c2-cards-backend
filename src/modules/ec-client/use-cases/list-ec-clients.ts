import { EcClient } from '@modules/ec-client/entities/ec-client'
import { EcClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

interface Input {
  page: number
  perPage: number
}

interface Output {
  ecClients: EcClient[] | undefined
  totalPages: number
}

export class ListECClientsUseCase {
  constructor(private readonly eCClientRepository: EcClientRepository) {}

  async execute({ page, perPage }: Input): Promise<Output> {
    const ecClients = await this.eCClientRepository.listECClients({
      page,
      perPage,
    })

    const totalPages = await this.eCClientRepository.fetchTotalPages(perPage)

    return {
      ecClients,
      totalPages,
    }
  }
}

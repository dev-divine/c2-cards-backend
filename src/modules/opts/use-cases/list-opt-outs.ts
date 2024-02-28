import { OptOut } from '@modules/opts/entities/opt-out'
import { OptOutRepository } from '@modules/opts/repositories/opt-out-repository'

interface Input {
  page: number
  perPage: number
  id?: string
}

interface Output {
  optOuts: OptOut[] | undefined
  totalPages: number
}

export class ListOptOutsUseCase {
  constructor(private readonly optOutRepository: OptOutRepository) {}

  async execute({ page, perPage, id }: Input): Promise<Output> {
    const optOuts = await this.eCClientRepository.findMany({
      page,
      perPage,
      id,
    })

    const totalPages = await this.eCClientRepository.getTotalPages(perPage)

    return {
      optOuts,
      totalPages,
    }
  }
}

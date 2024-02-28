import { OptIn } from '@modules/opts/entities/opt-in'
import { OptInRepository } from '@modules/opts/repositories/opt-in-repository'

interface Input {
  page: number
  perPage: number
  startDate?: Date
  endDate?: Date
}

interface Output {
  optIns: OptIn[] | undefined
  totalPages: number
  totalOptIns: number
}

export class ListOptInsUseCase {
  constructor(private readonly optInRepository: OptInRepository) {}

  async execute({ page, perPage, startDate, endDate }: Input): Promise<Output> {
    const startDateQuery = startDate ?? undefined
    const endDateQuery = endDate ?? undefined

    const optIns = await this.optInRepository.listOptIns({
      page,
      perPage,
      startDate: startDateQuery,
      endDate: endDateQuery,
    })

    const totalPages = await this.optInRepository.fetchTotalPages(perPage)
    const totalOptIns = await this.optInRepository.fetchTotalOptIns()

    return {
      optIns,
      totalPages,
      totalOptIns,
    }
  }
}

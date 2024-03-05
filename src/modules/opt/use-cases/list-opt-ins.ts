import { OptIn } from '@modules/opt/entities/opt-in'
import { OptInRepository } from '@modules/opt/repositories/opt-in-repository'

interface Input {
  page: number
  perPage: number
  startDate?: string
  endDate?: string
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
    const totalOptIns = await this.optInRepository.count()

    return {
      optIns,
      totalPages,
      totalOptIns,
    }
  }
}

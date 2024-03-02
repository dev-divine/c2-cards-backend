import { URRepository } from '@modules/ur/repositories/ur-repository'
import { UR } from '../entities/ur'

interface Input {
  page: number
  perPage: number
  startDate?: Date
  endDate?: Date
}

interface Output {
  urs: UR[] | undefined
  totalPages: number
  totalUrs: number
}

export class ListURsUseCase {
  constructor(private readonly uRRepository: URRepository) {}

  async execute({ page, perPage, startDate, endDate }: Input): Promise<Output> {
    const startDateQuery = startDate ?? undefined
    const endDateQuery = endDate ?? undefined

    const urs = await this.uRRepository.listUrs({
      page,
      perPage,
      startDate: startDateQuery,
      endDate: endDateQuery,
    })

    const totalPages = await this.uRRepository.fetchTotalPages(perPage)
    const totalUrs = await this.uRRepository.count()

    return {
      urs,
      totalPages,
      totalUrs,
    }
  }
}

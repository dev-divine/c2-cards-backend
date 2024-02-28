import { FilterDTO } from '@modules/opts/dtos/filter-dto'
import { OptIn } from '@modules/opts/entities/opt-in'

export interface OptInRepository {
  listOptIns(filters: FilterDTO): Promise<OptIn[]>
  saveOptIn(optIn: OptIn): Promise<void>
  createOptIn(optIn: OptIn): Promise<void>
  fetchTotalOptIns(): Promise<number>
  fetchTotalPages(perPage: number): Promise<number>
}

import { FilterDTO } from '@modules/opt/dtos/filter-dto'
import { OptIn } from '@modules/opt/entities/opt-in'

export interface OptInRepository {
  listOptIns(filters: FilterDTO): Promise<OptIn[]>
  saveOptIn(optIn: OptIn): Promise<void>
  createOptIn(optIn: OptIn): Promise<void>
  fetchTotalOptIns(): Promise<number>
  fetchTotalPages(perPage: number): Promise<number>
}

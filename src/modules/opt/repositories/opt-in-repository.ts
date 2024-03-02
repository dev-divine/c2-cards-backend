import { FilterDTO } from '@modules/opt/dtos/filter-dto'
import { OptIn } from '@modules/opt/entities/opt-in'

export interface OptInRepository {
  fetchTotalPages(perPage: number): Promise<number>
  listOptIns(filters: FilterDTO): Promise<OptIn[]>
  saveOptIn(optIn: OptIn): Promise<OptIn>
  createOptIn(optIn: OptIn): Promise<OptIn>
  count(): Promise<number>
}

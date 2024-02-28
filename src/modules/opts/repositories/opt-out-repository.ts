import { FilterDTO } from '@modules/opts/dtos/filter-dto'
import { OptOut } from '@modules/opts/entities/opt-out'

export interface OptOutRepository {
  listOptOuts(filters: FilterDTO): Promise<OptOut[]>
  createOptOut(optOut: OptOut): Promise<void>
  saveOptOut(optOut: OptOut): Promise<void>
}

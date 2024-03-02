import { FilterDTO } from '@modules/opt/dtos/filter-dto'
import { OptOut } from '@modules/opt/entities/opt-out'

export interface OptOutRepository {
  listOptOuts(filters: FilterDTO): Promise<OptOut[]>
  createOptOut(optOut: OptOut): Promise<OptOut>
  saveOptOut(optOut: OptOut): Promise<OptOut>
}

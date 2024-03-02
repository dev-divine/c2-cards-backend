import { UR } from '@modules/ur/entities/ur'

import { SaveURDomicileInputDTO } from '@infra/providers/registering-entities/dtos/save-ur-domicile-dto'
import { SaveURSimplifiedInputDTO } from '@infra/providers/registering-entities/dtos/save-ur-simplified-dto'
import { FilterDTO } from '../dtos/filter-dto'

export interface URRepository {
  count(): Promise<number>
  fetchTotalPages(perPage: number): Promise<number>
  listUrs(filters: FilterDTO): Promise<UR[]>
  create(ur: UR): Promise<void>
  saveSimplified(data: SaveURSimplifiedInputDTO): Promise<void>
  saveDomicile(data: SaveURDomicileInputDTO): Promise<void>
  remove(externalCode: string): Promise<void>
}

import { FilterDTO } from '@modules/contract/dtos/filter-dto'
import { SaveDTO } from '@modules/contract/dtos/save-dto'
import { Contract } from '@modules/contract/entities/contract'

export interface ContractRepository {
  findByExternalCode(externalCode: string): Promise<Contract | undefined>
  fetchTotalContracts(): Promise<number>
  fetchTotalPages(perPage: number): Promise<number>
  listContracts(filters: FilterDTO): Promise<Contract[]>
  create(contract: Contract): Promise<void>
  save(contract: SaveDTO): Promise<void>
  remove(externalCode: string): Promise<void>
}

import { ECClient } from '@modules/ec-client/entities/ec-client'
import { FilterDTO } from '@modules/ec-client/dtos/filter-dto'

export interface ECClientRepository {
  findById(id: string): Promise<ECClient | undefined>
  findByDocument(document: string): Promise<ECClient | undefined>
  count(): Promise<number>
  fetchTotalPages(perPage: number): Promise<number>
  listECClients(filters: FilterDTO): Promise<ECClient[]>
  create(eCClient: ECClient): Promise<ECClient>
  delete(id: string): Promise<boolean>
}

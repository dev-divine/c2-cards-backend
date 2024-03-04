import { FilterDTO } from '@modules/ec-client/dtos/filter-dto'
import { EcClient } from '@modules/ec-client/entities/ec-client'

export interface EcClientRepository {
  findById(id: string): Promise<EcClient | undefined>
  findByName(name: string): Promise<EcClient | undefined>
  findByDocument(document: string): Promise<EcClient | undefined>
  findByEmail(email: string): Promise<EcClient | undefined>
  findByPhone(phone: string): Promise<EcClient | undefined>
  count(): Promise<number>
  fetchTotalPages(perPage: number): Promise<number>
  listECClients(filters: FilterDTO): Promise<EcClient[]>
  create(ecClient: EcClient): Promise<EcClient>
  save(ecClient: EcClient): Promise<EcClient>
  remove(id: string): Promise<boolean>
}

// import { PaginationDTO } from '@modules/citizen/dtos/pagination-dto'
// import { Citizen } from '@modules/citizen/entities/citizen'

import { ECClient } from '@modules/ec-clients/entities/ec-client'

export interface ECClientRepository {
  findById(id: string): Promise<ECClient | undefined>
  findByDocument(document: string): Promise<ECClient | undefined>
  create(eCClient: ECClient): Promise<ECClient>
  delete(id: string): Promise<void>
}

// findByPhone(phone: string): Promise<Citizen | undefined>
// findMany({ page, perPage }: PaginationDTO): Promise<Citizen[] | undefined>
// getTotalPages(perPage: number): Promise<number>
// save(citizen: Citizen): Promise<Citizen>

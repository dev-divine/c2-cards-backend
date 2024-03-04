import { PaginationDTO } from '@modules/user/dtos/pagination-dto'
import { User } from '@modules/user/entities/user'

export interface UserRepository {
  findById(userId: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  findByDocument(document: string): Promise<User | undefined>
  findByPhone(phone: string): Promise<User | undefined>
  findByWhatsapp(whatsapp: string): Promise<User | undefined>
  findMany({ page, perPage }: PaginationDTO): Promise<User[] | undefined>
  getTotalPages(perPage: number): Promise<number>
  create(user: User): Promise<User>
  save(user: User): Promise<User>
  remove(userId: string): Promise<boolean>
}

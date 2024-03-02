import { User } from '@modules/user/entities/user'

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp,
      document: user.document,
      job: user.job,
      role: user.role,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: user.deletedAt,
    }
  }
}

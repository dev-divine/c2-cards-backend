import { User } from '@modules/user/entities/user'

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      document: user.document,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp,
      job: user.job,
      role: user.role,
      accessLevel: user.accessLevel,
      createdAt: user.createdAt,
    }
  }
}

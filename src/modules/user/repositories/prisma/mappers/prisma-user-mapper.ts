import { User as RawUser } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { User, UserRole } from '@modules/user/entities/user'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      document: user.document,
      phone: user.phone,
      whatsapp: user.whatsapp,
      job: user.job,
      role: user.role,
      password: user.password,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: user.deletedAt,
    }
  }

  static toDomain(raw: RawUser): User {
    return User.create(
      {
        name: raw.name,
        surname: raw.surname,
        email: raw.email,
        document: raw.document,
        phone: raw.phone,
        whatsapp: raw.whatsapp,
        job: raw.job ?? undefined,
        role: raw.role as UserRole,
        password: raw.password,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        deletedAt: raw.deleted_at ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

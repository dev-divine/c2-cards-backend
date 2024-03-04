import { User as RawUser } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { Role, User } from '@modules/user/entities/user'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      document: user.document,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp,
      job: user.job,
      role: user.role,
      password: user.password,
      accessLevel: user.accessLevel,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    }
  }

  static toDomain(raw: RawUser): User {
    return User.create(
      {
        name: raw.name,
        document: raw.document,
        email: raw.email,
        phone: raw.phone,
        whatsapp: raw.whatsapp,
        job: raw.job,
        role: raw.role as Role,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

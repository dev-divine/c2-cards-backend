import { User as RawUser } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { User, UserRole } from '@modules/user/entities/user'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      sports_facility_id: user.sportsFacilityId,
      name: user.name,
      email: user.email,
      document: user.document,
      phone: user.phone,
      password: user.password,
      position: user.position,
      job: user.job,
      last_rent: user.lastRent,
      number_of_rentals: user.numberOfRentals,
      role: user.role,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: user.deletedAt,
    }
  }

  static toDomain(raw: RawUser): User {
    return User.create(
      {
        sportsFacilityId: raw.sports_facility_id ?? undefined,
        name: raw.name,
        email: raw.email,
        document: raw.document,
        phone: raw.phone,
        password: raw.password,
        position: raw.position ?? undefined,
        job: raw.job ?? undefined,
        role: raw.role as UserRole,
        lastRent: raw.last_rent ?? undefined,
        numberOfRentals: raw.number_of_rentals ?? undefined,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        deletedAt: raw.deleted_at ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}

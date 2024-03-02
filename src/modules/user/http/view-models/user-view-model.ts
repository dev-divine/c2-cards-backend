import { User } from '@modules/user/entities/user'

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      sports_facility_id: user.sportsFacilityId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      position: user.position,
      document: user.document,
      job: user.job,
      role: user.role,
      last_rent: user.lastRent,
      number_of_rentals: user.numberOfRentals,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: user.deletedAt,
    }
  }
}

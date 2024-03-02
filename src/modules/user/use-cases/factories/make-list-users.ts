import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'
import { PrismaSportsFacilityRepository } from '@modules/sports-facility/repositories/prisma/repositories/sports-facility-repository'

import { ListUsersUseCase } from '@modules/user/use-cases/list-users'

export function makeListUsersUseCase() {
  const userRepository = new PrismaUserRepository()
  const sportsFacilityRepository = new PrismaSportsFacilityRepository()

  return new ListUsersUseCase(userRepository, sportsFacilityRepository)
}

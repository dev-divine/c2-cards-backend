import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'

import { UserProfileUseCase } from '@modules/user/use-cases/user-profile'

export function makeUserProfileUseCase() {
  const userRepository = new PrismaUserRepository()

  return new UserProfileUseCase(userRepository)
}

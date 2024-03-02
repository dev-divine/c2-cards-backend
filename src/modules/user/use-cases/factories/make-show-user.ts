import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'

import { ShowUserUseCase } from '@modules/user/use-cases/show-user'

export function makeShowUserUseCase() {
  const userRepository = new PrismaUserRepository()

  return new ShowUserUseCase(userRepository)
}

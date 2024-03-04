import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'

import { RemoveUserUseCase } from '@modules/user/use-cases/remove-user'

export function makeRemoveUserUseCase() {
  const userRepository = new PrismaUserRepository()

  return new RemoveUserUseCase(userRepository)
}

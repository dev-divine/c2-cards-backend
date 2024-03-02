import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'

import { DeleteUserUseCase } from '@modules/user/use-cases/delete-user'

export function makeDeleteUserUseCase() {
  const userRepository = new PrismaUserRepository()

  return new DeleteUserUseCase(userRepository)
}

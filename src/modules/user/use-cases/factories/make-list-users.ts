import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'

import { ListUsersUseCase } from '@modules/user/use-cases/list-users'

export function makeListUsersUseCase() {
  const userRepository = new PrismaUserRepository()
 
  return new ListUsersUseCase(userRepository, null) // Replace `null` with the appropriate second argument
}

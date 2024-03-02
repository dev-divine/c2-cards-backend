import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'

import { SaveUserUseCase } from '@modules/user/use-cases/save-user'

export function makeSaveUserUseCase() {
  const userRepository = new PrismaUserRepository()

  return new SaveUserUseCase(userRepository)
}

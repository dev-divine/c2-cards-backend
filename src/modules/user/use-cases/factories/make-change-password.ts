import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'

import { Bcrypt } from '@infra/providers/hash/bcrypt/bcrypt'
import { ChangePasswordUseCase } from '@modules/user/use-cases/change-password'

export function makeChangePasswordUseCase() {
  const usersRepository = new PrismaUserRepository()
  const hash = new Bcrypt()

  return new ChangePasswordUseCase(usersRepository, hash)
}

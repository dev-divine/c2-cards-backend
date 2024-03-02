import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'

import { AuthenticateUseCase } from '@modules/user/use-cases/authenticate'

import { Bcrypt } from '@infra/providers/hash/bcrypt/bcrypt'

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUserRepository()
  const hash = new Bcrypt()

  return new AuthenticateUseCase(userRepository, hash)
}

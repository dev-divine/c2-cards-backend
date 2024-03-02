import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'
import { PrismaUserTokensRepository } from '@modules/user/repositories/prisma/repositories/user-tokens-respository'

import { ForgotPasswordUseCase } from '@modules/user/use-cases/forgot-password'

import { Bcrypt } from '@infra/providers/hash/bcrypt/bcrypt'

export function makeForgotPasswordUseCase() {
  const usersRepository = new PrismaUserRepository()
  const usersTokenRepository = new PrismaUserTokensRepository()
  const hash = new Bcrypt()

  return new ForgotPasswordUseCase(usersRepository, usersTokenRepository, hash)
}

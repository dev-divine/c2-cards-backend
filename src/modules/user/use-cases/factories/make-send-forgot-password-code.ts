import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'
import { PrismaUserTokensRepository } from '@modules/user/repositories/prisma/repositories/user-tokens-respository'

import { SendForgotPasswordCodeUseCase } from '@modules/user/use-cases/send-forgot-password-code'

export function makeSendForgotPasswordCode() {
  const usersRepository = new PrismaUserRepository()
  const userTokenRepository = new PrismaUserTokensRepository()

  return new SendForgotPasswordCodeUseCase(usersRepository, userTokenRepository)
}

import { randomUUID } from 'node:crypto'

import { Utils } from '@core/utils/string'
import { AppError } from '@core/domain/errors/app-error'

import { UserToken } from '@modules/user/entities/user-token'
import { UserRepository } from '@modules/user/repositories/user-repository'
import { UserTokensRepository } from '@modules/user/repositories/user-tokens-respository'
import { sendMail } from '@modules/user/use-cases/send-email'

interface Input {
  email: string
}

interface Output {
  token: string
}

export class SendForgotPasswordCodeUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokensRepository,
  ) {}

  async execute({ email }: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError({
        code: 'user.user_not_found',
      })
    }

    if (user?.email !== email) {
      throw new AppError({
        code: 'user.user_not_found',
      })
    }

    const code = Utils.GenerateRandomCode(4)

    const userToken = UserToken.create({
      userId: user.id,
      token: randomUUID(),
      code,
      usage: false,
    })

    await this.userTokenRepository.create(userToken)

    await sendMail({ name: user.name, email: user.email, code })

    return {
      token: userToken.token,
    }
  }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppError } from '@core/domain/errors/app-error'

import { UserRepository } from '@modules/user/repositories/user-repository'
import { UserTokensRepository } from '@modules/user/repositories/user-tokens-respository'

import { DateInstance } from '@infra/providers/date/date'
import { Hash } from '@infra/providers/hash/hash'

interface ForgotPasswordInput {
  token: string
  code: string
  password: string
}

export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokensRepository,
    private readonly hash: Hash,
  ) {}

  async execute({ token, code, password }: ForgotPasswordInput): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token)

    if (!userToken) {
      throw new AppError({
        code: 'user.token_not_found',
      })
    }

    if (userToken.usage) {
      throw new AppError({
        code: 'user.token_already_used',
      })
    }

    if (userToken.code !== code) {
      throw new AppError({
        code: 'user.token_invalid',
      })
    }

    const expiredAt = DateInstance.add(userToken.createdAt!, 3, 'hour')

    if (DateInstance.isAfter(new Date(), expiredAt)) {
      throw new AppError({
        code: 'user.token_expired',
      })
    }

    const user = await this.userRepository.findById(userToken.userId)

    if (!user) {
      throw new AppError({
        code: 'user.user_not_found',
      })
    }

    user.password = await this.hash.generate(password)
    userToken.usage = true

    await this.userRepository.save(user)
    await this.userTokenRepository.save(userToken)
  }
}

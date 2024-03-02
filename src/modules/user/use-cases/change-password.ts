import { AppError } from '@core/domain/errors/app-error'

import { UserRepository } from '@modules/user/repositories/user-repository'
import { Hash } from '@infra/providers/hash/hash'

interface ChangePasswordInput {
  userId: string
  password: string
}

export class ChangePasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private readonly hash: Hash,
  ) {}

  async execute({ userId, password }: ChangePasswordInput): Promise<void> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError({
        code: 'user.user_not_found',
      })
    }

    if (!password) {
      throw new AppError({
        code: 'user.password_required',
      })
    }

    user.password = await this.hash.generate(password)

    await this.userRepository.save(user)
  }
}

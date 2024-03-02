import { AppError } from '@core/domain/errors/app-error'

import { User } from '@modules/user/entities/user'
import { UserRepository } from '@modules/user/repositories/user-repository'

interface Input {
  userId: string
}

interface Output {
  rawUser: User
}

export class UserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ userId }: Input): Promise<Output> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new AppError({
        code: 'user.user_not_found',
      })
    }

    return {
      rawUser: user,
    }
  }
}

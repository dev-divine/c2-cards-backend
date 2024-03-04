import { AppError } from '@core/domain/errors/app-error'

import { User } from '@modules/user/entities/user'

interface Input {
  user: User
}

interface Output {
  user: User
}

export class ProfileUseCase {
  async execute({ user }: Input): Promise<Output> {
    if (!user) {
      throw new AppError({
        code: 'user.user_not_found',
      })
    }

    return {
      user,
    }
  }
}

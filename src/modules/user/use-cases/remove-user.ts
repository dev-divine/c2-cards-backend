import { AppError } from '@core/domain/errors/app-error'

import { UserRepository } from '@modules/user/repositories/user-repository'

interface Input {
  id: string
}

interface Output {
  success: boolean
}

export class RemoveUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new AppError({
        code: 'user.user_not_found',
      })
    }

    const success = await this.userRepository.remove(id)

    return {
      success,
    }
  }
}

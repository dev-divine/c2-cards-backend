import { AppError } from '@core/domain/errors/app-error'
import { User } from '@modules/user/entities/user'
import { UserRepository } from '@modules/user/repositories/user-repository'

interface Input {
  id: string
}

interface Output {
  user: User
}

export class ShowUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const user = await this.userRepository.findById(id)
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

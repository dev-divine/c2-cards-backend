import { AppError } from '@core/domain/errors/app-error'

import { User } from '@modules/user/entities/user'
import { UserRepository } from '@modules/user/repositories/user-repository'

import { Hash } from '@infra/providers/hash/hash'

interface Input {
  document: string
  password: string
}

interface Output {
  user: User
}

export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: Hash,
  ) {}

  async execute({ document, password }: Input): Promise<Output> {
    const user = await this.userRepository.findByDocument(document)
    if (!user) {
      throw new AppError({
        code: 'auth.invalid_credentials',
      })
    }

    if (!user.password) {
      throw new AppError({
        code: 'auth.invalid_credentials',
      })
    }

    const doesPasswordMatches = await this.hash.compare(password, user.password)
    if (!doesPasswordMatches) {
      throw new AppError({
        code: 'auth.invalid_credentials',
      })
    }

    await this.userRepository.save(user)

    return {
      user,
    }
  }
}

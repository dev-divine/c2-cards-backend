import { User } from '@modules/user/entities/user'
import { UserRepository } from '@modules/user/repositories/user-repository'

interface Input {
  id: string
}

interface Output {
  user: User | undefined
}

export class ShowUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const user = await this.userRepository.findById(id)

    return {
      user,
    }
  }
}

import { UserRepository } from '@modules/user/repositories/user-repository'

interface Input {
  id: string
}

type Output = void

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: Input): Promise<Output> {
    await this.userRepository.findById(id)
  }
}

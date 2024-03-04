import { User } from '@modules/user/entities/user'
import { UserRepository } from '@modules/user/repositories/user-repository'

interface Input {
  page: number
  perPage: number
}

interface Output {
  users: User[] | undefined
  totalPages: number
}

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ page, perPage }: Input): Promise<Output> {
    const users = await this.userRepository.findMany({
      page,
      perPage,
    })

    const totalPages = await this.userRepository.getTotalPages(perPage)

    return {
      users,
      totalPages,
    }
  }
}

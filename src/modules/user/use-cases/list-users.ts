import { User } from '@modules/user/entities/user'
import { UserRepository } from '@modules/user/repositories/user-repository'
import { SportsFacilityRepository } from '@modules/sports-facility/repositories/sports-facility-repository'
import { SelectOptionsDTO } from '../dtos/select-options-dto'

interface Input {
  page: number
  perPage: number
}

interface Output {
  users: User[] | undefined
  totalPages: number
  sportsFacilitiesOptions: SelectOptionsDTO[] | undefined
}

export class ListUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sportsFacilityRepository: SportsFacilityRepository,
  ) {}

  async execute({ page, perPage }: Input): Promise<Output> {
    const users = await this.userRepository.findMany({
      page,
      perPage,
    })

    const sportsFacilitiesOptions =
      await this.sportsFacilityRepository.selectOptions()

    const totalPages = await this.userRepository.getTotalPages(perPage)

    return {
      users,
      totalPages,
      sportsFacilitiesOptions,
    }
  }
}

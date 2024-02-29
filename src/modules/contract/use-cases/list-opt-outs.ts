import { OptOut } from '@modules/opt/entities/opt-out'
import { OptOutRepository } from '@modules/opt/repositories/opt-out-repository'

interface Input {
  page: number
  perPage: number
  id?: string
}

interface Output {
  optOuts: OptOut[] | undefined
}

export class ListOptOutsUseCase {
  constructor(private readonly optOutRepository: OptOutRepository) {}

  async execute({ page, perPage, id }: Input): Promise<Output> {
    const optOuts = await this.optOutRepository.listOptOuts({
      page,
      perPage,
      id,
    })

    return {
      optOuts,
    }
  }
}

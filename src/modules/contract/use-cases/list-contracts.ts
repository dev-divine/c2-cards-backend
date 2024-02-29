import { Contract } from '@modules/contract/entities/contract'
import { ContractRepository } from '@modules/contract/repositories/contract-repository'

interface Input {
  page: number
  perPage: number
  startDate?: Date
  endDate?: Date
}

interface Output {
  contracts: Contract[] | undefined
  totalPages: number
  totalContracts: number
}

export class ListContractsUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute({ page, perPage, startDate, endDate }: Input): Promise<Output> {
    const startDateQuery = startDate ?? undefined
    const endDateQuery = endDate ?? undefined

    const contracts = await this.contractRepository.listContracts({
      page,
      perPage,
      startDate: startDateQuery,
      endDate: endDateQuery,
    })

    const totalPages = await this.contractRepository.fetchTotalPages(perPage)
    const totalContracts = await this.contractRepository.fetchTotalContracts()

    return {
      contracts,
      totalPages,
      totalContracts,
    }
  }
}

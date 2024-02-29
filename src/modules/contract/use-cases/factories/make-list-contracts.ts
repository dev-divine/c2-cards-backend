import { ListContractsUseCase } from '@modules/contract/use-cases/list-contracts'

export function makeListContractsUseCase() {
  return new ListContractsUseCase()
}

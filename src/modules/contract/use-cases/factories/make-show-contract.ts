import { ShowContractUseCase } from '@modules/contract/use-cases/show-contract'

export function makeShowContractUseCase() {
  return new ShowContractUseCase()
}

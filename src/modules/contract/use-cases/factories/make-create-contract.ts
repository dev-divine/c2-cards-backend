import { CreateContractUseCase } from '@modules/contract/use-cases/create-contract'

export function makeCreateContractUseCase() {
  return new CreateContractUseCase()
}

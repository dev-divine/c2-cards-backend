import { RemoveContractUseCase } from '@modules/contract/use-cases/remove-contract'

export function makeRemoveContractUseCase() {
  return new RemoveContractUseCase()
}

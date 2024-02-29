import { EditContractUseCase } from '@modules/contract/use-cases/edit-contract'

export function makeEditContractUseCase() {
  return new EditContractUseCase()
}

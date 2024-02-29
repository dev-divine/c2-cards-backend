import { CreateOptOutUseCase } from '@modules/opt/use-cases/create-opt-out'

export function makeCreateOptOutUseCase() {
  return new CreateOptOutUseCase()
}

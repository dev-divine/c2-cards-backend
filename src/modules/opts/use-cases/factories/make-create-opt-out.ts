import { CreateOptOutUseCase } from '@modules/opts/use-cases/create-opt-out'

export function makeCreateOptOutUseCase() {
  return new CreateOptOutUseCase()
}

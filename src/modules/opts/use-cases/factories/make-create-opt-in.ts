import { CreateOptInUseCase } from '@modules/opts/use-cases/create-opt-in'

export function makeCreateOptInUseCase() {
  return new CreateOptInUseCase()
}

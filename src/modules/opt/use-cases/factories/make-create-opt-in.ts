import { CreateOptInUseCase } from '@modules/opt/use-cases/create-opt-in'

export function makeCreateOptInUseCase() {
  return new CreateOptInUseCase()
}

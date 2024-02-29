import { CreateURUseCase } from '@modules/ur/use-cases/create-ur'

export function makeCreateURUseCase() {
  return new CreateURUseCase()
}

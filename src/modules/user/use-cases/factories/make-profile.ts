import { ProfileUseCase } from '@modules/user/use-cases/profile'

export function makeProfileUseCase() {
  return new ProfileUseCase()
}

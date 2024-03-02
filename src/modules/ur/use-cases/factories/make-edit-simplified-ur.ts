import { PrismaURRepository } from '@modules/ur/repositories/prisma/repositories/ur-repository'

import { EditSimplifiedURUseCase } from '@modules/ur/use-cases/edit-simplified-ur'

import { B3 } from '@infra/providers/registering-entities/b3'

export function makeEditSimplifiedURUseCase() {
  const uRRepository = new PrismaURRepository()
  const registeringEntitiesRepository = new B3()

  return new EditSimplifiedURUseCase(
    uRRepository,
    registeringEntitiesRepository,
  )
}

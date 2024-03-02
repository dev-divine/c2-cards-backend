import { PrismaURRepository } from '@modules/ur/repositories/prisma/repositories/ur-repository'

import { RemoveURUseCase } from '@modules/ur/use-cases/remove-ur'

import { B3 } from '@infra/providers/registering-entities/b3'

export function makeRemoveURUseCase() {
  const uRRepository = new PrismaURRepository()
  const registeringEntitiesRepository = new B3()

  return new RemoveURUseCase(uRRepository, registeringEntitiesRepository)
}

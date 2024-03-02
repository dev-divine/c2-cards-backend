import { PrismaURRepository } from '@modules/ur/repositories/prisma/repositories/ur-repository'

import { CreateURUseCase } from '@modules/ur/use-cases/create-ur'

import { B3 } from '@infra/providers/registering-entities/b3'

export function makeCreateURUseCase() {
  const uRRepository = new PrismaURRepository()
  const registeringEntitiesRepository = new B3()

  return new CreateURUseCase(uRRepository, registeringEntitiesRepository)
}

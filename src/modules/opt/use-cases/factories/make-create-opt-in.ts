import { PrismaOptInRepository } from '@modules/opt/repositories/prisma/repositories/opt-in-repository'

import { CreateOptInUseCase } from '@modules/opt/use-cases/create-opt-in'

import { B3 } from '@infra/providers/registering-entities/b3'

export function makeCreateOptInUseCase() {
  const optInRepository = new PrismaOptInRepository()
  const registeringEntitiesRepository = new B3()

  return new CreateOptInUseCase(optInRepository, registeringEntitiesRepository)
}

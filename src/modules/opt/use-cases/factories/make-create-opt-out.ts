import { PrismaOptOutRepository } from '@modules/opt/repositories/prisma/repositories/opt-out-repository'

import { CreateOptOutUseCase } from '@modules/opt/use-cases/create-opt-out'

import { B3 } from '@infra/providers/registering-entities/b3'

export function makeCreateOptOutUseCase() {
  const optOutRepository = new PrismaOptOutRepository()
  const registeringEntitiesRepository = new B3()

  return new CreateOptOutUseCase(
    optOutRepository,
    registeringEntitiesRepository,
  )
}

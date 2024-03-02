import { PrismaOptInRepository } from '@modules/opt/repositories/prisma/repositories/opt-in-repository'

import { ListOptInsUseCase } from '@modules/opt/use-cases/list-opt-ins'

export function makeListOptInsUseCase() {
  const optInRepository = new PrismaOptInRepository()

  return new ListOptInsUseCase(optInRepository)
}

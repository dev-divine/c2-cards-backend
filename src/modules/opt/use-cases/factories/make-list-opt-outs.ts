import { PrismaOptOutRepository } from '@modules/opt/repositories/prisma/repositories/opt-out-repository'

import { ListOptOutsUseCase } from '@modules/opt/use-cases/list-opt-outs'

export function makeListOptOutsUseCase() {
  const optOutRepository = new PrismaOptOutRepository()

  return new ListOptOutsUseCase(optOutRepository)
}

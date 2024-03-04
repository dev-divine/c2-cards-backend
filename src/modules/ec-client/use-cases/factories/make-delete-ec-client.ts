import { PrismaECClientRepository } from '@modules/ec-client/repositories/prisma/repositories/ec-client-repository'

import { RemoveECClientUseCase } from '@modules/ec-client/use-cases/remove-ec-client'

export function makeRemoveECClientUseCase() {
  const eCClientRepository = new PrismaECClientRepository()

  return new RemoveECClientUseCase(eCClientRepository)
}

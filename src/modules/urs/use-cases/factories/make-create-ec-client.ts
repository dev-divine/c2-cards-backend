import { PrismaECClientRepository } from '@modules/ec-client/repositories/prisma/repositories/ec-client-repository'

import { CreateECClientUseCase } from '@modules/ec-client/use-cases/create-ec-client'

export function makeCreateECClientUseCase() {
  const eCClientRepository = new PrismaECClientRepository()

  return new CreateECClientUseCase(eCClientRepository)
}

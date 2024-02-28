import { PrismaECClientRepository } from '@modules/ec-clients/repositories/prisma/repositories/ec-client-repository'

import { CreateECClientUseCase } from '@modules/ec-clients/use-cases/create-ec-client'

export function makeCreateECClientUseCase() {
  const eCClientRepository = new PrismaECClientRepository()

  return new CreateECClientUseCase(eCClientRepository)
}

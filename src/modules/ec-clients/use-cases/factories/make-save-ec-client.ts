import { PrismaECClientRepository } from '@modules/ec-clients/repositories/prisma/repositories/ec-client-repository'

import { SaveECClientUseCase } from '@modules/ec-clients/use-cases/save-ec-client'

export function makeSaveECClientUseCase() {
  const eCClientRepository = new PrismaECClientRepository()

  return new SaveECClientUseCase(eCClientRepository)
}

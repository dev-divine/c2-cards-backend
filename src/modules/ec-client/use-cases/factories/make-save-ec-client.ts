import { PrismaECClientRepository } from '@modules/ec-client/repositories/prisma/repositories/ec-client-repository'

import { SaveECClientUseCase } from '@modules/ec-client/use-cases/save-ec-client'

export function makeSaveECClientUseCase() {
  const eCClientRepository = new PrismaECClientRepository()

  return new SaveECClientUseCase(eCClientRepository)
}

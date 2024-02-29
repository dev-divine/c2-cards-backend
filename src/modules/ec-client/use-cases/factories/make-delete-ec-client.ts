import { PrismaECClientRepository } from '@modules/ec-client/repositories/prisma/repositories/ec-client-repository'

import { DeleteECClientUseCase } from '@modules/ec-client/use-cases/delete-ec-client'

export function makeDeleteECClientUseCase() {
  const eCClientRepository = new PrismaECClientRepository()

  return new DeleteECClientUseCase(eCClientRepository)
}

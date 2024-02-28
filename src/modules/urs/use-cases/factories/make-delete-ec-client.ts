import { PrismaECClientRepository } from '@modules/ec-clients/repositories/prisma/repositories/ec-client-repository'

import { DeleteECClientUseCase } from '@modules/ec-clients/use-cases/delete-ec-client'

export function makeDeleteECClientUseCase() {
  const eCClientRepository = new PrismaECClientRepository()

  return new DeleteECClientUseCase(eCClientRepository)
}

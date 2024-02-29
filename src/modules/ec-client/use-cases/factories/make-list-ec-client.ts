import { PrismaECClientRepository } from '@modules/ec-client/repositories/prisma/repositories/ec-client-repository'

import { ListECClientsUseCase } from '@modules/ec-client/use-cases/list-ec-clients'

export function makeListECClientsUseCase() {
  const eCClientRepository = new PrismaECClientRepository()

  return new ListECClientsUseCase(eCClientRepository)
}

import { PrismaECClientRepository } from '@modules/ec-clients/repositories/prisma/repositories/ec-client-repository'

import { ListECClientsUseCase } from '@modules/ec-clients/use-cases/list-ec-clients'

export function makeListECClientsUseCase() {
  const eCClientRepository = new PrismaECClientRepository()

  return new ListECClientsUseCase(eCClientRepository)
}

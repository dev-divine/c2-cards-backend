import { PrismaECClientRepository } from '@modules/ec-client/repositories/prisma/repositories/ec-client-repository'
import { PrismaOptInRepository } from '@modules/opt/repositories/prisma/repositories/opt-in-repository'
import { PrismaURRepository } from '@modules/ur/repositories/prisma/repositories/ur-repository'

import { CountItemsUseCase } from '@modules/dashboard/use-cases/count-items'

export function makeCountItemsUseCase() {
  const eCClientRepository = new PrismaECClientRepository()
  const optInRepository = new PrismaOptInRepository()
  // Agenda
  const uRRepository = new PrismaURRepository()

  return new CountItemsUseCase(
    eCClientRepository,
    optInRepository,
    // Agenda
    uRRepository,
  )
}

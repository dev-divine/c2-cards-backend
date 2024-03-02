import { PrismaURRepository } from '@modules/ur/repositories/prisma/repositories/ur-repository'

import { ListURsUseCase } from '@modules/ur/use-cases/list-urs'

export function makeListURsUseCase() {
  const uRRepository = new PrismaURRepository()

  return new ListURsUseCase(uRRepository)
}

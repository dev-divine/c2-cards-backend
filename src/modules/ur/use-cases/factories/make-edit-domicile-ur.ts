import { PrismaURRepository } from '@modules/ur/repositories/prisma/repositories/ur-repository'

import { EditDomicileURUseCase } from '@modules/ur/use-cases/edit-domicile-ur'

import { B3 } from '@infra/providers/registering-entities/b3'

export function makeEditDomicileURUseCase() {
  const uRRepository = new PrismaURRepository()
  const registeringEntitiesRepository = new B3()

  return new EditDomicileURUseCase(uRRepository, registeringEntitiesRepository)
}

import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-repository'

import { CreateUserUseCase } from '@modules/user/use-cases/create-user'

import { Bcrypt } from '@infra/providers/hash/bcrypt/bcrypt'

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const hash = new Bcrypt()

  return new CreateUserUseCase(userRepository, hash)
}

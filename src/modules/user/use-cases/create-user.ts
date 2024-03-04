import { AppError } from '@core/domain/errors/app-error'

import { Role, User } from '@modules/user/entities/user'
import { UserRepository } from '@modules/user/repositories/user-repository'

import { Hash } from '@infra/providers/hash/hash'

interface Input {
  name: string
  document: string
  email: string
  phone: string
  whatsapp: string
  job: string
  role: Role
  accessLevel: string
  password: string
}

interface Output {
  user: User
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: Hash,
  ) {}

  async execute({
    name,
    document,
    email,
    phone,
    whatsapp,
    job,
    role,
    accessLevel,
    password,
  }: Input): Promise<Output> {
    const documentAlready = await this.userRepository.findByDocument(document)
    if (documentAlready) {
      throw new AppError({
        code: 'user.document_already_exists',
      })
    }

    const emailAlready = await this.userRepository.findByEmail(email)
    if (emailAlready) {
      throw new AppError({
        code: 'user.email_already_exists',
      })
    }

    const phoneAlready = await this.userRepository.findByPhone(phone)
    if (phoneAlready) {
      throw new AppError({
        code: 'user.phone_already_exists',
      })
    }

    const whatsappAlready = await this.userRepository.findByWhatsapp(whatsapp)
    if (whatsappAlready) {
      throw new AppError({
        code: 'user.whatsapp_already_exists',
      })
    }

    const passwordHashed = await this.hash.generate(password)

    const user = User.create({
      name,
      document,
      email,
      phone,
      whatsapp,
      job,
      role: Role[role],
      accessLevel,
      password: passwordHashed,
    })

    await this.userRepository.create(user)

    return {
      user,
    }
  }
}

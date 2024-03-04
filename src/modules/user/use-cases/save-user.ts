import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Role, User } from '@modules/user/entities/user'
import { UserRepository } from '@modules/user/repositories/user-repository'

interface Input {
  id: string
  name: string
  document: string
  email: string
  phone: string
  whatsapp: string
  job: string
  role: Role
  accessLevel: string
}

interface Output {
  user: User | undefined
}

export class SaveUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    id,
    name,
    document,
    email,
    phone,
    whatsapp,
    job,
    role,
    accessLevel,
  }: Input): Promise<Output> {
    const userToUpdate = await this.userRepository.findById(id)
    if (!userToUpdate) {
      throw new AppError({
        code: 'user.user_not_found',
      })
    }

    const documentExists =
      document !== userToUpdate.document
        ? await this.userRepository.findByDocument(document)
        : null
    if (documentExists) {
      throw new AppError({
        code: 'user.document_already_exists',
      })
    }

    const emailExists =
      email !== userToUpdate.email
        ? await this.userRepository.findByEmail(email)
        : null
    if (emailExists) {
      throw new AppError({
        code: 'user.email_already_exists',
      })
    }

    const phoneExists =
      phone !== userToUpdate.phone
        ? await this.userRepository.findByPhone(phone)
        : null
    if (phoneExists) {
      throw new AppError({
        code: 'user.phone_already_exists',
      })
    }

    const whatsappExists =
      whatsapp !== userToUpdate.whatsapp
        ? await this.userRepository.findByWhatsapp(whatsapp)
        : null
    if (whatsappExists) {
      throw new AppError({
        code: 'user.whatsapp_already_exists',
      })
    }

    const user = User.create(
      {
        name: name ?? userToUpdate.name,
        document: document ?? userToUpdate.document,
        email: email ?? userToUpdate.email,
        phone: phone ?? userToUpdate.phone,
        whatsapp: whatsapp ?? userToUpdate.whatsapp,
        job: job ?? userToUpdate.job,
        role: Role[role] ?? userToUpdate.role,
        accessLevel: accessLevel ?? userToUpdate.accessLevel,
        password: userToUpdate.password,
      },
      new UniqueEntityID(id),
    )

    await this.userRepository.save(user)

    return {
      user,
    }
  }
}

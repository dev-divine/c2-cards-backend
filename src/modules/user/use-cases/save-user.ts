import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { User, UserRole } from '@modules/user/entities/user'
import { UserRepository } from '@modules/user/repositories/user-repository'

interface Input {
  id: string
  sportsFacilityId: string
  name: string
  email: string
  document: string
  phone: string
  position: string
  job: string
  role: 'SECRETARY' | 'DIRECTOR' | 'DIVISION_HEAD'
  lastRent?: Date
  numberOfRentals?: number
}

interface Output {
  user: User | undefined
}

export class SaveUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    id,
    sportsFacilityId,
    name,
    email,
    document,
    phone,
    position,
    job,
    role,
    lastRent,
    numberOfRentals,
  }: Input): Promise<Output> {
    const userToUpdate = await this.userRepository.findById(id)
    if (!userToUpdate) {
      throw new AppError({
        code: 'user.user_not_found',
      })
    }
    const emailAlreadyExists = await this.userRepository.findByEmail(email)
    if (emailAlreadyExists?.email !== email && emailAlreadyExists) {
      throw new AppError({
        code: 'user.email_already_exists',
      })
    }

    const cpfAlreadyExists = await this.userRepository.findByDocument(document)
    if (cpfAlreadyExists?.document !== document && cpfAlreadyExists) {
      throw new AppError({
        code: 'user.cpf_already_exists',
      })
    }

    const phoneAlreadyExists = await this.userRepository.findByPhone(phone)
    if (phoneAlreadyExists && phoneAlreadyExists.phone !== phone) {
      throw new AppError({
        code: 'user.phone_already_exists',
      })
    }

    const user = User.create(
      {
        sportsFacilityId,
        name,
        email,
        document,
        phone,
        job,
        password: userToUpdate.password,
        position,
        role: UserRole[role],
        lastRent,
        numberOfRentals,
      },
      new UniqueEntityID(id),
    )

    await this.userRepository.save(user)

    return {
      user,
    }
  }
}

import { AppError } from '@core/domain/errors/app-error'

import { User, UserRole } from '@modules/user/entities/user'
import { UserRepository } from '@modules/user/repositories/user-repository'

import { Hash } from '@infra/providers/hash/hash'

interface Input {
  name: string
  surname: string
  email: string
  document: string
  phone: string
  whatsapp: string
  job?: string
  role?: UserRole
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
    surname,
    email,
    document,
    phone,
    whatsapp,
    job,
    password,
  }: Input): Promise<Output> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email)
    if (emailAlreadyExists) {
      throw new AppError({
        code: 'user.email_already_exists',
      })
    }
    console.log('validou email')

    const cpfAlreadyExists = await this.userRepository.findByDocument(document)
    if (cpfAlreadyExists) {
      throw new AppError({
        code: 'user.cpf_already_exists',
      })
    }
    console.log('validou cpf')

    const phoneAlreadyExists = await this.userRepository.findByPhone(phone)
    if (phoneAlreadyExists) {
      throw new AppError({
        code: 'user.phone_already_exists',
      })
    }
    //console.log('validou phone')
    //console.log(password)
    try {
      const passwordHashed = await this.hash.generate(password)
      //Aqui pego o a senha hasheada
      //console.log("Senha",passwordHashed)
      const user = User.create({
        name,
        surname,
        email,
        document,
        phone,
        whatsapp,
        job,
        role: UserRole.USER,
        password: passwordHashed ?? 's',
      })
      console.log(user)
      await this.userRepository.create(user)

      return {
        user,
      }
    } catch (error) {
      throw new AppError({
        code: 'internal',
      })
    }
  }
}

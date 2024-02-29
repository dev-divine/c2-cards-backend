// import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
// import { AppError } from '@core/domain/errors/app-error'

// import { ECClient } from '@modules/ec-client/entities/ec-client'
// import { ECClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

// interface Input {
//   id: string
//   name: string
//   phone: string
//   cpf: string
// }

// interface Output {
//   citizen: ECClient | undefined
// }

// export class ShowURUseCase {
//   constructor(private readonly eCClientRepository: ECClientRepository) {}

//   async execute({ id, name, cpf, phone }: Input): Promise<Output> {
//     const citizenToUpdate = await this.eCClientRepository.findById(id)
//     if (!citizenToUpdate) {
//       throw new AppError({
//         code: 'citizen.citizen_not_found',
//       })
//     }

//     const cpfAlreadyExists = await this.eCClientRepository.findByDocument(cpf)
//     if (cpfAlreadyExists) {
//       throw new AppError({
//         code: 'citizen.cpf_already_exists',
//       })
//     }

//     const phoneAlreadyExists = await this.eCClientRepository.findByPhone(phone)
//     if (phoneAlreadyExists) {
//       throw new AppError({
//         code: 'citizen.phone_already_exists',
//       })
//     }

//     const citizen = ECClient.create(
//       {
//         name,
//         cpf,
//         phone,
//       },
//       new UniqueEntityID(id),
//     )

//     await this.eCClientRepository.save(citizen)

//     return {
//       citizen,
//     }
//   }
// }

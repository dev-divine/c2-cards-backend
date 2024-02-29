import { AppError } from '@core/domain/errors/app-error'

import { ECClient } from '@modules/ec-client/entities/ec-client'
import { ECClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

interface Input {
  companyName: string
  companyDocument: string
  companyEmail: string
  companyPhone: string
  companyZipCode: string
  companyState: string
  companyCity: string
  companyStreet: string
  companyNumber: string
  companyComplement?: string
  responsibleName: string
  responsibleDocument: string
  responsibleEmail: string
  responsibleWhatsapp: string
  zipCode: string
  state: string
  city: string
  street: string
  number: string
  complement?: string
}

interface Output {
  citizen: ECClient | undefined
}

export class CreateECClientUseCase {
  constructor(private readonly eCClientRepository: ECClientRepository) {}

  async execute({
    companyName,
    companyDocument,
    companyEmail,
    companyPhone,
    companyZipCode,
    companyState,
    companyCity,
    companyStreet,
    companyNumber,
    companyComplement,
    responsibleName,
    responsibleDocument,
    responsibleEmail,
    responsibleWhatsapp,
    zipCode,
    state,
    city,
    street,
    number,
    complement,
  }: Input): Promise<Output> {
    const ecClient =
      await this.eCClientRepository.findByDocument(companyDocument)
    if (!ecClient) {
      throw new AppError({
        code: 'EC_CLIENT.not_found',
      })
    }

    if (ecClient.companyDocument === companyDocument) {
      throw new AppError({
        code: 'EC_CLIENT.cnpj_alredy_exists',
      })
    }

    if (ecClient.companyEmail === companyEmail) {
      throw new AppError({
        code: 'EC_CLIENT.company_email_already_exists',
      })
    }

    if (ecClient.companyPhone === companyPhone) {
      throw new AppError({
        code: 'EC_CLIENT.company_phone_already_exists',
      })
    }

    const citizen = ECClient.create({
      companyName,
      companyDocument,
      companyEmail,
      companyPhone,
      companyZipCode,
      companyState,
      companyCity,
      companyStreet,
      companyNumber,
      companyComplement: companyComplement ?? 'Não informado',
      responsibleName,
      responsibleDocument,
      responsibleEmail,
      responsibleWhatsapp,
      zipCode,
      state,
      city,
      street,
      number,
      complement: complement ?? 'Não informado',
    })

    await this.eCClientRepository.create(citizen)

    return {
      citizen,
    }
  }
}

import { AppError } from '@core/domain/errors/app-error'

import { EcClient } from '@modules/ec-client/entities/ec-client'
import { EcClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

interface Input {
  companyName: string
  companyDocument: string
  companyPhone: string
  companyEmail: string
  companyZipCode: string
  companyState: string
  companyCity: string
  companyNeighborhood: string
  companyStreet: string
  companyNumber: string
  companyComplement?: string
  responsibleName: string
  responsibleEmail: string
  responsiblePhone: string
  responsibleDocument: string
  responsibleZipCode?: string
  responsibleState?: string
  responsibleCity?: string
  responsibleNeighborhood?: string
  responsibleStreet?: string
  responsibleNumber?: string
  responsibleComplement?: string
}

interface Output {
  ecClient: EcClient | undefined
}

export class CreateECClientUseCase {
  constructor(private readonly eCClientRepository: EcClientRepository) {}

  async execute({
    companyName,
    companyDocument,
    companyPhone,
    companyEmail,
    companyZipCode,
    companyState,
    companyCity,
    companyNeighborhood,
    companyStreet,
    companyNumber,
    companyComplement,
    responsibleName,
    responsibleEmail,
    responsibleDocument,
    responsibleZipCode,
    responsibleState,
    responsibleCity,
    responsibleNeighborhood,
    responsibleStreet,
    responsibleNumber,
    responsibleComplement,
  }: Input): Promise<Output> {
    const nameExists = await this.eCClientRepository.findByName(companyName)
    if (nameExists) {
      throw new AppError({
        code: 'ec_client.name_already_exists',
      })
    }

    const documentExists =
      await this.eCClientRepository.findByDocument(companyDocument)
    if (documentExists) {
      throw new AppError({
        code: 'ec_client.document_already_exists',
      })
    }

    const emailExists = await this.eCClientRepository.findByEmail(companyEmail)
    if (emailExists) {
      throw new AppError({
        code: 'ec_client.email_already_exists',
      })
    }

    const phoneExists = await this.eCClientRepository.findByPhone(companyPhone)
    if (phoneExists) {
      throw new AppError({
        code: 'ec_client.phone_already_exists',
      })
    }

    const ecClient = EcClient.create({
      companyName,
      companyDocument,
      companyPhone,
      companyEmail,
      companyZipCode,
      companyState,
      companyCity,
      companyNeighborhood,
      companyStreet,
      companyNumber,
      companyComplement: companyComplement ?? 'Não informado',
      responsibleName,
      responsibleEmail,
      responsibleDocument,
      responsibleZipCode,
      responsibleState,
      responsibleCity,
      responsibleNeighborhood,
      responsibleStreet,
      responsibleNumber,
      responsibleComplement: responsibleComplement ?? 'Não informado',
    })

    await this.eCClientRepository.create(ecClient)

    return {
      ecClient,
    }
  }
}

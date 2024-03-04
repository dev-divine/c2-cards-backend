import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { EcClient } from '@modules/ec-client/entities/ec-client'
import { EcClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

interface Input {
  id: string
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

export class SaveECClientUseCase {
  constructor(private readonly eCClientRepository: EcClientRepository) {}

  async execute({
    id,
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
    responsiblePhone,
    responsibleDocument,
    responsibleZipCode,
    responsibleState,
    responsibleCity,
    responsibleNeighborhood,
    responsibleStreet,
    responsibleNumber,
    responsibleComplement,
  }: Input): Promise<Output> {
    const eCClientToUpdate = await this.eCClientRepository.findById(id)
    if (!eCClientToUpdate) {
      throw new AppError({
        code: 'ec_client.ec_client_not_found',
      })
    }

    const nameExists =
      companyName !== eCClientToUpdate.companyName
        ? await this.eCClientRepository.findByName(companyName)
        : null
    if (nameExists) {
      throw new AppError({
        code: 'ec_client.name_already_exists',
      })
    }

    const documentExists =
      companyDocument !== eCClientToUpdate.companyDocument
        ? await this.eCClientRepository.findByDocument(companyDocument)
        : null
    if (documentExists) {
      throw new AppError({
        code: 'ec_client.document_already_exists',
      })
    }

    const emailExists =
      companyEmail !== eCClientToUpdate.companyEmail
        ? await this.eCClientRepository.findByEmail(companyEmail)
        : null
    if (emailExists) {
      throw new AppError({
        code: 'user.email_already_exists',
      })
    }

    const phoneExists =
      companyPhone !== eCClientToUpdate.companyPhone
        ? await this.eCClientRepository.findByPhone(companyPhone)
        : null
    if (phoneExists) {
      throw new AppError({
        code: 'user.phone_already_exists',
      })
    }

    const ecClient = EcClient.create(
      {
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
        responsiblePhone,
        responsibleDocument,
        responsibleZipCode,
        responsibleState,
        responsibleCity,
        responsibleNeighborhood,
        responsibleStreet,
        responsibleNumber,
        responsibleComplement,
      },
      new UniqueEntityID(id),
    )

    await this.eCClientRepository.save(ecClient)

    return {
      ecClient,
    }
  }
}

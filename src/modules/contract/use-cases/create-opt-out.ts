import { OptOut } from '@modules/opt/entities/opt-out'
import { OptOutRepository } from '@modules/opt/repositories/opt-out-repository'

import { env } from '@infra/env'
import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'

interface Input {
  companyName: string
  companyDocument: string
  responsibleName: string
  responsibleEmail: string
  responsiblePhone: string
  responsibleDocument: string
  externalCode: string
  b3Protocol: string
}

interface Output {
  optOut: OptOut | undefined
}

export class CreateOptOutUseCase {
  constructor(
    private readonly optOutRepository: OptOutRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({
    companyName,
    companyDocument,
    responsibleName,
    responsibleEmail,
    responsiblePhone,
    responsibleDocument,
    externalCode,
    b3Protocol,
  }: Input): Promise<Output> {
    const response = await this.registeringEntities.registerOptOut({
      externalCode,
      protocol: b3Protocol,
    })

    if (!response) {
      throw new Error('Error on registering opt-out')
    }

    const optOutEntity = OptOut.create({
      externalCode: response.externalCode,
      ecClientName: companyName,
      ecClientDocument: companyDocument,
      c2cardsDocument: env.C2_CARDS_DOCUMENT,
      responsibleName,
      responsibleEmail,
      responsibleWhatsapp: responsiblePhone,
      responsibleDocument,
      protocol: response.protocol,
    })

    await this.optOutRepository.createOptOut(optOutEntity)

    return {
      optOut: optOutEntity,
    }
  }
}

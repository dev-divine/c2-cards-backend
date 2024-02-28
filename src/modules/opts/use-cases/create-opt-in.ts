import { OptIn } from '@modules/opts/entities/opt-in'
import { OptInRepository } from '@modules/opts/repositories/opt-in-repository'

import { env } from '@infra/env'
import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'

interface Input {
  companyName: string
  companyDocument: string
  financialAgentDocument: string
  responsibleName: string
  responsibleEmail: string
  responsiblePhone: string
  responsibleDocument: string
  signatureDate: string
  activationDate: string
  expirationDate?: string
}

type Output = void

export class CreateOptInUseCase {
  constructor(
    private readonly optInRepository: OptInRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({
    companyName,
    companyDocument,
    financialAgentDocument,
    responsibleName,
    responsibleEmail,
    responsiblePhone,
    responsibleDocument,
    signatureDate,
    activationDate,
    expirationDate,
  }: Input): Promise<Output> {
    const { externalCode, protocol } =
      await this.registeringEntities.registerOptIn({
        financialAgentDocument,
        ecClientDocument: companyDocument,
        signatureDate,
        expirationDate,
      })

    const optInEntity = OptIn.create({
      externalCode,
      ecClientName: companyName,
      ecClientDocument: companyDocument,
      c2cardsDocument: env.C2_CARDS_DOCUMENT,
      financialAgentDocument,
      responsibleName,
      responsibleEmail,
      responsibleWhatsapp: responsiblePhone,
      responsibleDocument,
      signatureDate,
      activationDate,
      expirationDate: expirationDate ?? undefined,
      protocol,
    })

    await this.optInRepository.createOptIn(optInEntity)
  }
}

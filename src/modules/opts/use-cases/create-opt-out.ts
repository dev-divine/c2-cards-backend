import { OptOut } from '@modules/opts/entities/opt-out'
import { OptOutRepository } from '@modules/opts/repositories/opt-out-repository'

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
  constructor(private readonly optOutRepository: OptOutRepository) {}

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
    const optOutEntity = OptOut.create({
      ecClientName: companyName,
      ecClientDocument: companyDocument,
      responsibleName,
      responsibleEmail,
      responsibleWhatsapp: responsiblePhone,
      responsibleDocument,
      externalCode,
      protocol: b3Protocol,
    })

    await this.optOutRepository.createOptOut(optOutEntity)

    return {
      optOut: optOutEntity,
    }
  }
}

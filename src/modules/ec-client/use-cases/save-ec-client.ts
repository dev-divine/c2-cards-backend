import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { ECClient } from '@modules/ec-client/entities/ec-client'
import { ECClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

interface Input {
  id: string
  name: string
  phone: string
  cpf: string
}

interface Output {
  eCClient: ECClient | undefined
}

export class SaveECClientUseCase {
  constructor(private readonly eCClientRepository: ECClientRepository) {}

  async execute({ id, name, cpf, phone }: Input): Promise<Output> {
    const eCClientToUpdate = await this.eCClientRepository.findById(id)

    const eCClient = ECClient.create(
      {
        name,
        cpf,
        phone,
      },
      new UniqueEntityID(id),
    )

    await this.eCClientRepository.save(eCClient)

    return {
      eCClient,
    }
  }
}

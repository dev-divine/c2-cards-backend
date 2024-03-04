import { AppError } from '@core/domain/errors/app-error'

import { EcClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

interface Input {
  id: string
}

interface Output {
  success: boolean
}

export class RemoveECClientUseCase {
  constructor(private readonly eCClientRepository: EcClientRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const ecClient = await this.eCClientRepository.findById(id)
    if (!ecClient) {
      throw new AppError({
        code: 'ec_client.ec_client_not_found',
      })
    }

    const success = await this.eCClientRepository.remove(id)

    return {
      success,
    }
  }
}

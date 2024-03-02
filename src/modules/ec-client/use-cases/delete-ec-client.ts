import { AppError } from '@core/domain/errors/app-error'

import { ECClientRepository } from '@modules/ec-client/repositories/ec-client-repository'

interface Input {
  id: string
}

interface Output {
  success: boolean
}

export class DeleteECClientUseCase {
  constructor(private readonly eCClientRepository: ECClientRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const ecClient = await this.eCClientRepository.findById(id)
    if (!ecClient) {
      throw new AppError({
        code: 'EC_CLIENT.not_found',
      })
    }

    const success = await this.eCClientRepository.delete(id)

    return {
      success,
    }
  }
}

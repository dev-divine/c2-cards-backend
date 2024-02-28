import { AppError } from '@core/domain/errors/app-error'

import { ECClientRepository } from '@modules/ec-clients/repositories/ec-client-repository'

interface Input {
  id: string
}

type Output = void

export class DeleteECClientUseCase {
  constructor(private readonly eCClientRepository: ECClientRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const ecClient = await this.eCClientRepository.findById(id)
    if (!ecClient) {
      throw new AppError({
        code: 'EC_CLIENT.not_found',
      })
    }

    await this.eCClientRepository.delete(id)
  }
}

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { UserToken } from '@modules/user/entities/user-token'
import { UserToken as RawUserToken } from '@prisma/client'

export class PrismaUserTokensMapper {
  static toPrisma(user: UserToken) {
    return {
      id: user.id,
      user_id: user.userId,
      token: user.token,
      code: user.code,
      usage: user.usage,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    }
  }

  static toDomain(raw: RawUserToken): UserToken {
    const userToken = UserToken.create(
      {
        userId: raw.user_id,
        token: raw.token,
        code: raw.code,
        usage: raw.usage,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityID(raw.id),
    )

    return userToken
  }
}

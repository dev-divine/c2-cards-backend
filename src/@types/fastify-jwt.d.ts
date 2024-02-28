import '@fastify/jwt'

import { User } from '@modules/user/entities/user'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: 'SECRETARY' | 'DIRECTOR' | 'DIVISION_HEAD'
      sub: string
      data: User
    }
  }
}

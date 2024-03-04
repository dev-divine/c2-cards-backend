import { FastifyInstance } from 'fastify'

import { profile } from '@modules/user/http/controllers/profile'
import { authenticate } from '@modules/user/http/controllers/authenticate'
import { refreshToken } from '@modules/user/http/controllers/refresh-token'
import { showUser } from '@modules/user/http/controllers/show-user'
import { listUsers } from '@modules/user/http/controllers/list-users'
import { createUser } from '@modules/user/http/controllers/create-user'
import { saveUser } from '@modules/user/http/controllers/save-user'
import { removeUser } from '@modules/user/http/controllers/remove-user'

import { verifyJwt } from '@infra/http/middlewares/verify-jwt'

export async function UserRoutes(app: FastifyInstance) {
  app.post('/auth/sessions', authenticate)
  app.patch('/token/refresh', refreshToken)

  app.get('/user/me', { onRequest: [verifyJwt] }, profile)

  app.get('/user/:id', { onRequest: [verifyJwt] }, showUser)
  app.get('/user', { onRequest: [verifyJwt] }, listUsers)
  app.post('/user', { onRequest: [verifyJwt] }, createUser)
  app.put('/user/:id', { onRequest: [verifyJwt] }, saveUser)
  app.delete('/user/:id', { onRequest: [verifyJwt] }, removeUser)
}

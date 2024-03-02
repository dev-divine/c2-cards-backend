import { FastifyInstance } from 'fastify'

import { userProfile } from '@modules/user/http/controllers/user-profile'
import { authenticate } from '@modules/user/http/controllers/authenticate'
import { refreshToken } from '@modules/user/http/controllers/refresh-token'
import { showUser } from '@modules/user/http/controllers/show-user'
import { listUsers } from '@modules/user/http/controllers/list-users'
import { createUser } from '@modules/user/http/controllers/create-user'
import { saveUser } from '@modules/user/http/controllers/save-user'
import { deleteUser } from '@modules/user/http/controllers/delete-user'
import { sendForgotPasswordCode } from '@modules/user/http/controllers/send-forgot-password-code'
import { forgotPassword } from '@modules/user/http/controllers/forgot-password'
import { changePassword } from '@modules/user/http/controllers/change-password'

import { verifyJwt } from '@infra/http/middlewares/verify-jwt'
import { verifyUserRole } from '@infra/http/middlewares/verify-user-role'

export async function UserRoutes(app: FastifyInstance) {
  app.post('/auth/sessions', authenticate)
  app.post('/user', createUser)
  app.patch('/token/refresh', refreshToken)

  app.get('/user/:id', { onRequest: [verifyJwt] }, showUser)
  app.get('/user', { onRequest: [verifyJwt] }, listUsers)
  app.put(
    '/user/:id',
    { onRequest: [verifyJwt, verifyUserRole(['SECRETARY'])] },
    saveUser,
  )
  app.delete(
    '/user/:id',
    { onRequest: [verifyJwt, verifyUserRole(['SECRETARY'])] },
    deleteUser,
  )
  app.get('/user/me', { onRequest: [verifyJwt] }, userProfile)

  app.post('/user/forgot-password-code', sendForgotPasswordCode)
  app.post('/user/reset-password', forgotPassword)
  app.post('/user/password', { onRequest: [verifyJwt] }, changePassword)
}

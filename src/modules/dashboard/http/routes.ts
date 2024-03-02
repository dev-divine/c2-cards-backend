import { FastifyInstance } from 'fastify'

import { countItems } from '@modules/dashboard/http/controllers/count-items'

// import { verifyJwt } from '@infra/http/middlewares/verify-jwt'

export async function DashboardRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.get('/dashboard/count', countItems)
}

import { FastifyInstance } from 'fastify'

import { createOptIn } from '@modules/opt/http/controllers/create-opt-in'
import { createOptOut } from '@modules/opt/http/controllers/create-opt-out'
import { listOptIns } from '@modules/opt/http/controllers/list-opt-ins'
import { listOptOuts } from '@modules/opt/http/controllers/list-opt-outs'

// import { verifyJwt } from '@infra/http/middlewares/verify-jwt'

export async function OptsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.get('/opt-in', listOptIns)
  app.post('/opt-in', createOptIn)
  app.get('/opt-out', listOptOuts)
  app.put('/opt-out', createOptOut)
}

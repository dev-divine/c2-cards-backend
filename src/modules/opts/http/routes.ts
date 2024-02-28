import { FastifyInstance } from 'fastify'

import { listOptIns } from '@modules/opts/http/controllers/list-opt-ins'
import { createOptIn } from '@modules/opts/http/controllers/create-opt-in'
import { listOptOuts } from '@modules/opts/http/controllers/list-opt-outs'
import { createOptOut } from '@modules/opts/http/controllers/create-opt-out'

// import { verifyJwt } from '@infra/http/middlewares/verify-jwt'

export async function OptsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.get('/opt-in', listOptIns)
  app.post('/opt-in', createOptIn)
  app.get('/opt-out', listOptOuts)
  app.put('/opt-out', createOptOut)
}

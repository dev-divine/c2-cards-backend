import { FastifyInstance } from 'fastify'

import { createECClient } from '@modules/ec-client/http/controllers/create-ec-client'
import { deleteECClient } from '@modules/ec-client/http/controllers/delete-ec-client'
import { listECClients } from '@modules/ec-client/http/controllers/list-ec-clients'
import { saveECClient } from '@modules/ec-client/http/controllers/save-ec-client'

// import { verifyJwt } from '@infra/http/middlewares/verify-jwt'

export async function ECClientRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.get('/ec-clients', listECClients)
  app.post('/ec-client', createECClient)
  app.put('/ec-client/:id', saveECClient)
  app.delete('/ec-client/:id', deleteECClient)
}

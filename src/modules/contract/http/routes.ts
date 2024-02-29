import { FastifyInstance } from 'fastify'

import { showContract } from '@modules/contract/http/controllers/show-contract'
import { listContracts } from '@modules/contract/http/controllers/list-contracts'
import { createContract } from '@modules/contract/http/controllers/create-contract'
import { editContract } from '@modules/contract/http/controllers/edit-contract'
import { removeContract } from '@modules/contract/http/controllers/remove-contract'

// import { verifyJwt } from '@infra/http/middlewares/verify-jwt'

export async function ContractRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.get('/contract', showContract)
  app.get('/contract/list', listContracts)
  app.post('/contract', createContract)
  app.put('/contract', editContract)
  app.delete('/contract', removeContract)
}

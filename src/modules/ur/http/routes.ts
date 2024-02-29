import { FastifyInstance } from 'fastify'

// import { showUr } from '@infra/config/unused/show-ur-2'
import { listUrs } from '@modules/ur/http/controllers/list-urs'
import { createUr } from '@modules/ur/http/controllers/create-ur'
// import { editDetailedUr } from '@infra/config/unused/edit-detailed-ur-c'
import { editDomicileUr } from '@modules/ur/http/controllers/edit-domicile-ur'
import { editSimplifiedUr } from '@modules/ur/http/controllers/edit-simplified-ur'
import { removeUr } from '@modules/ur/http/controllers/remove-ur'

// import { verifyJwt } from '@infra/http/middlewares/verify-jwt'

export async function URRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  // app.get('/ur', showUr)
  app.get('/ur/list', listUrs)
  app.post('/ur', createUr)
  // app.put('/ur', editDetailedUr)
  app.put('/ur', editDomicileUr)
  app.put('/ur', editSimplifiedUr)
  app.delete('/ur', removeUr)
}

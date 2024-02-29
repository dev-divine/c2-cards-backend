import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { ECClientRoutes } from '@modules/ec-client/http/routes'
import { OptRoutes } from '@modules/opt/http/routes'
import { ContractRoutes } from '@modules/contract/http/routes'
import { URRoutes } from '@modules/ur/http/routes'

import { env } from '@infra/env'

export const app = fastify()

app.register(fastifyCors)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(ECClientRoutes)
app.register(OptRoutes)
app.register(ContractRoutes)
app.register(URRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { AppError } from '@core/domain/errors/app-error'

import { DashboardRoutes } from '@modules/dashboard/http/routes'
import { ECClientRoutes } from '@modules/ec-client/http/routes'
import { OptRoutes } from '@modules/opt/http/routes'
import { ContractRoutes } from '@modules/contract/http/routes'
import { URRoutes } from '@modules/ur/http/routes'
// import { ScheduleRoutes } from '@modules/schedule/http/routes'

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
    expiresIn: '7d',
  },
})

app.register(fastifyCookie)

app.register(DashboardRoutes)
app.register(ECClientRoutes)
app.register(OptRoutes)
app.register(ContractRoutes)
app.register(URRoutes)
// app.register(ScheduleRoutes)

app.setErrorHandler((error, req, reply) => {
  if (error instanceof ZodError) {
    const zError = error.format()
    const keys = Object.keys(zError)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const singleError = zError?.[keys?.[1]]?._errors?.[0] || ''
    return reply.status(400).send({
      code: 'schema.validation',
      error: singleError,
      message: singleError,
      data: error.format(),
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let isAppError = error as any
  if (isAppError?.type && isAppError?.type === 'AppError') {
    isAppError = error as AppError
    return reply.status(isAppError.status).send({
      code: isAppError.code,
      error: isAppError.error,
      message: isAppError.message,
      data: isAppError.data,
    })
  }

  if (error instanceof Error) {
    if (error?.statusCode === 429) {
      console.log('Rate Limit: ', req.headers.customer ?? '')
      console.log('User: ', req?.user?.sub ?? '')
      return reply.status(429).send({
        code: 'rate.limit_exceeded',
        error: error.message,
        message: error.message,
        data: [],
      })
    }
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    console.error(error)
    // Sentry.captureException(error)
  }

  return reply.status(500).send({
    code: 'internal.server_error',
    error: 'Internal server error.',
    message: 'Internal server error.',
    data: [],
  })
})

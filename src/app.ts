import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'

import { ZodError } from 'zod'
import { StatusCodes } from 'http-status-codes'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { gymRoutes } from './http/controllers/gym/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: { expiresIn: '10m' },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: external logging service
  }

  return reply
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: error.message })
})

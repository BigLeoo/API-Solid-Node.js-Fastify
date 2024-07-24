import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'

export async function refresh(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  // Verify refresh token on cookie
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // send cookie only over https
      sameSite: true, // alternative CSRF protection
      httpOnly: true, // cookie is not accessible in frontEnd
    })
    .status(StatusCodes.OK)
    .send({
      token,
    })
}

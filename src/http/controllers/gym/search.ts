import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export async function search(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const searchQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchQuerySchema.parse(request.query)

  const searchUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchUseCase.execute({
    query,
    page,
  })

  return reply.status(StatusCodes.OK).send({
    gyms,
  })
}

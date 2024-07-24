import { makeFetchNeabyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export async function nearby(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const nearbyGymsQuerySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = nearbyGymsQuerySchema.parse(
    request.query,
  )

  const fetchNearbyGymsUseCase = makeFetchNeabyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude,
    userLongitude,
  })

  return reply.status(StatusCodes.OK).send({
    gyms,
  })
}

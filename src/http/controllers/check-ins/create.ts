import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export async function create(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const CreateCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const CreateCheckInsBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = CreateCheckInsParamsSchema.parse(request.params)

  const { userLatitude, userLongitude } = CreateCheckInsBodySchema.parse(
    request.body,
  )

  const checkInsUseCase = makeCheckInUseCase()

  await checkInsUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude,
    userLongitude,
  })

  return reply.status(StatusCodes.CREATED).send()
}

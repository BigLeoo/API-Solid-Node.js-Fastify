import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export async function create(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    createBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  const { gym } = await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(StatusCodes.CREATED).send({
    gym,
  })
}

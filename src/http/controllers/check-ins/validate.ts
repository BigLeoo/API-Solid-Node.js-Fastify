import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export async function validate(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInsUseCase = makeValidateCheckInUseCase()

  await validateCheckInsUseCase.execute({
    checkInId,
  })

  return reply.status(StatusCodes.NO_CONTENT).send()
}

import { CheckInsUseCase } from '../checkin'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymRepository = new PrismaGymsRepository()
  const useCase = new CheckInsUseCase(checkInsRepository, gymRepository)

  return useCase
}

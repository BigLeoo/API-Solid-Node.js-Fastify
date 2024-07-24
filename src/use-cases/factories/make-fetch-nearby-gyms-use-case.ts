import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNeabyGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymRepository)

  return useCase
}

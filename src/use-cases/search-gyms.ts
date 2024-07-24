import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchGymCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}

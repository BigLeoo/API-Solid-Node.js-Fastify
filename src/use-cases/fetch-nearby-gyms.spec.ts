import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepositories } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepositories
let sut: FetchNearbyGymsUseCase

// Unit Test
describe('Fetch User Check-in History Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepositories()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -27.5866119,
      longitude: -48.5054809,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -27.9866119,
      longitude: -48.0054809,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.5866119,
      userLongitude: -48.5054809,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

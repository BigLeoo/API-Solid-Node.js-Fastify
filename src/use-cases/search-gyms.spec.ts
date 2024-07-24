import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepositories } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepositories
let sut: SearchGymUseCase

// Unit Test
describe('Fetch User Check-in History Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepositories()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await gymsRepository.create({
      title: 'Fabrica de monstro',
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Valhalla Gym',
      latitude: 2,
      longitude: 3,
    })

    const { gyms } = await sut.execute({ query: 'Fabrica de monstro', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Fabrica de monstro' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Valhalla Gym ${i}`,
        latitude: 2,
        longitude: 3,
      })
    }

    const { gyms } = await sut.execute({ query: 'Valhalla Gym', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Valhalla Gym 21' }),
      expect.objectContaining({ title: 'Valhalla Gym 22' }),
    ])
  })
})

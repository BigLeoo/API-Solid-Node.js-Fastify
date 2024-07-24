import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepositories } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepositories
let sut: CreateGymUseCase

// Unit Test
describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepositories()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Fabrica de Monstro',
      description: 'So os monstroes',
      phone: '1231231231',
      latitude: -27.5866119,
      longitude: -48.5054809,
    })

    // -27.5842413,-48.5787403

    expect(gym.id).toEqual(expect.any(String))
  })
})

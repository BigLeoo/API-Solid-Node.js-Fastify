import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { InMemoryGymsRepositories } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumbersOfCheckInsError } from './errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from './errors/max-disance-error'
import { CheckInsUseCase } from './checkin'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepositories
let sut: CheckInsUseCase

// Unit Test
describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepositories()
    sut = new CheckInsUseCase(checkInsRepository, gymsRepository)

    gymsRepository.create({
      id: 'gym-01',
      title: 'Gym 01',
      description: '',
      phone: '',
      latitude: -27.5842413,
      longitude: -48.5787403,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.5842413,
      userLongitude: -48.5787403,
    })

    // -27.5842413,-48.5787403

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.5842413,
      userLongitude: -48.5787403,
    })

    const secondCheckInTheSamaDay = sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.5842413,
      userLongitude: -48.5787403,
    })

    await expect(secondCheckInTheSamaDay).rejects.toBeInstanceOf(
      MaxNumbersOfCheckInsError,
    )
  })

  it('should be able to check in in differents days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.5842413,
      userLongitude: -48.5787403,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    const secondCheckInDifferentDay = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.5842413,
      userLongitude: -48.5787403,
    })

    expect(secondCheckInDifferentDay.checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.item.push({
      id: 'gym-02',
      title: 'Gym 02',
      description: '',
      phone: '',
      latitude: new Decimal(-28.5842413),
      longitude: new Decimal(-48.5787403),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -28.5842213,
        userLongitude: -48.5787403,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})

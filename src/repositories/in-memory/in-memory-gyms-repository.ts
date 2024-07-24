import { Gym, Prisma } from '@prisma/client'

import { FindManyNearbyParams, GymsRepository } from '../gym-repository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepositories implements GymsRepository {
  public item: Gym[] = []

  async findManyNearby(params: FindManyNearbyParams) {
    return this.item.filter((gyms) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: gyms.latitude.toNumber(),
          longitude: gyms.longitude.toNumber(),
        },
      )

      // distance <= 10km
      return distance <= 10
    })
  }

  async searchMany(query: string, page: number) {
    return this.item
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.item.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.item.find((gym) => gym.id === id)

    return gym || null
  }
}

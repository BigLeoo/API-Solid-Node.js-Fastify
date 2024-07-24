import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public item: CheckIn[] = []

  async save(checkIn: CheckIn) {
    const checkInIndex = this.item.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.item[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findById(id: string) {
    const checkIn = this.item.find((checkIn) => checkIn.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async countByUserId(userId: string) {
    return this.item.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findManyByUserId(userId: string, page: number) {
    return this.item
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.item.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    return checkInOnSameDate || null
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.item.push(checkIn)
    return checkIn
  }
}

import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-ins Metrics (e2e)', () => {
  beforeAll(async () => {
    // before all tests await server be ready
    await app.ready()
  })

  afterAll(async () => {
    // after all tests close the server
    await app.close()
  })

  it('should be able to get metrics from user', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'BigLeo Gym',
        latitude: -23.5489,
        longitude: -46.6388,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const metricsCheckInResponse = await request(app.server)
      .get(`/check-ins/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(metricsCheckInResponse.statusCode).toEqual(200)
    expect(metricsCheckInResponse.body.checkInsCount).toEqual(3)
  })
})

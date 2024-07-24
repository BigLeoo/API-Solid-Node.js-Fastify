import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-ins Create (e2e)', () => {
  beforeAll(async () => {
    // before all tests await server be ready
    await app.ready()
  })

  afterAll(async () => {
    // after all tests close the server
    await app.close()
  })

  it('should be able to create check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    // Create a gym to check-in, isolate the test
    const gym = await prisma.gym.create({
      data: {
        title: 'BigLeo Gym',
        latitude: -23.5489,
        longitude: -46.6388,
      },
    })

    const createCheckInResponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -23.5489,
        userLongitude: -46.6388,
      })

    expect(createCheckInResponse.statusCode).toEqual(201)
  })
})

import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Gym Create (e2e)', () => {
  beforeAll(async () => {
    // before all tests await server be ready
    await app.ready()
  })

  afterAll(async () => {
    // after all tests close the server
    await app.close()
  })

  it('should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const createGymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'BigLeo Gym',
        description: 'Only strongests Leo can tran here.',
        phone: '12345667',
        latitude: -23.5489,
        longitude: -46.6388,
      })

    expect(createGymResponse.statusCode).toEqual(201)
  })
})

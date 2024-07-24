import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Gym Nearby (e2e)', () => {
  beforeAll(async () => {
    // before all tests await server be ready
    await app.ready()
  })

  afterAll(async () => {
    // after all tests close the server
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'BigLeo Gym',
        description: 'Only strongests Leo can tran here.',
        phone: '12345667',
        latitude: -23.5489,
        longitude: -46.6388,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Monster Gym',
        description: 'Only strongests Monsters can train here.',
        phone: '12345667',
        latitude: -24.5489,
        longitude: -46.6388,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ userLatitude: -24.5489, userLongitude: -46.6388 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Monster Gym' }),
    ])
  })
})

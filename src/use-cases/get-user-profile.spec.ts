import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepositories } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

let userRepository: InMemoryUsersRepositories
let sut: GetUserProfileUseCase

// Unit Test
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepositories()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able get user profile', async () => {
    const createdUser = await userRepository.create({
      id: '1',
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.id).toEqual(createdUser.id)
    expect(user.name).toEqual(createdUser.name)
  })

  it('should not be able get user profile with wrong id', async () => {
    await userRepository.create({
      id: '1',
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: await hash('123456', 6),
    })

    const user = sut.execute({ userId: 'id-not-exist' })

    expect(user).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

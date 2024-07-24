import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepositories } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: InMemoryUsersRepositories
let sut: AuthenticateUseCase

// Unit Test
describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepositories()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    userRepository.create({
      id: '1',
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const response = sut.execute({
      email: 'wrong@email.com',
      password: '123456',
    })

    await expect(response).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    userRepository.create({
      id: '1',
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: await hash('123456', 6),
    })

    const response = sut.execute({
      email: 'john@email.com',
      password: '1234567',
    })

    await expect(response).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

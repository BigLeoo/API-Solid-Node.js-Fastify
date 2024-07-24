import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepositories } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let userRepository: InMemoryUsersRepositories
let sut: RegisterUseCase

// Unit Test
describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepositories()
    sut = new RegisterUseCase(userRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const password = '123456'

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john@email.com'

    // First registration
    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    const secondRegistrationWithSameEmail = sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(secondRegistrationWithSameEmail).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})

import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepositories implements UserRepository {
  public item: User[] = []

  async findByEmail(email: string) {
    const user = this.item.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.item.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.item.push(user)

    return user
  }
}

import { Prisma, User } from '@prisma/client'

// Contratos

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}

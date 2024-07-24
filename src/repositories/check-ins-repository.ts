import { CheckIn, Prisma } from '@prisma/client'

// Contratos
// ...CreateInput -> Relacionamentos gym e user
// ...UncheckedCreateInput -> Relacionamentos gymId e userId

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  save(checkIn: CheckIn): Promise<CheckIn>
}

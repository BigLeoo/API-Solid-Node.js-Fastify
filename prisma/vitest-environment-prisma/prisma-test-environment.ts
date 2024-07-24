import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'

import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDataBaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  transformMode: 'ssr',
  name: 'prisma',
  async setup() {
    const schema = randomUUID()

    const databaseURL = generateDataBaseURL(schema)

    // change databaseURL env to url with new schema, for each test environment
    process.env.DATABASE_URL = databaseURL

    // execute node scripts
    execSync('npx prisma migrate deploy')

    return {
      // commands to execute after all tests
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}

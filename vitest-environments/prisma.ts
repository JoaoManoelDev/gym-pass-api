import "dotenv"
import { execSync } from "node:child_process"
import { Environment } from "vitest"
import { randomUUID } from "crypto"

import { prisma } from "@/lib/prisma"

const generateDataBaseURL = (schema: string) => {
  const envDatabaseURL = process.env.DATABASE_URL

  if(!envDatabaseURL){
    throw new Error("Please provide a DATABASE_URL environment variable.")
  }

  const url = new URL(envDatabaseURL)

  url.searchParams.set("schema", schema)

  return url.toString()
}

export default<Environment>{
  name: "prisma",
  transformMode: "ssr",
  setup(_global, _options) {

    const schema = randomUUID()

    const databaseURL = generateDataBaseURL(schema)
    
    process.env.DATABASE_URL = databaseURL

    // Deploy because, if it were to migrate, the prisma would check for changes to generate a new migration.
    // In deployment, it will execute the existing migrations and create the tables.
    execSync("npx prisma migrate deploy")

    return{
      async teardown(){
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

        await prisma.$disconnect()
      }
    }
  },
}

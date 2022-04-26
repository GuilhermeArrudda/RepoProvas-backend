import pkg from "@prisma/client"
import dotenv from 'dotenv'
dotenv.config()

const { PrismaClient } = pkg

export const prisma = new PrismaClient()
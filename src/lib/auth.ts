import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export async function createUser(data: {
  name: string
  email: string
  password: string
  role?: "ADMIN" | "PHOTOGRAPHER" | "CLIENT"
}) {
  const hashedPassword = await hashPassword(data.password)
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "CLIENT",
    },
  })
}

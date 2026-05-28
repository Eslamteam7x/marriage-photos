import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/jwt"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        phone: true,
        isActive: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 })
  }
}

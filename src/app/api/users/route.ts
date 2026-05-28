import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        phone: true,
        isActive: true,
        createdAt: true,
        _count: { select: { albums: true } },
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json()
    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        phone: true,
        isActive: true,
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ message: "User ID required" }, { status: 400 })
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ message: "User deleted" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 })
  }
}

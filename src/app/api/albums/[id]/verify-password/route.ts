import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: slug } = await context.params
    const { password } = await req.json()
    const album = await prisma.album.findUnique({ where: { slug } })

    if (!album || !album.password) {
      return NextResponse.json({ message: "Album not found or no password" }, { status: 404 })
    }

    const isValid = album.password === password

    if (!isValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 })
    }

    const response = NextResponse.json({ message: "Access granted" })
    response.cookies.set(`album_access_${slug}`, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    const { prisma } = await import("@/lib/prisma")

    const page = await prisma.weddingPage.findFirst()
    if (!page || !page.password) {
      return NextResponse.json({ message: "No password required" }, { status: 400 })
    }

    if (password !== page.password) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 })
    }

    const response = NextResponse.json({ message: "Access granted" })
    response.cookies.set("wedding_access", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 })
  }
}

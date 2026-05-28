import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const image = await prisma.image.create({ data: body })
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to create image" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ message: "Image ID required" }, { status: 400 })

    await prisma.image.delete({ where: { id } })
    return NextResponse.json({ message: "Image deleted" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete image" }, { status: 500 })
  }
}

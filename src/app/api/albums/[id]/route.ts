import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const album = await prisma.album.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        videos: { orderBy: { sortOrder: "asc" } },
        tags: { include: { tag: true } },
      },
    })

    if (!album) {
      return NextResponse.json({ message: "Album not found" }, { status: 404 })
    }

    await prisma.album.update({
      where: { id: album.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json(album)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch album" }, { status: 500 })
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await req.json()
    const album = await prisma.album.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(album)
  } catch (error) {
    return NextResponse.json({ message: "Failed to update album" }, { status: 500 })
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    await prisma.album.delete({ where: { id } })
    return NextResponse.json({ message: "Album deleted" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete album" }, { status: 500 })
  }
}

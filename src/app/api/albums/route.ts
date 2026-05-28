import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")

    const where: Record<string, unknown> = { isPublic: true }
    if (featured === "true") where.isFeatured = true
    if (category) where.category = category

    const albums = await prisma.album.findMany({
      where,
      include: {
        _count: { select: { images: true, videos: true } },
        images: { take: 1, orderBy: { createdAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    })

    const formatted = albums.map((album) => ({
      ...album,
      coverImage: album.coverImage || album.images[0]?.url || null,
      password: album.password ? true : false,
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch albums" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, slug, description, clientName, eventDate, isPublic, isFeatured, category, password } = body

    const album = await prisma.album.create({
      data: {
        title,
        slug,
        description,
        clientName,
        eventDate: eventDate ? new Date(eventDate) : null,
        isPublic: isPublic ?? true,
        isFeatured: isFeatured ?? false,
        category,
        password,
      },
    })

    return NextResponse.json(album, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to create album" }, { status: 500 })
  }
}

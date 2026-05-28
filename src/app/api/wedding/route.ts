import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    let page = await prisma.weddingPage.findFirst({
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        videos: { orderBy: { sortOrder: "asc" } },
      },
    })

    if (!page) {
      page = await prisma.weddingPage.create({
        data: {
          slug: "our-wedding",
          brideName: "العروس",
          groomName: "العريس",
          welcomeMessage: "بكل الحب والسعادة، نتشرف بدعوتكم لمشاركتنا أجمل أيام حياتنا",
        },
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          videos: { orderBy: { sortOrder: "asc" } },
        },
      })
    }

    return NextResponse.json({
      brideName: page.brideName,
      groomName: page.groomName,
      eventDate: page.eventDate?.toISOString() || "",
      welcomeMessage: page.welcomeMessage,
      coverImage: page.coverImage || "",
      musicUrl: page.musicUrl || "",
      allowDownload: page.allowDownload,
      passwordRequired: page.isPrivate && !!page.password,
      images: page.images,
      videos: page.videos,
    })
  } catch (error) {
    return NextResponse.json({ message: "Failed to load wedding page" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { images, videos, ...data } = body

    let page = await prisma.weddingPage.findFirst()
    if (!page) {
      page = await prisma.weddingPage.create({
        data: { slug: "our-wedding" },
      })
    }

    const updated = await prisma.weddingPage.update({
      where: { id: page.id },
      data: {
        ...(data.brideName !== undefined && { brideName: data.brideName }),
        ...(data.groomName !== undefined && { groomName: data.groomName }),
        ...(data.eventDate !== undefined && { eventDate: data.eventDate ? new Date(data.eventDate) : null }),
        ...(data.welcomeMessage !== undefined && { welcomeMessage: data.welcomeMessage }),
        ...(data.coverImage !== undefined && { coverImage: data.coverImage }),
        ...(data.musicUrl !== undefined && { musicUrl: data.musicUrl }),
        ...(data.isPrivate !== undefined && { isPrivate: data.isPrivate }),
        ...(data.password !== undefined && { password: data.password }),
        ...(data.allowDownload !== undefined && { allowDownload: data.allowDownload }),
        ...(data.themeColor !== undefined && { themeColor: data.themeColor }),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ message: "Failed to update wedding page" }, { status: 500 })
  }
}

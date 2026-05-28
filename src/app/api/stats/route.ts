import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const [albums, images, videos, contacts] = await Promise.all([
      prisma.album.count(),
      prisma.image.count(),
      prisma.video.count(),
      prisma.contact.count(),
    ])

    const viewStats = await prisma.album.findMany({
      select: { views: true, downloadCount: true },
    })

    const totalViews = viewStats.reduce((sum, a) => sum + a.views, 0)
    const totalDownloads = viewStats.reduce((sum, a) => sum + a.downloadCount, 0)

    const recentAlbums = await prisma.album.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        views: true,
        downloadCount: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      totalAlbums: albums,
      totalImages: images,
      totalVideos: videos,
      totalViews,
      totalDownloads,
      totalContacts: contacts,
      recentAlbums,
    })
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch stats" }, { status: 500 })
  }
}

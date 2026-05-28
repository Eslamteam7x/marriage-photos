import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const files = formData.getAll("files") as File[]
    const albumId = "wedding"

    if (!files.length) {
      return NextResponse.json({ message: "Files are required" }, { status: 400 })
    }

    const uploaded = []

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const base64 = buffer.toString("base64")
      const dataUri = `data:${file.type};base64,${base64}`

      const { uploadImage } = await import("@/lib/cloudinary")
      const result = await uploadImage(dataUri, `wedding/${albumId}`)

      const { prisma } = await import("@/lib/prisma")
      let page = await prisma.weddingPage.findFirst()
      if (!page) {
        page = await prisma.weddingPage.create({ data: { slug: "our-wedding" } })
      }

      const isVideo = file.type.startsWith("video/")

      if (isVideo) {
        const video = await prisma.weddingVideo.create({
          data: {
            url: result.url,
            publicId: result.publicId,
            weddingId: page.id,
          },
        })
        uploaded.push({ ...video, type: "video" })
      } else {
        const image = await prisma.weddingImage.create({
          data: {
            url: result.url,
            publicId: result.publicId,
            width: result.width,
            height: result.height,
            size: result.size,
            weddingId: page.id,
          },
        })
        uploaded.push({ ...image, type: "image" })
      }
    }

    return NextResponse.json({ items: uploaded }, { status: 201 })
  } catch (error) {
    console.error("Wedding upload error:", error)
    return NextResponse.json({ message: "Upload failed" }, { status: 500 })
  }
}

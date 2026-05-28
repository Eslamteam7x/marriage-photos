import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const files = formData.getAll("files") as File[]
    const albumId = formData.get("albumId") as string

    if (!files.length || !albumId) {
      return NextResponse.json({ message: "Files and albumId are required" }, { status: 400 })
    }

    const uploaded = []

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const base64 = buffer.toString("base64")
      const dataUri = `data:${file.type};base64,${base64}`

      const { uploadImage } = await import("@/lib/cloudinary")
      const result = await uploadImage(dataUri, `wedding-studio/${albumId}`)

      const { prisma } = await import("@/lib/prisma")
      const image = await prisma.image.create({
        data: {
          url: result.url,
          publicId: result.publicId,
          width: result.width,
          height: result.height,
          format: result.format,
          size: result.size,
          albumId,
        },
      })

      uploaded.push(image)
    }

    return NextResponse.json({ images: uploaded }, { status: 201 })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ message: "Upload failed" }, { status: 500 })
  }
}

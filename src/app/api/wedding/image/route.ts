import { NextResponse } from "next/server"

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ message: "Image ID required" }, { status: 400 })

    const { prisma } = await import("@/lib/prisma")

    const image = await prisma.weddingImage.findUnique({ where: { id } })
    if (image?.publicId) {
      const { deleteImage } = await import("@/lib/cloudinary")
      await deleteImage(image.publicId)
    }

    await prisma.weddingImage.delete({ where: { id } })
    return NextResponse.json({ message: "Image deleted" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete image" }, { status: 500 })
  }
}

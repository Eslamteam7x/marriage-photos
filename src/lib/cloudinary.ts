import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: string, folder: string = "wedding-studio") {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "auto",
      quality: "auto",
      fetch_format: "auto",
    })
    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw new Error("Failed to upload image")
  }
}

export async function deleteImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error("Cloudinary delete error:", error)
  }
}

export async function getImageInfo(publicId: string) {
  try {
    return await cloudinary.api.resource(publicId)
  } catch {
    return null
  }
}

export { cloudinary }

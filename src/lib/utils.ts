import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from "slugify"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US").format(num)
}

export function generateSlug(title: string) {
  return slugify(title, { lower: true, strict: true })
}

export function generateShareUrl(slug: string) {
  if (typeof window === "undefined") return ""
  return `${window.location.origin}/albums/${slug}`
}

export function copyToClipboard(text: string) {
  if (typeof navigator === "undefined") return false
  navigator.clipboard.writeText(text)
  return true
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str
  return str.substring(0, length) + "..."
}

export function getImageUrl(url: string, width: number = 800) {
  if (url.includes("cloudinary")) {
    return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`)
  }
  return url
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

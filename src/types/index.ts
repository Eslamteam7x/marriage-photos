export type Role = "ADMIN" | "PHOTOGRAPHER" | "CLIENT"

export interface UserType {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: Role
  phone: string | null
  isActive: boolean
  createdAt: string
}

export interface AlbumType {
  id: string
  title: string
  slug: string
  description: string | null
  coverImage: string | null
  eventDate: string | null
  clientName: string | null
  password: string | null
  isPublic: boolean
  isFeatured: boolean
  category: string | null
  views: number
  downloadCount: number
  createdAt: string
  images: ImageType[]
  videos: VideoType[]
  _count?: { images: number; videos: number }
}

export interface ImageType {
  id: string
  url: string
  publicId: string | null
  blurHash: string | null
  width: number | null
  height: number | null
  format: string | null
  size: number | null
  alt: string | null
  caption: string | null
  isFeatured: boolean
  sortOrder: number
  createdAt: string
  albumId: string
}

export interface VideoType {
  id: string
  url: string
  publicId: string | null
  thumbnail: string | null
  width: number | null
  height: number | null
  duration: number | null
  size: number | null
  title: string | null
  isReel: boolean
  sortOrder: number
  createdAt: string
  albumId: string
}

export interface ContactType {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  isRead: boolean
  createdAt: string
}

export interface StatsType {
  totalAlbums: number
  totalImages: number
  totalVideos: number
  totalViews: number
  totalDownloads: number
  totalContacts: number
  recentViews: { date: string; count: number }[]
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  facebook: string
  instagram: string
  twitter: string
  youtube: string
  tiktok: string
  whatsapp: string
  email: string
  phone: string
  address: string
  githubToken: string
  githubRepo: string
  storageProvider: string
  cloudinaryCloudName: string
  cloudinaryApiKey: string
  cloudinaryApiSecret: string
  supabaseUrl: string
  supabaseKey: string
  domain: string
  googleAnalyticsId: string
  [key: string]: string
}

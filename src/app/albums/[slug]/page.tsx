"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAlbum } from "@/hooks/useAlbums"
import { PageLoader } from "@/components/ui/Spinner"
import { PasswordGate } from "@/components/albums/PasswordGate"
import { AlbumLightbox } from "@/components/albums/AlbumLightbox"
import { Button } from "@/components/ui/Button"
import { OptimizedImage } from "@/components/ui/OptimizedImage"
import { formatDate, formatNumber, generateShareUrl, copyToClipboard } from "@/lib/utils"
import { Eye, Download, Share2, Calendar, User, ImageIcon, Video, Lock } from "lucide-react"
import toast from "react-hot-toast"

export default function AlbumDetailPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = React.use(paramsPromise)
  const { album, isLoading } = useAlbum(params?.slug)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const hasAccess = document.cookie.includes(`album_access_${params?.slug}=true`)
    if (hasAccess || !album?.password) {
      setIsUnlocked(true)
    }
  }, [album, params.slug])

  if (isLoading) return <PageLoader />
  if (!album) return <div className="pt-20 text-center py-20">الألبوم غير موجود</div>

  if (album.password && !isUnlocked) {
    return <PasswordGate albumTitle={album.title} slug={params.slug} onSuccess={() => setIsUnlocked(true)} />
  }

  function handleShare() {
    const url = generateShareUrl(params.slug)
    copyToClipboard(url)
    toast.success("تم نسخ الرابط!")
  }

  return (
    <div className="pt-20">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden mb-8">
              <img
                src={album.coverImage || album.images[0]?.url || "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"}
                alt={album.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-2">
                  {album.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                  {album.clientName && (
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {album.clientName}
                    </span>
                  )}
                  {album.eventDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(album.eventDate)}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {formatNumber(album.views)} مشاهدة
                  </span>
                  <span className="flex items-center gap-1">
                    <ImageIcon className="h-4 w-4" />
                    {album.images.length} صورة
                  </span>
                  {album.videos.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      {album.videos.length} فيديو
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <Button onClick={handleShare} variant="outline">
                <Share2 className="h-4 w-4" />
                مشاركة
              </Button>
            </div>

            {album.description && (
              <p className="text-muted-foreground mb-8 max-w-3xl">{album.description}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {album.images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setLightboxIndex(index)}
                >
                  <OptimizedImage
                    src={image.url}
                    alt={image.alt || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <AlbumLightbox
          images={album.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}

"use client"

import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { OptimizedImage } from "@/components/ui/OptimizedImage"
import { Badge } from "@/components/ui/Badge"
import { ImageIcon, Video, Lock, Eye } from "lucide-react"
import type { AlbumType } from "@/types"
import { formatDate } from "@/lib/utils"

interface AlbumCardProps {
  album: AlbumType
}

export function AlbumCard({ album }: AlbumCardProps) {
  if (!album || !album.slug) return null

  const imageCount = album._count?.images || 0
  const videoCount = album._count?.videos || 0

  return (
    <Link href={`/albums/${album.slug}`}>
      <Card className="group">
        <div className="relative aspect-[4/3] overflow-hidden">
          <OptimizedImage
            src={album.coverImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"}
            alt={album.title || ""}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {album.password && (
            <div className="absolute top-3 right-3">
              <Badge variant="warning">
                <Lock className="h-3 w-3 ml-1" />
                خاص
              </Badge>
            </div>
          )}

          {album.isFeatured && (
            <div className="absolute top-3 left-3">
              <Badge variant="gold">مميز</Badge>
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
            <div className="flex items-center gap-1 text-white/80 text-xs">
              <ImageIcon className="h-3.5 w-3.5" />
              <span>{imageCount}</span>
            </div>
            {videoCount > 0 && (
              <div className="flex items-center gap-1 text-white/80 text-xs">
                <Video className="h-3.5 w-3.5" />
                <span>{videoCount}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-white/80 text-xs mr-auto">
              <Eye className="h-3.5 w-3.5" />
              <span>{album.views}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-playfair font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {album.title}
          </h3>
          {album.clientName && (
            <p className="text-sm text-muted-foreground mb-1">{album.clientName}</p>
          )}
          {album.eventDate && (
            <p className="text-xs text-muted-foreground">{formatDate(album.eventDate)}</p>
          )}
        </div>
      </Card>
    </Link>
  )
}

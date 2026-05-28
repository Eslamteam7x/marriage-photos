"use client"

import { motion } from "framer-motion"
import { AlbumCard } from "@/components/albums/AlbumCard"
import type { AlbumType } from "@/types"
import { useAlbums } from "@/hooks/useAlbums"
import { PageLoader } from "@/components/ui/Spinner"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function RecentAlbums() {
  const { albums, isLoading, isError } = useAlbums(true)
  const recentAlbums = Array.isArray(albums) ? albums.slice(0, 4) : []

  if (isLoading) return <PageLoader />
  if (isError) return null

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm tracking-widest uppercase">أحدث الألبومات</span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mt-3 mb-4">
            <span className="gold-text">ألبومات</span> مميزة
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            تصفح أحدث ألبومات الأفراح والمناسبات
          </p>
        </motion.div>

        {recentAlbums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentAlbums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AlbumCard album={album} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>لا توجد ألبومات حالياً</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/albums"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
          >
            عرض جميع الألبومات
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useAlbums } from "@/hooks/useAlbums"
import { AlbumCard } from "@/components/albums/AlbumCard"
import { PageLoader } from "@/components/ui/Spinner"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useState } from "react"

export default function AlbumsPage() {
  const { albums, isLoading } = useAlbums()
  const [search, setSearch] = useState("")

  const filtered = albums?.filter((album) =>
    album.title.toLowerCase().includes(search.toLowerCase()) ||
    album.clientName?.toLowerCase().includes(search.toLowerCase())
  ) || []

  return (
    <div className="pt-20">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm tracking-widest uppercase">الألبومات</span>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mt-3 mb-4">
              ألبومات <span className="gold-text">الأفراح</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              تصفح ألبومات الأفراح والمناسبات الخاصة
            </p>

            <div className="max-w-md mx-auto relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث عن ألبوم..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pr-12 pl-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </motion.div>

          {isLoading ? (
            <PageLoader />
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AlbumCard album={album} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">لا توجد ألبومات حالياً</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

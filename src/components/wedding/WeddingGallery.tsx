"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Download, Shield } from "lucide-react"

interface GalleryImage {
  id: string
  url: string
  caption?: string | null
  width?: number | null
  height?: number | null
}

interface WeddingGalleryProps {
  images: GalleryImage[]
  allowDownload?: boolean
}

export function WeddingGallery({ images, allowDownload = true }: WeddingGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const masonryCols = useMemo(() => {
    const cols: GalleryImage[][] = [[], [], []]
    images.forEach((img, i) => cols[i % 3].push(img))
    return cols
  }, [images])

  if (!images.length) return null

  return (
    <section className="py-20 md:py-28 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm tracking-[0.2em] uppercase font-light">معرض الصور</span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mt-3 mb-2">
            لحظاتنا <span className="text-gold">الجميلة</span>
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 9) * 0.05, duration: 0.5 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
              style={{
                gridRow: image.height && image.width
                  ? `span ${Math.ceil((image.height / image.width) * 2)}`
                  : "span 2",
              }}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={image.url}
                alt={image.caption || ""}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              {!allowDownload && (
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur px-2 py-1 rounded-full">
                  <Shield className="h-3.5 w-3.5 text-white/80" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
              <span className="text-white/60 text-sm">
                {selectedIndex + 1} / {images.length}
              </span>
              <div className="flex gap-2">
                {allowDownload && (
                  <a href={images[selectedIndex].url} download
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="h-5 w-5" />
                  </a>
                )}
                <button onClick={() => setSelectedIndex(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.img
              key={images[selectedIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={images[selectedIndex].url}
              alt=""
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
              onContextMenu={(e) => { if (!allowDownload) e.preventDefault() }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

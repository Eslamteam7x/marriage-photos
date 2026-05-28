"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

interface Video {
  id: string
  url: string
  thumbnail?: string | null
  title?: string | null
}

interface WeddingVideosProps {
  videos: Video[]
}

export function WeddingVideos({ videos }: WeddingVideosProps) {
  if (!videos.length) return null

  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-beige/30 to-white dark:from-secondary dark:to-charcoal">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm tracking-[0.2em] uppercase font-light">فيديوهات</span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mt-3 mb-2">
            لحظات <span className="text-gold">مصورة</span>
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group aspect-video rounded-2xl overflow-hidden bg-muted cursor-pointer"
              onClick={() => window.open(video.url, "_blank")}
            >
              <img
                src={video.thumbnail || video.url}
                alt={video.title || ""}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-gold transition-colors">
                  <Play className="h-7 w-7 text-white ml-0.5" />
                </div>
              </div>
              {video.title && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-sm font-medium">{video.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Heart, ChevronDown } from "lucide-react"

interface WeddingHeroProps {
  groomName: string
  brideName: string
  eventDate: string
  coverImage: string
}

export function WeddingHero({ groomName, brideName, eventDate, coverImage }: WeddingHeroProps) {
  const date = eventDate ? new Date(eventDate).toLocaleDateString("ar-EG", {
    year: "numeric", month: "long", day: "numeric",
  }) : ""

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={coverImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"}
          alt="Wedding"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <Heart className="h-8 w-8 text-gold mx-auto fill-gold/30" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gold tracking-[0.3em] text-sm md:text-base uppercase mb-6 font-light"
        >
          نحن مدعوون لحضور حفل زفاف
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-4 leading-tight"
        >
          {groomName || "العريس"} <span className="text-gold">&</span> {brideName || "العروس"}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-20 h-px bg-gold mx-auto my-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-white/80 text-lg md:text-xl font-light tracking-wide"
        >
          {date}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 text-gold animate-bounce" />
      </motion.div>
    </section>
  )
}

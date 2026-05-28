"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function WeddingFooter() {
  return (
    <footer className="py-12 px-4 bg-secondary text-center border-t border-white/5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Heart className="h-6 w-6 text-gold mx-auto mb-4 fill-gold/20" />
        <p className="text-white/60 text-sm font-light">
          شكراً لكل من شاركنا فرحتنا
        </p>
        <p className="text-white/40 text-xs mt-2">
          © {new Date().getFullYear()} - جميع الحقوق محفوظة
        </p>
      </motion.div>
    </footer>
  )
}

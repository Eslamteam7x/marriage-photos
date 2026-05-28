"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface WelcomeMessageProps {
  message: string
  groomName: string
  brideName: string
}

export function WelcomeMessage({ message, groomName, brideName }: WelcomeMessageProps) {
  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-beige/30 dark:from-charcoal dark:to-secondary">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="h-8 w-8 text-gold mx-auto mb-6 fill-gold/20" />
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
            {groomName || "العريس"} <span className="text-gold">&</span> {brideName || "العروس"}
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            {message || "بكل الحب والسعادة، نتشرف بدعوتكم لمشاركتنا أجمل أيام حياتنا"}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { OptimizedImage } from "@/components/ui/OptimizedImage"
import Link from "next/link"
import { ArrowRight, ImageIcon } from "lucide-react"

const featuredImages = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Wedding 1" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", alt: "Wedding 2" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", alt: "Wedding 3" },
  { src: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80", alt: "Wedding 4" },
  { src: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80", alt: "Wedding 5" },
  { src: "https://images.unsplash.com/photo-1464692252159-0dfd4a8b1e07?w=800&q=80", alt: "Wedding 6" },
]

export function GalleryGrid() {
  return (
    <section className="py-20 md:py-28 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm tracking-widest uppercase">معرض الأعمال</span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mt-3 mb-4">
            أحدث <span className="gold-text">جلساتنا</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            نفتخر بتقديم أفضل جلسات التصوير التي تجمع بين الإبداع والاحترافية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative group overflow-hidden rounded-xl cursor-pointer",
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              )}
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                width={800}
                height={index === 0 ? 600 : 400}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImageIcon className="h-10 w-10 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ArrowDown, Camera } from "lucide-react"
import Link from "next/link"

export function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-secondary" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Camera className="h-16 w-16 text-primary mx-auto mb-6" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 leading-tight"
        >
          نوثق <span className="gold-text">لحظاتكم</span> الجميلة
          <br />
          بلمسة فنية
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          نقدم أفضل خدمات التصوير الفوتوغرافي والفيديو للأفراح والمناسبات الخاصة
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/albums">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-10">
              استعرض الألبومات
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10">
              احجز جلسة
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-6 w-6 text-white/50 animate-bounce" />
      </motion.div>
    </section>
  )
}

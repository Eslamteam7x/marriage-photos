"use client"

import { motion } from "framer-motion"
import { Camera, Image, Users, Heart } from "lucide-react"

const stats = [
  { icon: Camera, value: "500+", label: "جلسة تصوير" },
  { icon: Image, value: "10K+", label: "صورة" },
  { icon: Users, value: "300+", label: "عميل سعيد" },
  { icon: Heart, value: "5+", label: "سنوات خبرة" },
]

export function StatsSection() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-playfair font-bold gold-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

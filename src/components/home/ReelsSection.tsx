"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

const reels = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80", title: "زفاف مريم وأحمد" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80", title: "زفاف نور وسامر" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80", title: "حفل تخرج" },
  { src: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&q=80", title: "جلسة خطوبة" },
]

export function ReelsSection() {
  return (
    <section className="py-20 md:py-28 px-4 hero-gradient">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm tracking-widest uppercase">Reels</span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mt-3 mb-4 text-white">
            فيديوهات <span className="gold-text">قصيرة</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            شاهد لحظات مميزة من جلسات التصوير
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reels.map((reel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={reel.src}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Play className="h-6 w-6 text-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-medium">{reel.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

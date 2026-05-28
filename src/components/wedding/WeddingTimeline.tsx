"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Heart } from "lucide-react"

interface TimelineEvent {
  time: string
  title: string
  description: string
  icon: "heart" | "map" | "calendar"
}

export function WeddingTimeline() {
  const events: TimelineEvent[] = [
    { time: "4:00 م", title: "استقبال الضيوف", description: "بدء استقبال الضيوف مع مشروبات الترحيب", icon: "heart" },
    { time: "5:00 م", title: "مراسم الزفاف", description: "مراسم عقد القران والزفاف", icon: "calendar" },
    { time: "6:30 م", title: "العشاء", description: "بوفيه مفتوح مع أشهى المأكولات", icon: "map" },
    { time: "8:00 م", title: "الرقص والفرح", description: "سهرة ورقص وموسيقى حية", icon: "heart" },
  ]

  const iconMap = { heart: Heart, map: MapPin, calendar: Calendar }

  return (
    <section className="py-20 md:py-28 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm tracking-[0.2em] uppercase font-light">جدول الفعاليات</span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mt-3 mb-2">
            برنامج <span className="text-gold">الحفل</span>
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </motion.div>

        <div className="relative">
          <div className="absolute right-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/30 to-transparent hidden md:block" />

          {events.map((event, index) => {
            const Icon = iconMap[event.icon]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`flex items-start gap-4 mb-8 md:mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:flex flex-1 justify-end">
                  {index % 2 === 0 && (
                    <div className="text-left">
                      <p className="text-gold font-playfair text-lg">{event.time}</p>
                    </div>
                  )}
                </div>

                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-card border-2 border-gold/30 flex items-center justify-center shadow-lg">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                </div>

                <div className="flex-1 glass rounded-2xl p-5">
                  <p className="text-gold font-playfair text-lg mb-1 md:hidden">{event.time}</p>
                  <h3 className="font-playfair font-bold text-lg mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

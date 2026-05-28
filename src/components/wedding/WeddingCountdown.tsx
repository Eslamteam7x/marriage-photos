"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface WeddingCountdownProps {
  eventDate: string
}

export function WeddingCountdown({ eventDate }: WeddingCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    if (!eventDate) return

    function update() {
      const now = new Date().getTime()
      const event = new Date(eventDate).getTime()
      const diff = event - now

      if (diff <= 0) {
        setIsPast(true)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [eventDate])

  if (!eventDate) return null

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-beige/30 dark:from-charcoal dark:to-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Heart className="h-8 w-8 text-gold mx-auto mb-4 fill-gold/20" />
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-8">
            {isPast ? "تمت الزفافة 🎉" : "العد التنازلي"}
          </h2>
        </motion.div>

        {!isPast && (
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
            {[
              { label: "يوم", value: timeLeft.days },
              { label: "ساعة", value: timeLeft.hours },
              { label: "دقيقة", value: timeLeft.minutes },
              { label: "ثانية", value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-4"
              >
                <div className="text-3xl md:text-4xl font-playfair font-bold text-gold">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

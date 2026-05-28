"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Lock, Heart } from "lucide-react"

interface WeddingPasswordGateProps {
  onSuccess: () => void
}

export function WeddingPasswordGate({ onSuccess }: WeddingPasswordGateProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/wedding/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        onSuccess()
      } else {
        setError("كلمة المرور غير صحيحة")
      }
    } catch {
      setError("حدث خطأ، حاول مرة أخرى")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-charcoal via-secondary to-charcoal">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-3xl p-10 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="h-12 w-12 text-gold mx-auto mb-4 fill-gold/20" />
            </motion.div>
            <h1 className="text-3xl font-playfair font-bold text-white mb-2">
              صفحة خاصة
            </h1>
            <p className="text-white/60 text-sm">
              هذه الصفحة محمية، يرجى إدخال كلمة المرور
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label=""
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              icon={<Lock className="h-4 w-4 text-gold" />}
              error={error}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
            <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-secondary" loading={loading}>
              {loading ? "جاري التحقق..." : "دخول"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Lock, ShieldAlert } from "lucide-react"

interface PasswordGateProps {
  albumTitle: string
  onSuccess: () => void
  slug: string
}

export function PasswordGate({ albumTitle, onSuccess, slug }: PasswordGateProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`/api/albums/${slug}/verify-password`, {
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
    <div className="min-h-screen flex items-center justify-center px-4 hero-gradient">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-8 border border-border shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-playfair font-bold gold-text mb-2">
              ألبوم خاص
            </h1>
            <p className="text-muted-foreground text-sm">
              هذا الألبوم محمي بكلمة مرور
              <br />
              <span className="font-medium text-foreground">{albumTitle}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="كلمة المرور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              icon={<Lock className="h-4 w-4" />}
              error={error}
            />
            <Button type="submit" className="w-full" loading={loading}>
              {loading ? "جاري التحقق..." : "دخول"}
            </Button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-4 text-red-500 text-sm justify-center"
            >
              <ShieldAlert className="h-4 w-4" />
              {error}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

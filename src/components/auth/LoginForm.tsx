"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { SocialButtons } from "./SocialButtons"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      setError("حدث خطأ، حاول مرة أخرى")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      <Input
        label="البريد الإلكتروني"
        name="email"
        type="email"
        placeholder="your@email.com"
        required
        icon={<Mail className="h-4 w-4" />}
      />

      <div className="relative">
        <Input
          label="كلمة المرور"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          required
          icon={<Lock className="h-4 w-4" />}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-[38px] text-muted-foreground hover:text-foreground"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <Button type="submit" className="w-full" size="lg" loading={loading}>
        {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </Button>

      <SocialButtons />
    </form>
  )
}

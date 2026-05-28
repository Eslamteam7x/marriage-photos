"use client"

import { motion } from "framer-motion"
import { LoginForm } from "@/components/auth/LoginForm"
import Link from "next/link"
import { Camera } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl p-8 border border-border shadow-xl">
          <div className="text-center mb-8">
            <Camera className="h-10 w-10 text-primary mx-auto mb-3" />
            <h1 className="text-2xl font-playfair font-bold gold-text">تسجيل الدخول</h1>
            <p className="text-muted-foreground text-sm mt-2">مرحباً بعودتك! أدخل بياناتك</p>
          </div>

          <LoginForm />

          <p className="text-center mt-6 text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              إنشاء حساب
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

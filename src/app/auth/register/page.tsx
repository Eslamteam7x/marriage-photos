"use client"

import { motion } from "framer-motion"
import { RegisterForm } from "@/components/auth/RegisterForm"
import Link from "next/link"
import { Camera } from "lucide-react"

export default function RegisterPage() {
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
            <h1 className="text-2xl font-playfair font-bold gold-text">إنشاء حساب</h1>
            <p className="text-muted-foreground text-sm mt-2">أنشئ حسابك للوصول إلى لوحة التحكم</p>
          </div>

          <RegisterForm />

          <p className="text-center mt-6 text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

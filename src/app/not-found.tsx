"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-8xl font-playfair font-bold gold-text mb-4">404</h1>
        <h2 className="text-2xl font-playfair font-bold mb-4">الصفحة غير موجودة</h2>
        <p className="text-muted-foreground mb-8">عذراً، الصفحة التي تبحث عنها غير متوفرة</p>
        <Link href="/">
          <Button>
            <Home className="h-4 w-4" />
            العودة للرئيسية
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

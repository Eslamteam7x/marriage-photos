"use client"

import { Button } from "@/components/ui/Button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-playfair font-bold mb-4">حدث خطأ</h1>
        <p className="text-muted-foreground mb-8">عذراً، حدث خطأ غير متوقع</p>
        <Button onClick={reset}>حاول مرة أخرى</Button>
      </div>
    </div>
  )
}

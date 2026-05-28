"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/Button"
import { Globe, GitBranch } from "lucide-react"

export function SocialButtons() {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">أو</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        <Globe className="h-5 w-5" />
        تسجيل الدخول بـ Google
      </Button>

      <Button variant="outline" className="w-full" onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
        <GitBranch className="h-5 w-5" />
        تسجيل الدخول بـ GitHub
      </Button>
    </div>
  )
}

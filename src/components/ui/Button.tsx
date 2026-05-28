"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-primary text-white hover:bg-primary-dark focus:ring-primary": variant === "primary",
            "bg-secondary text-white hover:opacity-90 focus:ring-secondary": variant === "secondary",
            "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary": variant === "outline",
            "text-foreground hover:bg-muted focus:ring-muted": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500": variant === "danger",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-8 py-3 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
export type { ButtonProps }

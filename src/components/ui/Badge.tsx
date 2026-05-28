"use client"

import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "danger" | "gold"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-muted text-muted-foreground": variant === "default",
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400": variant === "success",
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400": variant === "warning",
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400": variant === "danger",
          "bg-primary/20 text-primary": variant === "gold",
        },
        className
      )}
    >
      {children}
    </span>
  )
}

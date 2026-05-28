"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover = true, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "bg-card rounded-xl border border-border overflow-hidden",
        hover && "cursor-pointer card-hover",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-5 pb-0", className)}>{children}</div>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-5", className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-5 pt-0 border-t border-border mt-4", className)}>{children}</div>
}

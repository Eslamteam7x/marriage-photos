"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

export function Modal({ isOpen, onClose, title, children, className, size = "md" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative bg-card rounded-2xl shadow-2xl border border-border max-h-[90vh] overflow-y-auto",
              {
                "w-full max-w-sm": size === "sm",
                "w-full max-w-md": size === "md",
                "w-full max-w-2xl": size === "lg",
                "w-full max-w-4xl": size === "xl",
                "w-full max-w-full mx-4": size === "full",
              },
              className
            )}
          >
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold font-playfair">{title}</h2>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

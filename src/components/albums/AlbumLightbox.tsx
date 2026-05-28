"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react"
import type { ImageType } from "@/types"
import { OptimizedImage } from "@/components/ui/OptimizedImage"
import { Button } from "@/components/ui/Button"

interface AlbumLightboxProps {
  images: ImageType[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function AlbumLightbox({ images, currentIndex, onClose, onNavigate }: AlbumLightboxProps) {
  const currentImage = images[currentIndex]

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
  }, [currentIndex, images.length, onNavigate])

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
  }, [currentIndex, images.length, onNavigate])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="text-white/80 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors" title="تحميل">
              <Download className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors" title="مشاركة">
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); handlePrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); handleNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        <motion.div
          key={currentImage.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-[90vw] max-h-[85vh] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.url}
            alt={currentImage.alt || ""}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        </motion.div>

        {currentImage.caption && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-6 py-3 rounded-full">
            <p className="text-white text-sm">{currentImage.caption}</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

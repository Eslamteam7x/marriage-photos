"use client"

import { useState, useEffect } from "react"
import { WeddingHero } from "@/components/wedding/WeddingHero"
import { WelcomeMessage } from "@/components/wedding/WelcomeMessage"
import { WeddingGallery } from "@/components/wedding/WeddingGallery"
import { WeddingVideos } from "@/components/wedding/WeddingVideos"
import { WeddingCountdown } from "@/components/wedding/WeddingCountdown"
import { WeddingTimeline } from "@/components/wedding/WeddingTimeline"
import { WeddingFooter } from "@/components/wedding/WeddingFooter"
import { WeddingPasswordGate } from "@/components/wedding/WeddingPasswordGate"
import { PageLoader } from "@/components/ui/Spinner"

interface WeddingData {
  brideName: string
  groomName: string
  eventDate: string
  welcomeMessage: string
  coverImage: string
  musicUrl: string
  allowDownload: boolean
  images: { id: string; url: string; caption: string | null; width: number | null; height: number | null }[]
  videos: { id: string; url: string; thumbnail: string | null; title: string | null }[]
}

export default function OurWeddingPage() {
  const [data, setData] = useState<WeddingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [passwordRequired, setPasswordRequired] = useState(false)

  useEffect(() => {
    fetch("/api/wedding")
      .then((r) => r.json())
      .then((res) => {
        if (res.passwordRequired) {
          setPasswordRequired(true)
          const hasAccess = document.cookie.includes("wedding_access=true")
          if (hasAccess) setIsUnlocked(true)
        }
        setData(res)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoader />

  if (passwordRequired && !isUnlocked) {
    return <WeddingPasswordGate onSuccess={() => setIsUnlocked(true)} />
  }

  return (
    <div className="min-h-screen bg-background">
      <WeddingHero
        groomName={data?.groomName || "العريس"}
        brideName={data?.brideName || "العروس"}
        eventDate={data?.eventDate || ""}
        coverImage={data?.coverImage || ""}
      />
      <WeddingCountdown eventDate={data?.eventDate || ""} />
      <WelcomeMessage
        message={data?.welcomeMessage || ""}
        groomName={data?.groomName || "العريس"}
        brideName={data?.brideName || "العروس"}
      />
      <WeddingGallery images={data?.images || []} allowDownload={data?.allowDownload} />
      <WeddingVideos videos={data?.videos || []} />
      <WeddingTimeline />
      <WeddingFooter />

      {data?.musicUrl && (
        <audio autoPlay loop className="hidden">
          <source src={data.musicUrl} type="audio/mpeg" />
        </audio>
      )}
    </div>
  )
}

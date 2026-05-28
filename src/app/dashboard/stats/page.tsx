"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { PageLoader } from "@/components/ui/Spinner"
import toast from "react-hot-toast"

export default function StatsPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoader />

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-2">الإحصائيات</h1>
        <p className="text-muted-foreground mb-8">إحصائيات الموقع والمحتوى</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "الألبومات", value: stats.totalAlbums },
          { label: "الصور", value: stats.totalImages },
          { label: "الفيديوهات", value: stats.totalVideos },
          { label: "المشاهدات", value: stats.totalViews },
          { label: "التحميلات", value: stats.totalDownloads },
          { label: "الرسائل", value: stats.totalContacts },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold gold-text">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-playfair font-bold text-lg mb-4 gold-text">إحصائيات الألبومات</h3>
          {stats.recentAlbums?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentAlbums.map((album: any) => (
                <div key={album.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="font-medium">{album.title}</span>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{album.views} مشاهدة</span>
                    <span>{album.downloads} تحميل</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">لا توجد بيانات</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

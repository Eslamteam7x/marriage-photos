"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { PageLoader } from "@/components/ui/Spinner"
import { Images, Eye, Download, MessageSquare, Camera } from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoader />

  const statCards = [
    { label: "الألبومات", value: stats?.totalAlbums || 0, icon: Camera, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "الصور", value: stats?.totalImages || 0, icon: Images, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
    { label: "المشاهدات", value: stats?.totalViews || 0, icon: Eye, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { label: "التحميلات", value: stats?.totalDownloads || 0, icon: Download, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
  ]

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-2">لوحة التحكم</h1>
        <p className="text-muted-foreground mb-8">مرحباً بك في لوحة التحكم</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-playfair font-bold text-lg mb-4 gold-text">أحدث الألبومات</h3>
            {stats?.recentAlbums?.length > 0 ? (
              <div className="space-y-3">
                {stats.recentAlbums.map((album: any) => (
                  <div key={album.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="font-medium text-sm">{album.title}</span>
                    <span className="text-xs text-muted-foreground">{album.views} مشاهدة</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">لا توجد ألبومات</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-playfair font-bold text-lg mb-4 gold-text">إجراءات سريعة</h3>
            <div className="space-y-3">
              {[
                { label: "إنشاء ألبوم جديد", href: "/dashboard/albums/new" },
                { label: "رفع صور جديدة", href: "/dashboard/upload" },
                { label: "إدارة المستخدمين", href: "/dashboard/users" },
                { label: "الإعدادات", href: "/dashboard/settings" },
              ].map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="block px-4 py-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors text-sm font-medium"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

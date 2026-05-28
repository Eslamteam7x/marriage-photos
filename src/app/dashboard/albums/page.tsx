"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { PageLoader } from "@/components/ui/Spinner"
import { Plus, Pencil, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import type { AlbumType } from "@/types"
import toast from "react-hot-toast"

export default function DashboardAlbumsPage() {
  const [albums, setAlbums] = useState<AlbumType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchAlbums() }, [])

  async function fetchAlbums() {
    try {
      const res = await fetch("/api/albums")
      const data = await res.json()
      setAlbums(data)
    } catch {
      toast.error("فشل تحميل الألبومات")
    } finally {
      setLoading(false)
    }
  }

  async function deleteAlbum(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا الألبوم؟")) return
    try {
      await fetch(`/api/albums/${id}`, { method: "DELETE" })
      toast.success("تم حذف الألبوم")
      fetchAlbums()
    } catch {
      toast.error("فشل حذف الألبوم")
    }
  }

  if (loading) return <PageLoader />

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold">الألبومات</h1>
          <p className="text-muted-foreground">إدارة ألبومات الصور والفيديو</p>
        </div>
        <Link href="/dashboard/albums/new">
          <Button>
            <Plus className="h-4 w-4" />
            ألبوم جديد
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">العنوان</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">العميل</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">المشاهدات</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">الحالة</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {albums.map((album) => (
                  <tr key={album.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <p className="font-medium">{album.title}</p>
                      <p className="text-xs text-muted-foreground">{album.slug}</p>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{album.clientName || "—"}</td>
                    <td className="p-4 text-sm">{album.views}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        album.isPublic ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}>
                        {album.isPublic ? "عام" : "خاص"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 justify-start">
                        <Link href={`/albums/${album.slug}`}>
                          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        </Link>
                        <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteAlbum(album.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

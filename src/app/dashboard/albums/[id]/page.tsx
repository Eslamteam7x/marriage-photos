"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { PageLoader } from "@/components/ui/Spinner"
import { OptimizedImage } from "@/components/ui/OptimizedImage"
import { generateSlug } from "@/lib/utils"
import { Trash2, ImageIcon } from "lucide-react"
import toast from "react-hot-toast"

export default function EditAlbumPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/albums/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title,
          slug: data.slug,
          description: data.description || "",
          clientName: data.clientName || "",
          eventDate: data.eventDate?.split("T")[0] || "",
          isPublic: data.isPublic,
          isFeatured: data.isFeatured,
          category: data.category || "",
        })
      })
      .finally(() => setLoading(false))
  }, [params.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/albums/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        toast.success("تم تحديث الألبوم")
        router.push("/dashboard/albums")
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <PageLoader />

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-2">تعديل الألبوم</h1>
        <p className="text-muted-foreground mb-8">تعديل بيانات الألبوم</p>
      </motion.div>

      <Card className="max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="العنوان" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} required />
            <div>
              <label className="block text-sm font-medium mb-1.5">الوصف</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="اسم العميل" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
              <Input label="تاريخ الحدث" type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isPublic} onChange={(e) => setForm({ ...form, isPublic: e.target.checked })} />
                <span className="text-sm">عام</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                <span className="text-sm">مميز</span>
              </label>
            </div>
            <Button type="submit" className="w-full" loading={saving}>
              {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

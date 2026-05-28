"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { generateSlug } from "@/lib/utils"
import toast from "react-hot-toast"

export default function NewAlbumPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    clientName: "",
    eventDate: "",
    password: "",
    isPublic: true,
    isFeatured: false,
    category: "",
  })

  function handleTitleChange(title: string) {
    setForm({ ...form, title, slug: generateSlug(title) })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success("تم إنشاء الألبوم بنجاح!")
        router.push("/dashboard/albums")
      } else {
        toast.error("فشل إنشاء الألبوم")
      }
    } catch {
      toast.error("حدث خطأ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-2">ألبوم جديد</h1>
        <p className="text-muted-foreground mb-8">أنشئ ألبوم جديد للصور والفيديو</p>
      </motion.div>

      <Card className="max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="عنوان الألبوم"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="مثال: زفاف مريم وأحمد"
              required
            />

            <Input
              label="الرابط المخصص"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="marrym-ahmed-wedding"
              required
            />

            <div>
              <label className="block text-sm font-medium mb-1.5">الوصف</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="وصف الألبوم..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="اسم العميل" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} placeholder="اسم العميل" />
              <Input label="تاريخ الحدث" type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="كلمة المرور (اختياري)" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="اترك فارغاً إذا كان عاماً" />
              <Input label="التصنيف" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="مثال: زفاف، خطوبة" />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isPublic} onChange={(e) => setForm({ ...form, isPublic: e.target.checked })} className="rounded border-border" />
                <span className="text-sm">عام</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="rounded border-border" />
                <span className="text-sm">مميز</span>
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              {loading ? "جاري الإنشاء..." : "إنشاء الألبوم"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

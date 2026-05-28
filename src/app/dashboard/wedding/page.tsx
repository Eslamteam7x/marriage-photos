"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { PageLoader } from "@/components/ui/Spinner"
import { useDropzone } from "react-dropzone"
import {
  Upload, ImageIcon, Trash2, Music, Lock, Eye, EyeOff,
  Download, Heart, Palette
} from "lucide-react"
import toast from "react-hot-toast"

export default function WeddingAdminPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    groomName: "", brideName: "", eventDate: "", welcomeMessage: "",
    coverImage: "", musicUrl: "", password: "", isPrivate: true,
    allowDownload: true, themeColor: "#c9a96e",
  })

  useEffect(() => {
    fetch("/api/wedding")
      .then((r) => r.json())
      .then((res) => {
        setData(res)
        setForm({
          groomName: res.groomName || "",
          brideName: res.brideName || "",
          eventDate: res.eventDate?.split("T")[0] || "",
          welcomeMessage: res.welcomeMessage || "",
          coverImage: res.coverImage || "",
          musicUrl: res.musicUrl || "",
          password: "",
          isPrivate: res.passwordRequired ?? true,
          allowDownload: res.allowDownload ?? true,
          themeColor: res.themeColor || "#c9a96e",
        })
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/wedding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) toast.success("تم حفظ التغييرات")
      else toast.error("فشل الحفظ")
    } catch { toast.error("حدث خطأ") }
    finally { setSaving(false) }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  async function handleUpload() {
    if (!files.length) { toast.error("اختر صور أولاً"); return }
    setUploading(true)
    const fd = new FormData()
    files.forEach((f) => fd.append("files", f))
    try {
      const res = await fetch("/api/wedding/upload", { method: "POST", body: fd })
      if (res.ok) {
        toast.success("تم الرفع بنجاح!")
        setFiles([])
        window.location.reload()
      } else toast.error("فشل الرفع")
    } catch { toast.error("حدث خطأ") }
    finally { setUploading(false) }
  }

  async function deleteImage(id: string) {
    if (!confirm("حذف الصورة؟")) return
    try {
      await fetch(`/api/wedding/image?id=${id}`, { method: "DELETE" })
      toast.success("تم الحذف")
      window.location.reload()
    } catch { toast.error("فشل الحذف") }
  }

  if (loading) return <PageLoader />

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-6 w-6 text-gold" />
          <h1 className="text-2xl md:text-3xl font-playfair font-bold gold-text">صفحة الزفاف</h1>
        </div>
        <p className="text-muted-foreground mb-8">إدارة صفحة الزفاف الخاصة</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2"><Heart className="h-5 w-5 text-gold" /><h2 className="font-playfair font-bold gold-text">المعلومات</h2></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="اسم العريس" value={form.groomName} onChange={(e) => setForm({ ...form, groomName: e.target.value })} />
              <Input label="اسم العروس" value={form.brideName} onChange={(e) => setForm({ ...form, brideName: e.target.value })} />
            </div>
            <Input label="تاريخ الزفاف" type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />
            <div>
              <label className="block text-sm font-medium mb-1.5">رسالة الترحيب</label>
              <textarea value={form.welcomeMessage} onChange={(e) => setForm({ ...form, welcomeMessage: e.target.value })} rows={3}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>
            <Input label="رابط صورة الغلاف" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} placeholder="https://..." />
            <Input label="رابط موسيقى الخلفية" value={form.musicUrl} onChange={(e) => setForm({ ...form, musicUrl: e.target.value })} placeholder="https://..." icon={<Music className="h-4 w-4" />} />
            <Button onClick={handleSave} className="w-full" loading={saving}><Download className="h-4 w-4" />حفظ التغييرات</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2"><Lock className="h-5 w-5 text-gold" /><h2 className="font-playfair font-bold gold-text">الخصوصية والأمان</h2></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="كلمة المرور" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="اترك فارغاً لإلغاء الحماية" icon={<Lock className="h-4 w-4" />} />
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPrivate} onChange={(e) => setForm({ ...form, isPrivate: e.target.checked })} />
              <span className="text-sm">تفعيل الحماية بكلمة مرور</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.allowDownload} onChange={(e) => setForm({ ...form, allowDownload: e.target.checked })} />
              <span className="text-sm">السماح بتحميل الصور</span>
            </label>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2"><Upload className="h-5 w-5 text-gold" /><h2 className="font-playfair font-bold gold-text">رفع الصور والفيديو</h2></div>
        </CardHeader>
        <CardContent>
          <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-gold bg-gold/5" : "border-border hover:border-gold"}`}>
            <input {...getInputProps()} />
            <Upload className="h-10 w-10 text-gold mx-auto mb-3" />
            <p className="font-medium">اسحب وأفلت الصور والفيديو هنا</p>
            <p className="text-sm text-muted-foreground">أو انقر للاختيار</p>
          </div>
          {files.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm">{files.length} ملف</span>
              <Button onClick={handleUpload} loading={uploading} size="sm">رفع</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><ImageIcon className="h-5 w-5 text-gold" /><h2 className="font-playfair font-bold gold-text">معرض الصور ({data?.images?.length || 0})</h2></div>
        </CardHeader>
        <CardContent>
          {data?.images?.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {data.images.map((img: any) => (
                <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden bg-muted">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => deleteImage(img.id)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-3 w-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-8">لا توجد صور بعد</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

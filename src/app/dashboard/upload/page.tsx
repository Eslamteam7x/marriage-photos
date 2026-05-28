"use client"

import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useDropzone } from "react-dropzone"
import { Upload, ImageIcon, X, Check } from "lucide-react"
import type { AlbumType } from "@/types"
import toast from "react-hot-toast"

export default function UploadPage() {
  const [albums, setAlbums] = useState<AlbumType[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState<string[]>([])

  useEffect(() => {
    fetch("/api/albums")
      .then((r) => r.json())
      .then(setAlbums)
  }, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxSize: 10 * 1024 * 1024,
  })

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleUpload() {
    if (!selectedAlbum || !files.length) {
      toast.error("اختر ألبوم وأضف صور")
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append("albumId", selectedAlbum)
    files.forEach((file) => formData.append("files", file))

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        setUploaded(data.images.map((i: any) => i.id))
        toast.success(`تم رفع ${data.images.length} صورة بنجاح!`)
        setFiles([])
      } else {
        toast.error("فشل رفع الصور")
      }
    } catch {
      toast.error("حدث خطأ")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-2">رفع الملفات</h1>
        <p className="text-muted-foreground mb-8">قم برفع الصور والفيديوهات للألبومات</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium mb-1">
                  {isDragActive ? "اترك الملفات هنا..." : "اسحب وأفلت الصور هنا"}
                </p>
                <p className="text-sm text-muted-foreground">أو انقر للاختيار (JPG, PNG, WEBP - حتى 10MB)</p>
              </div>

              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">{files.length} ملفات مختارة</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {files.map((file, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-playfair font-bold text-lg mb-4 gold-text">إعدادات الرفع</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">الألبوم</label>
                  <select
                    value={selectedAlbum}
                    onChange={(e) => setSelectedAlbum(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">اختر ألبوم...</option>
                    {albums.map((album) => (
                      <option key={album.id} value={album.id}>{album.title}</option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={handleUpload}
                  className="w-full"
                  size="lg"
                  loading={uploading}
                  disabled={!selectedAlbum || !files.length}
                >
                  {uploading ? "جاري الرفع..." : "بدء الرفع"}
                  <Upload className="h-4 w-4" />
                </Button>

                {uploaded.length > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm p-3 rounded-lg flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    تم رفع {uploaded.length} صور
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

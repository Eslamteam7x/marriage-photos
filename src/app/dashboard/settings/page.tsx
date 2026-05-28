"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { PageLoader } from "@/components/ui/Spinner"
import { Globe, Palette, GitBranch, Shield, Save, Share2, Database } from "lucide-react"
import toast from "react-hot-toast"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings({
          siteName: data.siteName || "Wedding Studio",
          siteDescription: data.siteDescription || "تصوير الأفراح والمناسبات",
          logo: data.logo || "",
          favicon: data.favicon || "",
          primaryColor: data.primaryColor || "#c9a96e",
          secondaryColor: data.secondaryColor || "#1a1a2e",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          twitter: data.twitter || "",
          youtube: data.youtube || "",
          tiktok: data.tiktok || "",
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          githubToken: data.githubToken || "",
          githubRepo: data.githubRepo || "",
          storageProvider: data.storageProvider || "cloudinary",
          cloudinaryCloudName: data.cloudinaryCloudName || "",
          cloudinaryApiKey: data.cloudinaryApiKey || "",
          cloudinaryApiSecret: data.cloudinaryApiSecret || "",
          supabaseUrl: data.supabaseUrl || "",
          supabaseKey: data.supabaseKey || "",
          domain: data.domain || "",
          googleAnalyticsId: data.googleAnalyticsId || "",
        })
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        toast.success("تم حفظ الإعدادات بنجاح!")
      } else {
        toast.error("فشل حفظ الإعدادات")
      }
    } catch {
      toast.error("حدث خطأ")
    } finally {
      setSaving(false)
    }
  }

  function updateSetting(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  if (loading) return <PageLoader />

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold">الإعدادات</h1>
          <p className="text-muted-foreground">إعدادات الموقع والتكاملات</p>
        </div>
        <Button onClick={handleSave} loading={saving}>
          <Save className="h-4 w-4" />
          حفظ الإعدادات
        </Button>
      </motion.div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-playfair font-bold gold-text">الإعدادات العامة</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="اسم الموقع" value={settings.siteName} onChange={(e) => updateSetting("siteName", e.target.value)} />
              <Input label="الوصف" value={settings.siteDescription} onChange={(e) => updateSetting("siteDescription", e.target.value)} />
              <Input label="الدومين" value={settings.domain} onChange={(e) => updateSetting("domain", e.target.value)} placeholder="https://example.com" />
              <Input label="Google Analytics ID" value={settings.googleAnalyticsId} onChange={(e) => updateSetting("googleAnalyticsId", e.target.value)} placeholder="G-XXXXXXXXXX" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-playfair font-bold gold-text">الثيم والألوان</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="اللون الأساسي" value={settings.primaryColor} onChange={(e) => updateSetting("primaryColor", e.target.value)} placeholder="#c9a96e" />
              <Input label="اللون الثانوي" value={settings.secondaryColor} onChange={(e) => updateSetting("secondaryColor", e.target.value)} placeholder="#1a1a2e" />
              <Input label="رابط الشعار" value={settings.logo} onChange={(e) => updateSetting("logo", e.target.value)} />
              <Input label="رابط الأيقونة" value={settings.favicon} onChange={(e) => updateSetting("favicon", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Share2 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-playfair font-bold gold-text">التواصل والسوشيال ميديا</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="البريد الإلكتروني" value={settings.email} onChange={(e) => updateSetting("email", e.target.value)} type="email" />
              <Input label="رقم الهاتف" value={settings.phone} onChange={(e) => updateSetting("phone", e.target.value)} type="tel" />
              <Input label="العنوان" value={settings.address} onChange={(e) => updateSetting("address", e.target.value)} />
              <Input label="WhatsApp" value={settings.whatsapp} onChange={(e) => updateSetting("whatsapp", e.target.value)} />
              <Input label="Facebook" value={settings.facebook} onChange={(e) => updateSetting("facebook", e.target.value)} />
              <Input label="Instagram" value={settings.instagram} onChange={(e) => updateSetting("instagram", e.target.value)} />
              <Input label="Twitter" value={settings.twitter} onChange={(e) => updateSetting("twitter", e.target.value)} />
              <Input label="YouTube" value={settings.youtube} onChange={(e) => updateSetting("youtube", e.target.value)} />
              <Input label="TikTok" value={settings.tiktok} onChange={(e) => updateSetting("tiktok", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <GitBranch className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-playfair font-bold gold-text">GitHub Integration</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="GitHub Personal Access Token" value={settings.githubToken} onChange={(e) => updateSetting("githubToken", e.target.value)} type="password" placeholder="ghp_xxxxxxxxxxxx" />
              <Input label="GitHub Repository" value={settings.githubRepo} onChange={(e) => updateSetting("githubRepo", e.target.value)} placeholder="username/repo" />
            </div>
            {settings.githubToken && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                تم إعداد GitHub Token
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-playfair font-bold gold-text">التخزين السحابي</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">مزود التخزين</label>
                <select
                  value={settings.storageProvider}
                  onChange={(e) => updateSetting("storageProvider", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="cloudinary">Cloudinary</option>
                  <option value="supabase">Supabase Storage</option>
                </select>
              </div>

              {settings.storageProvider === "cloudinary" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input label="Cloud Name" value={settings.cloudinaryCloudName} onChange={(e) => updateSetting("cloudinaryCloudName", e.target.value)} />
                  <Input label="API Key" value={settings.cloudinaryApiKey} onChange={(e) => updateSetting("cloudinaryApiKey", e.target.value)} />
                  <Input label="API Secret" value={settings.cloudinaryApiSecret} onChange={(e) => updateSetting("cloudinaryApiSecret", e.target.value)} type="password" />
                </div>
              )}

              {settings.storageProvider === "supabase" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Supabase URL" value={settings.supabaseUrl} onChange={(e) => updateSetting("supabaseUrl", e.target.value)} />
                  <Input label="Supabase Key" value={settings.supabaseKey} onChange={(e) => updateSetting("supabaseKey", e.target.value)} type="password" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

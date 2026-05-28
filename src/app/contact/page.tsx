"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react"
import toast from "react-hot-toast"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً")
        ;(e.target as HTMLFormElement).reset()
      } else {
        toast.error("حدث خطأ، حاول مرة أخرى")
      }
    } catch {
      toast.error("حدث خطأ، حاول مرة أخرى")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm tracking-widest uppercase">تواصل معنا</span>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mt-3 mb-4">
              <span className="gold-text">اتصل</span> بنا
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              يسعدنا تواصلك معنا، نحن هنا للإجابة على استفساراتكم
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input label="الاسم" name="name" placeholder="اسمك الكامل" required icon={<User className="h-4 w-4" />} />
                <Input label="البريد الإلكتروني" name="email" type="email" placeholder="your@email.com" required icon={<Mail className="h-4 w-4" />} />
                <Input label="رقم الهاتف" name="phone" type="tel" placeholder="+20 100 000 0000" icon={<Phone className="h-4 w-4" />} />
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">الرسالة</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-playfair font-bold text-lg mb-4 gold-text">معلومات التواصل</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, text: "+20 100 000 0000", sub: "اتصل بنا" },
                    { icon: Mail, text: "info@weddingstudio.com", sub: "راسلنا" },
                    { icon: MapPin, text: "القاهرة، مصر", sub: "زورونا" },
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.sub}</p>
                          <p className="font-medium">{item.text}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-playfair font-bold text-lg mb-4 gold-text">ساعات العمل</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>السبت - الخميس</span><span>9:00 ص - 9:00 م</span></div>
                  <div className="flex justify-between"><span>الجمعة</span><span>مغلق</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

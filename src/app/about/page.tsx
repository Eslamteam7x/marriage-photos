import { Camera, Award, Heart, Sparkles } from "lucide-react"
import { OptimizedImage } from "@/components/ui/OptimizedImage"

export const metadata = {
  title: "عنا",
  description: "تعرف على Wedding Studio وفريق التصوير المحترف",
}

const features = [
  { icon: Camera, title: "تصوير احترافي", description: "نستخدم أحدث التقنيات والمعدات لضمان أفضل جودة للصور" },
  { icon: Award, title: "خبرة 5+ سنوات", description: "فريق محترف بخبرة واسعة في تصوير الأفراح والمناسبات" },
  { icon: Heart, title: "شغف وإبداع", description: "نضع قلبنا في كل صورة لنقدم لكم أفضل الذكريات" },
  { icon: Sparkles, title: "لمسة فنية", description: "نقدم صوراً تجمع بين الفن والاحترافية" },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium text-sm tracking-widest uppercase">عنا</span>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mt-3 mb-6">
                قصة <span className="gold-text">Wedding Studio</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                نحن فريق متخصص من المصورين المحترفين، نؤمن بأن كل لحظة في يوم زفافكم تستحق 
                أن تخلد بأجمل صورة. منذ أكثر من 5 سنوات ونحن نوثق أجمل لحظات الأفراح 
                والمناسبات في مصر، بلمسة فنية تجمع بين الأصالة والحداثة.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                نستخدم أحدث التقنيات والمعدات لنقدم لكم صوراً وفيديوهات عالية الجودة، 
                مع الاهتمام بأدق التفاصيل لنضمن لكم تجربة لا تنسى.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                  alt="Wedding Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border">
                <div className="text-4xl font-playfair font-bold gold-text">5+</div>
                <div className="text-sm text-muted-foreground">سنوات خبرة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              لماذا <span className="gold-text">نحن؟</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-card rounded-xl p-6 border border-border text-center card-hover">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-playfair font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

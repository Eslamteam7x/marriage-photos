# 🎬 Wedding Studio - منصة تصوير الأفراح والمناسبات

موقع احترافي كامل لعرض صور وفيديوهات سيشنات الأفراح والمناسبات مع لوحة تحكم متكاملة.

## ✨ المميزات

### 🌐 الموقع العام
- 🏠 صفحة رئيسية مع بانر متحرك ومعرض صور Masonry
- 📸 نظام ألبومات متكامل مع روابط مخصصة لكل عميل
- 🔒 حماية الألبومات بكلمة مرور
- 🎥 قسم فيديوهات قصيرة Reel Style
- 📖 صفحة About للمصور
- 📞 صفحة تواصل مع نموذج إرسال

### 👑 لوحة التحكم (Admin Dashboard)
- 📊 إحصائيات المشاهدات والتحميلات
- 🖼️ رفع الصور بالسحب والإفلات Drag & Drop
- 📁 إنشاء وإدارة الألبومات
- 👥 إدارة المستخدمين والصلاحيات
- ⚙️ إعدادات متكاملة

### 🔐 نظام Authentication
- تسجيل دخول وإنشاء حساب
- JWT Authentication
- حماية الصفحات الخاصة
- دعم Google و GitHub OAuth (قابل للتوسيع)

### 🛠️ التكاملات
- ☁️ Cloudinary أو Supabase Storage
- 🔗 GitHub Integration مع إعداد Token
- 📱 PWA جاهز
- 🌙 Dark/Light Mode

## 🚀 التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| Next.js 15 | الإطار الرئيسي |
| TypeScript | لغة البرمجة |
| Tailwind CSS 4 | التصميم والتنسيق |
| Framer Motion | الحركات والأنيميشن |
| Prisma 6 | ORM لإدارة قاعدة البيانات |
| PostgreSQL | قاعدة البيانات |
| JWT | المصادقة والتخويل |
| React Dropzone | رفع الملفات بالسحب |
| SWR | جلب البيانات |
| next-themes | الوضع المظلم/الفاتح |

## 📁 هيكل المشروع

```
wedding-studio/
├── prisma/
│   └── schema.prisma          # نموذج قاعدة البيانات
├── public/
│   ├── icons/                  # أيقونات الموقع
│   ├── manifest.json           # ملف PWA
│   └── sw.js                   # Service Worker
├── src/
│   ├── app/
│   │   ├── layout.tsx          # التخطيط الرئيسي
│   │   ├── page.tsx            # الصفحة الرئيسية
│   │   ├── globals.css         # الأنماط العامة
│   │   ├── not-found.tsx       # صفحة 404
│   │   ├── middleware.ts       # حماية المسارات
│   │   ├── about/              # صفحة عنا
│   │   ├── contact/            # صفحة التواصل
│   │   ├── albums/             # صفحة الألبومات
│   │   │   └── [slug]/         # صفحة ألبوم محدد
│   │   ├── auth/               # صفحات المصادقة
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/          # لوحة التحكم
│   │   │   ├── albums/         # إدارة الألبومات
│   │   │   ├── upload/         # رفع الملفات
│   │   │   ├── users/          # إدارة المستخدمين
│   │   │   ├── settings/       # الإعدادات
│   │   │   └── stats/          # الإحصائيات
│   │   └── api/                # API Routes
│   │       ├── auth/           # APIs المصادقة
│   │       ├── albums/         # APIs الألبومات
│   │       ├── images/         # APIs الصور
│   │       ├── upload/         # API الرفع
│   │       ├── users/          # APIs المستخدمين
│   │       ├── contacts/       # APIs التواصل
│   │       ├── stats/          # API الإحصائيات
│   │       └── settings/       # API الإعدادات
│   ├── components/
│   │   ├── ui/                 # مكونات واجهة عامة
│   │   ├── layout/             # مكونات التخطيط
│   │   ├── home/               # مكونات الصفحة الرئيسية
│   │   ├── albums/             # مكونات الألبومات
│   │   ├── dashboard/          # مكونات لوحة التحكم
│   │   └── auth/               # مكونات المصادقة
│   ├── hooks/                  # Custom Hooks
│   ├── lib/                    # المكتبات المساعدة
│   ├── providers/              # مزودات السياق
│   └── types/                  # أنواع TypeScript
└── .env.example                # مثال المتغيرات البيئية
```

## 🔧 التثبيت والتشغيل

### المتطلبات الأساسية
- Node.js 18+
- PostgreSQL
- npm أو yarn

### 1. clone المشروع
```bash
git clone https://github.com/yourusername/wedding-studio.git
cd wedding-studio
```

### 2. تثبيت الاعتماديات
```bash
npm install
```

### 3. إعداد المتغيرات البيئية
```bash
cp .env.example .env
```
قم بتعديل ملف `.env` وأضف القيم الصحيحة:
- `DATABASE_URL` - رابط قاعدة البيانات PostgreSQL
- `JWT_SECRET` - مفتاح JWT سري
- `CLOUDINARY_*` - بيانات Cloudinary (للتخزين السحابي)

### 4. إعداد قاعدة البيانات
```bash
npx prisma migrate dev --name init
```

### 5. تشغيل المشروع
```bash
npm run dev
```

المشروع سيعمل على: `http://localhost:3000`

### 6. بناء المشروع للإنتاج
```bash
npm run build
npm start
```

## ☁️ ربط المشروع بـ GitHub

### الطريقة الأولى: عبر Git مباشر
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/wedding-studio.git
git push -u origin main
```

### الطريقة الثانية: عبر لوحة الإعدادات (GitHub Token)
1. اذهب إلى `Dashboard > Settings`
2. أضف GitHub Personal Access Token
3. أضف اسم المستودع (username/repo)

## 🗄️ إعداد Cloudinary للتخزين

1. أنشئ حساب مجاني على [Cloudinary](https://cloudinary.com)
2. اذهب إلى Dashboard وانسخ:
   - Cloud Name
   - API Key
   - API Secret
3. أضفهم في ملف `.env` أو عبر لوحة الإعدادات

## 🔐 إعداد Google OAuth (اختياري)

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com)
2. أنشئ مشروع جديد
3. اذهب إلى APIs & Services > Credentials
4. أنشئ OAuth 2.0 Client ID
5. أضف `http://localhost:3000/api/auth/callback/google` إلى Authorized redirect URIs
6. أضف `GOOGLE_CLIENT_ID` و `GOOGLE_CLIENT_SECRET` إلى `.env`

## 📱 PWA

الموقع يدعم Progressive Web App:
- يمكن تثبيته كتطبيق على سطح المكتب والجوال
- يدعم العمل دون اتصال جزئياً
- أيقونات وشاشة ترحيب مخصصة

## 🎨 التخصيص

### الألوان
عدل متغيرات CSS في `src/app/globals.css`:
```css
--color-primary: #c9a96e;    /* اللون الذهبي */
--color-secondary: #1a1a2e;  /* اللون الغامق */
```

### الثيم
ادعم الوضع المظلم والفاتح تلقائياً عبر `next-themes`.

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات:
1. Fork المشروع
2. أنشئ فرع جديد (`git checkout -b feature/amazing`)
3. commit تغييراتك (`git commit -m 'Add amazing feature'`)
4. push إلى الفرع (`git push origin feature/amazing`)
5. افتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE).

## 📞 الدعم

للاستفسارات والدعم، يرجى التواصل عبر:
- البريد الإلكتروني: info@weddingstudio.com
- أو عبر صفحة [اتصل بنا](https://weddingstudio.com/contact)

---

صنع بـ ❤️ في مصر

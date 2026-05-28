import type { Metadata } from "next"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { ToasterProvider } from "@/providers/ToasterProvider"
import { AuthProvider } from "@/providers/AuthProvider"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Wedding Studio | تصوير الأفراح والمناسبات",
    template: "%s | Wedding Studio",
  },
  description: "نقدم أفضل خدمات التصوير الفوتوغرافي والفيديو للأفراح والمناسبات الخاصة. نوثق لحظاتكم الجميلة بلمسة فنية احترافية.",
  keywords: ["تصوير أفراح", "فوتوغرافي", "تصوير مناسبات", "زفاف", "خطوبة", "wedding photography"],
  authors: [{ name: "Wedding Studio" }],
  creator: "Wedding Studio",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "Wedding Studio",
    title: "Wedding Studio | تصوير الأفراح والمناسبات",
    description: "نقدم أفضل خدمات التصوير الفوتوغرافي والفيديو للأفراح والمناسبات الخاصة.",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <ToasterProvider />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

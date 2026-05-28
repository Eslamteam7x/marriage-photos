"use client"

import Link from "next/link"
import { Camera, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera className="h-6 w-6 text-primary" />
              <span className="text-xl font-playfair font-bold gold-text">Wedding Studio</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              نقدم أفضل خدمات التصوير الفوتوغرافي والفيديو للأفراح والمناسبات الخاصة. نوثق لحظاتكم الجميلة بلمسة فنية احترافية.
            </p>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 gold-text">روابط سريعة</h3>
            <ul className="space-y-2">
              {[
                { href: "/albums", label: "الألبومات" },
                { href: "/about", label: "عنا" },
                { href: "/contact", label: "اتصل بنا" },
                { href: "/auth/login", label: "دخول العملاء" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 gold-text">تواصل معنا</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>هاتف: +20 100 000 0000</li>
              <li>بريد: info@weddingstudio.com</li>
              <li>العنوان: القاهرة، مصر</li>
            </ul>
            <div className="flex gap-3 mt-4">
              {["facebook", "instagram", "youtube", "tiktok"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="text-xs capitalize">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Wedding Studio. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            صنع بـ <Heart className="h-4 w-4 text-primary" /> في مصر
          </p>
        </div>
      </div>
    </footer>
  )
}

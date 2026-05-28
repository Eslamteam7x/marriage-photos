"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Images,
  Upload,
  Users,
  Settings,
  BarChart3,
  LogOut,
  Camera,
  Heart,
} from "lucide-react"

const sidebarLinks = [
  { href: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/dashboard/wedding", label: "صفحة الزفاف", icon: Heart },
  { href: "/dashboard/albums", label: "الألبومات", icon: Images },
  { href: "/dashboard/upload", label: "رفع الملفات", icon: Upload },
  { href: "/dashboard/users", label: "المستخدمين", icon: Users },
  { href: "/dashboard/stats", label: "الإحصائيات", icon: BarChart3 },
  { href: "/dashboard/settings", label: "الإعدادات", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-card border-l border-border min-h-screen">
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Camera className="h-6 w-6 text-primary" />
          <span className="text-lg font-playfair font-bold gold-text">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          <Camera className="h-5 w-5" />
          عرض الموقع
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors">
          <LogOut className="h-5 w-5" />
          تسجيل خروج
        </button>
      </div>
    </aside>
  )
}

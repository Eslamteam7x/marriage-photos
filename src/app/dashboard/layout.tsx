"use client"

import { Sidebar } from "@/components/layout/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen pt-16">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        {children}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { PageLoader } from "@/components/ui/Spinner"
import { Trash2, Shield, ShieldOff } from "lucide-react"
import toast from "react-hot-toast"

interface UserData {
  id: string
  name: string | null
  email: string | null
  role: string
  isActive: boolean
  createdAt: string
  _count: { albums: number }
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users")
      setUsers(await res.json())
    } catch {
      toast.error("فشل تحميل المستخدمين")
    } finally {
      setLoading(false)
    }
  }

  async function toggleUserStatus(user: UserData) {
    try {
      await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, isActive: !user.isActive }),
      })
      toast.success("تم تحديث حالة المستخدم")
      fetchUsers()
    } catch {
      toast.error("فشل تحديث المستخدم")
    }
  }

  async function deleteUser(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return
    try {
      await fetch(`/api/users?id=${id}`, { method: "DELETE" })
      toast.success("تم حذف المستخدم")
      fetchUsers()
    } catch {
      toast.error("فشل حذف المستخدم")
    }
  }

  if (loading) return <PageLoader />

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-2">المستخدمين</h1>
        <p className="text-muted-foreground mb-8">إدارة المستخدمين والصلاحيات</p>
      </motion.div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">الاسم</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">البريد</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">الدور</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">الألبومات</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">الحالة</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{user.name || "—"}</td>
                    <td className="p-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <Badge variant={user.role === "ADMIN" ? "gold" : "default"}>
                        {user.role === "ADMIN" ? "مدير" : user.role === "PHOTOGRAPHER" ? "مصور" : "عميل"}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">{user._count.albums}</td>
                    <td className="p-4">
                      <Badge variant={user.isActive ? "success" : "danger"}>
                        {user.isActive ? "نشط" : "موقوف"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 justify-start">
                        <Button variant="ghost" size="sm" onClick={() => toggleUserStatus(user)}>
                          {user.isActive ? <ShieldOff className="h-4 w-4 text-yellow-500" /> : <Shield className="h-4 w-4 text-green-500" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteUser(user.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

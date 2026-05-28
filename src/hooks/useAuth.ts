"use client"

import { useState, useEffect } from "react"
import type { UserType } from "@/types"

export function useAuth() {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    try {
      const res = await fetch("/api/auth/me")
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function login(email: string, password: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error("Invalid credentials")
    const data = await res.json()
    setUser(data.user)
    return data
  }

  async function register(name: string, email: string, password: string) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
    if (!res.ok) throw new Error("Registration failed")
    const data = await res.json()
    setUser(data.user)
    return data
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
  }

  return { user, loading, login, register, logout, refetch: fetchUser }
}

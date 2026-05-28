"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import type { UserType } from "@/types"

export function useAuth() {
  const { data: session, status } = useSession()

  const user: UserType | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name || null,
        email: session.user.email || null,
        image: session.user.image || null,
        role: (session.user.role as UserType["role"]) || "CLIENT",
        phone: null,
        isActive: true,
        createdAt: "",
      }
    : null

  async function login(email: string, password: string) {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (result?.error) throw new Error("Invalid credentials")
    return result
  }

  async function register(name: string, email: string, password: string) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
    if (!res.ok) throw new Error("Registration failed")
    return res.json()
  }

  async function logout() {
    await signOut({ callbackUrl: "/" })
  }

  return {
    user,
    loading: status === "loading",
    login,
    register,
    logout,
  }
}

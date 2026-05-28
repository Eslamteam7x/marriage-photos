import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const settings = await prisma.setting.findMany()
    const settingsMap: Record<string, string> = {}
    for (const s of settings) {
      settingsMap[s.key] = s.value
    }
    return NextResponse.json(settingsMap)
  } catch (error) {
    return NextResponse.json({}, { status: 200 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()

    for (const [key, value] of Object.entries(body)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    }

    return NextResponse.json({ message: "Settings updated" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to update settings" }, { status: 500 })
  }
}

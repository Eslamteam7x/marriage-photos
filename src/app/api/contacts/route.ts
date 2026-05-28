import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch contacts" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Name, email and message are required" }, { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: { name, email, phone, message },
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, isRead } = await req.json()
    const contact = await prisma.contact.update({
      where: { id },
      data: { isRead },
    })
    return NextResponse.json(contact)
  } catch (error) {
    return NextResponse.json({ message: "Failed to update contact" }, { status: 500 })
  }
}

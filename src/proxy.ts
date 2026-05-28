import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedPaths = ["/dashboard", "/dashboard/:path*"]

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const isProtected = protectedPaths.some((path) => {
    const pattern = path.replace(":path*", ".*")
    return req.nextUrl.pathname.match(new RegExp(`^${pattern}$`))
  })

  if (isProtected && !token) {
    const loginUrl = new URL("/auth/login", req.url)
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

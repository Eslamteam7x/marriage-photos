import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Wedding | لحظاتنا الجميلة",
  description: "صفحة زفافنا الخاصة - Our Special Wedding Page",
  robots: { index: false, follow: false },
}

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

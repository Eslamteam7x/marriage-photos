import { HeroBanner } from "@/components/home/HeroBanner"
import { GalleryGrid } from "@/components/home/GalleryGrid"
import { RecentAlbums } from "@/components/home/RecentAlbums"
import { ReelsSection } from "@/components/home/ReelsSection"
import { StatsSection } from "@/components/home/StatsSection"

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <StatsSection />
      <GalleryGrid />
      <RecentAlbums />
      <ReelsSection />
    </>
  )
}

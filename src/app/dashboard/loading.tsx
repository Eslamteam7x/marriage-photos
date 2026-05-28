import { PageLoader } from "@/components/ui/Spinner"

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <PageLoader />
    </div>
  )
}

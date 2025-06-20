import { PageLoading } from "@/components/ui/loading-spinner"
import { Header } from "@/components/landing/header"

export default function AuthLoading() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <PageLoading message="Yükleniyor..." />
      </div>
    </>
  )
} 
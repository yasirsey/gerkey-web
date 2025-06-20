import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { setRequestLocale } from 'next-intl/server'

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>
}

export default async function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ForgotPasswordForm />
      </main>
      <Footer />
    </div>
  )
} 
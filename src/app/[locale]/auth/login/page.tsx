import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { setRequestLocale } from 'next-intl/server'

interface LoginPageProps {
  params: Promise<{ locale: string }>
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
} 
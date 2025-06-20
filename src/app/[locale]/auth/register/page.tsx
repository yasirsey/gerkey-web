import { RegisterForm } from "@/components/auth/register-form"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { setRequestLocale } from 'next-intl/server'

interface RegisterPageProps {
  params: Promise<{ locale: string }>
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  )
} 
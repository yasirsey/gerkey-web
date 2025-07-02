"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"
import { CheckCircle, Users, Settings, TrendingUp } from "lucide-react"

const steps = [
  {
    id: 1,
    icon: Users,
    titleKey: "step1Title",
    descriptionKey: "step1Description",
  },
  {
    id: 2,
    icon: Settings,
    titleKey: "step2Title", 
    descriptionKey: "step2Description",
  },
  {
    id: 3,
    icon: TrendingUp,
    titleKey: "step3Title",
    descriptionKey: "step3Description",
  },
]

export function OnboardingPage() {
  const t = useTranslations('Onboarding')
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  // Auth kontrolü - middleware'in yanında ekstra güvenlik
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])

  // Loading durumunda boş ekran göster
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Auth olmamış kullanıcı için boş döndür (zaten yönlendirilecek)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950 dark:via-gray-900 dark:to-emerald-950">
        <div className="container mx-auto px-4 py-12">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <CheckCircle className="w-5 h-5 text-primary mr-2" />
              <span className="text-primary font-medium">{t('welcomeBadge')}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Onboarding Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <Card key={step.id} className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{t(step.titleKey)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {t(step.descriptionKey)}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Button size="lg" className="px-8 py-3 text-lg">
              {t('getStarted')}
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('helpText')}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 
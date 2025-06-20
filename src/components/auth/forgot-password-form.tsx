"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Link } from "@/i18n/navigation"

interface ForgotPasswordFormData {
  email: string
}

interface ForgotPasswordFormErrors {
  email?: string
  general?: string
}

export function ForgotPasswordForm() {
  const t = useTranslations("Auth.forgotPassword")
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ""
  })
  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: ForgotPasswordFormErrors = {}

    if (!formData.email) {
      newErrors.email = t("emailRequired")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("emailInvalid")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // TODO: Implement actual forgot password logic
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      console.log("Forgot password attempt:", formData)
      setIsEmailSent(true)
    } catch (error) {
      setErrors({ general: t("sendError") })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof ForgotPasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof ForgotPasswordFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isEmailSent) {
    return (
      <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950 dark:via-gray-900 dark:to-emerald-950 py-16">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
                <CardDescription className="text-base">{t("emailSent")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-sm text-green-700 dark:text-green-300">
                      {t("checkEmailText")}
                    </div>
                    <div className="font-semibold text-green-900 dark:text-green-100 mt-1">
                      {formData.email}
                    </div>
                  </div>
                  
                  <Link href="/auth/login">
                    <Button className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t("backToLogin")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950 dark:via-gray-900 dark:to-emerald-950 py-16">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Branding & Info */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-medium">🔐 {t("brandingText")}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                {t("mainTitle")}
                <br />
                <span className="text-primary">{t("mainTitleHighlight")}</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("description")}
              </p>
            </div>
            
            {/* Security Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400">🛡️</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{t("securityFeature1")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400">⚡</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{t("securityFeature2")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400">🔒</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{t("securityFeature3")}</span>
              </div>
            </div>

            {/* Help Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 dark:text-blue-400">💡</span>
                  <span className="font-medium text-blue-900 dark:text-blue-100">{t("helpTitle")}</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {t("helpDescription")}
                </p>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  📧 {t("supportEmail")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-primary font-medium">🔐 {t("brandingText")}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {t("mainTitle")} <span className="text-primary">{t("mainTitleHighlight")}</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t("description")}
              </p>
            </div>
            
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 text-center pb-8">
                <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
                <CardDescription className="text-base">{t("subtitle")}</CardDescription>
              </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t("email")}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="sm" className="border-primary-foreground" />
                  <span>{t("sendLink")}</span>
                </div>
              ) : (
                t("sendLink")
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t("backToLogin")}
              </Link>
            </div>
          </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
  )
} 
"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Award, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950 dark:via-gray-900 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
            {t('badge')}
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            {t('title').split(' ').slice(0, 2).join(' ')}
            <br />
            <span className="text-primary">{t('title').split(' ').slice(2, 4).join(' ')}</span>
            <br />
            {t('title').split(' ').slice(4).join(' ')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth/register">
              <Button size="lg" className="px-8 py-3 text-lg">
                {t('applyNow')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg" onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              {t('getInfo')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">{t('successRate')}</div>
            </div>

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">1500+</div>
              <div className="text-gray-600 dark:text-gray-400">{t('happyCustomers')}</div>
            </div>

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">{t('support')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
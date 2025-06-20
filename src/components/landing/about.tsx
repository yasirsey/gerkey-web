"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Globe, Award } from "lucide-react";

export function About() {
  const t = useTranslations('About');

  const features = [
    {
      icon: CheckCircle,
      title: t('reliableProcess'),
      description: t('reliableProcessDesc')
    },
    {
      icon: Users,
      title: t('expertTeam'),
      description: t('expertTeamDesc')
    },
    {
      icon: Globe,
      title: t('germanyFocused'),
      description: t('germanyFocusedDesc')
    },
    {
      icon: Award,
      title: t('provenSuccess'),
      description: t('provenSuccessDesc')
    }
  ];

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {t('mission')}
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('missionDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

export function Services() {
  const t = useTranslations('Services');

  const services = [
    {
      title: t('educationPackage'),
      description: t('educationPackageDesc'),
      price: "€100",
      period: "/ay",
      popular: true,
      features: [
        t('cvPreparation'),
        t('motivationLetter'),
        t('diplomaEquivalency'),
        t('professionalCertificate'),
        t('officialCommunication'),
        t('visaApplication'),
        t('documentTranslation')
      ]
    },
    {
      title: t('documentPackage'),
      description: t('documentPackageDesc'),
      price: "€50",
      period: "/ay",
      popular: false,
      features: [
        t('cvPreparation'),
        t('motivationLetter')
      ]
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 mt-2">
            {t('description')}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className={`relative dark:bg-gray-700 ${service.popular ? 'border-primary shadow-lg' : ''}`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {t('mostPopular')}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold dark:text-gray-100">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">{service.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">{service.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">{service.period}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500">KDV Dahil • Aylık Ödeme</p>
              </CardHeader>

              <CardContent className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-6">
                <div className="w-full space-y-3">
                  <Button 
                    className={`w-full ${service.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    size="lg"
                  >
                    {t('selectPackage')}
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                    {t('cancelAnytime')}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('careerTitle')}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {t('careerSubtitle')}
          </p>
          <p className="text-gray-500 dark:text-gray-500 mb-8">
            {t('careerDesc')}
          </p>
        </div>
      </div>
    </section>
  );
} 
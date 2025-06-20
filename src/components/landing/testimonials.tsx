"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const t = useTranslations('Testimonials');

  const testimonials = [
    {
      name: t('testimonials.ahmet.name'),
      role: t('testimonials.ahmet.role'),
      content: t('testimonials.ahmet.content'),
      avatar: "/avatars/ahmet.jpg",
      initials: "AY"
    },
    {
      name: t('testimonials.zeynep.name'),
      role: t('testimonials.zeynep.role'),
      content: t('testimonials.zeynep.content'),
      avatar: "/avatars/zeynep.jpg",
      initials: "ZK"
    }
  ];

  const stats = [
    {
      value: "98%",
      label: t('successRateLabel'),
      description: t('successRateDesc')
    },
    {
      value: "1,500+",
      label: t('completedProjectsLabel'),
      description: t('completedProjectsDesc')
    },
    {
      value: "95%",
      label: t('customerSatisfactionLabel'),
      description: t('customerSatisfactionDesc')
    }
  ];

  return (
    <section id="success-stories" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('title')}
          </h2>
          <h3 className="text-2xl font-semibold text-primary mb-4">
            {t('subtitle')}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative p-6 shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-green-200 dark:text-green-800" />
              
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-white">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</div>
                    <div className="text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {stat.label}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
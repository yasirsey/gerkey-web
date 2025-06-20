"use client";

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const t = useTranslations('FAQ');

  const faqs = [
    {
      question: t('questions.q1'),
      answer: t('questions.a1')
    },
    {
      question: t('questions.q2'),
      answer: t('questions.a2')
    },
    {
      question: t('questions.q3'),
      answer: t('questions.a3')
    },
    {
      question: t('questions.q4'),
      answer: t('questions.a4')
    },
    {
      question: t('questions.q5'),
      answer: t('questions.a5')
    },
    {
      question: t('questions.q6'),
      answer: t('questions.a6')
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('title')}
          </h2>
          <h3 className="text-2xl font-semibold text-primary mb-4">
            {t('subtitle')}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('description')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('moreQuestions')}
          </p>
          <a 
            href="#contact" 
            className="text-primary hover:text-primary/80 font-semibold underline"
          >
            {t('contactUs')}
          </a>
        </div>
      </div>
    </section>
  );
} 
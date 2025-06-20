"use client";

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Navigation');

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-primary mb-2">GerKey</h3>
            <p className="text-gray-400">
              {t('copyright')}
            </p>
          </div>

          {/* Powered by */}
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              {t('poweredBy')}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>{t('tagline')}</p>
            </div>
            <div className="flex space-x-6">
              <a href="#about" className="hover:text-white transition-colors">
                {nav('about')}
              </a>
              <a href="#services" className="hover:text-white transition-colors">
                {nav('services')}
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                {nav('contact')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
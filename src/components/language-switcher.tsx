'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { routing } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { ChevronDown, Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLanguageChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  const getLanguageInfo = (locale: string) => {
    switch (locale) {
      case 'tr':
        return { flag: '🇹🇷', name: 'Türkçe', code: 'TR' };
      case 'en':
        return { flag: '🇺🇸', name: 'English', code: 'EN' };
      case 'de':
        return { flag: '🇩🇪', name: 'Deutsch', code: 'DE' };
      default:
        return { flag: '🌐', name: 'Unknown', code: locale.toUpperCase() };
    }
  };

  const currentLang = getLanguageInfo(currentLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <span>{currentLang.flag}</span>
          <span className="hidden sm:inline">{currentLang.code}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {routing.locales.map((locale) => {
          const langInfo = getLanguageInfo(locale);
          return (
            <DropdownMenuItem
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              className="gap-2 cursor-pointer"
            >
              <span>{langInfo.flag}</span>
              <span>{langInfo.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
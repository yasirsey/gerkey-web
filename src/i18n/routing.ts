import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Desteklenen tüm dillerin listesi
  locales: ['tr', 'en', 'de'],

  // Hiçbir dil eşleşmediğinde kullanılacak varsayılan dil
  defaultLocale: 'tr'
}); 
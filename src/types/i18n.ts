import type { routing } from '@/i18n/routing';

export type Locale = (typeof routing.locales)[number];

export interface Messages {
  HomePage: {
    title: string;
    about: string;
    welcome: string;
  };
  AboutPage: {
    title: string;
    description: string;
  };
  Navigation: {
    home: string;
    about: string;
    contact: string;
  };
  Common: {
    loading: string;
    error: string;
    save: string;
    cancel: string;
  };
} 
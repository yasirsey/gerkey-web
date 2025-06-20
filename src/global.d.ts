import type { Messages } from './types/i18n';

declare global {
  // next-intl için tip güvenliği
  interface IntlMessages extends Messages {}
}

export {}; 
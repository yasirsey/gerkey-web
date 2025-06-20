import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Aşağıdakiler dışında tüm pathname'leri eşleştir:
  // - `/api`, `/trpc`, `/_next` veya `/_vercel` ile başlayanlar
  // - Nokta içerenler (örn. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}; 
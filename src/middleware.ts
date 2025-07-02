import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Protected routes - giriş yapmış kullanıcılar için
const protectedRoutes = ['/onboarding'];

// Auth routes - giriş yapmamış kullanıcılar için
const authRoutes = ['/auth/login', '/auth/register'];

function isAuthenticated(request: NextRequest): boolean {
  const accessToken = request.cookies.get('accessToken')?.value || 
                     request.headers.get('authorization')?.replace('Bearer ', '');
  
  // Basit token varlık kontrolü - gerçek uygulamada token geçerliliği de kontrol edilmeli
  return !!accessToken;
}

function isValidLocale(locale: string): locale is typeof routing.locales[number] {
  return routing.locales.includes(locale as typeof routing.locales[number]);
}

function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/');
  const possibleLocale = segments[1];
  return isValidLocale(possibleLocale) ? possibleLocale : routing.defaultLocale;
}

function isRootPath(pathname: string, locale: string): boolean {
  return pathname === `/${locale}` || pathname === `/${locale}/`;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPath(pathname);
  const isAuth = isAuthenticated(request);
  
  // Locale'siz path'i al (i18n routing için)
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  
  // Auth kontrolleri
  if (isAuth) {
    // Giriş yapmış kullanıcılar auth sayfalarına veya ana sayfaya gidemez
    if (authRoutes.includes(pathWithoutLocale) || isRootPath(pathname, locale)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/onboarding`;
      return NextResponse.redirect(url);
    }
  } else {
    // Giriş yapmamış kullanıcılar korumalı sayfalara gidemez
    if (protectedRoutes.includes(pathWithoutLocale)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/auth/login`;
      return NextResponse.redirect(url);
    }
  }

  // next-intl middleware'ini çalıştır
  return createMiddleware(routing)(request);
}

export const config = {
  // Aşağıdakiler dışında tüm pathname'leri eşleştir:
  // - `/api`, `/trpc`, `/_next` veya `/_vercel` ile başlayanlar
  // - Nokta içerenler (örn. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}; 
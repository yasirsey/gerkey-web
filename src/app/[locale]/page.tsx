import { setRequestLocale } from 'next-intl/server';
import { LandingPage } from '@/components/landing/landing-page';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  // Static rendering'i etkinleştir
  const {locale} = await params;
  setRequestLocale(locale);

  return <LandingPage />;
}

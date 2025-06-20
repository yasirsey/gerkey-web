import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';

export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('AboutPage');
  const nav = await getTranslations('Navigation');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Dil değiştirici - sağ üst köşe */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t('description')}
        </p>
        <div className="space-y-4">
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              {nav('home')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 
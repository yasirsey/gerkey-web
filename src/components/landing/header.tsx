"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "@/i18n/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Navigation');

  const navigation = [
    { name: t('about'), href: "#about" },
    { name: t('services'), href: "#services" },
    { name: t('successStories'), href: "#success-stories" },
    { name: t('faq'), href: "#faq" },
    { name: t('contact'), href: "#contact" },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity">GerKey</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                {t('login')}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">
                {t('register')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 text-base font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Link href="/auth/login" className="block">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        {t('login')}
                      </Button>
                    </Link>
                    <Link href="/auth/register" className="block">
                      <Button className="w-full" onClick={() => setIsOpen(false)}>
                        {t('register')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
} 
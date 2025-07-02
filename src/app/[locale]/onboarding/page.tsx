import { Metadata } from 'next';
import { OnboardingPage } from '@/components/onboarding/onboarding-page';

export const metadata: Metadata = {
  title: 'Hoş Geldiniz - Gerkey',
  description: 'Gerkey\'e hoş geldiniz! Hemen başlayalım.',
};

export default function Onboarding() {
  return <OnboardingPage />;
} 
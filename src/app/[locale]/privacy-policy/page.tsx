import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PrivacyPolicyClient from './PrivacyPolicyClient';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/privacy-policy`,
      languages: {
        en: '/en/privacy-policy',
        ar: '/ar/privacy-policy',
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `/${locale}/privacy-policy`,
      siteName: 'Shifa AlHind',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}

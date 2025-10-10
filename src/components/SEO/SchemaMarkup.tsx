/**
 * Schema Markup Component
 * Renders JSON-LD structured data for SEO
 */

import { generateSchemaScript } from '@/lib/seo-helpers';

interface SchemaMarkupProps {
  schema: object | object[];
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={generateSchemaScript(schema)} />
  );
}

/**
 * Organization Schema Component
 * Add to main layout or homepage
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': 'https://shifaalhind.com/#organization',
    name: 'Shifa AlHind Medical Tourism',
    alternateName: 'شفاء الهند',
    url: 'https://shifaalhind.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://shifaalhind.com/logo.png',
      width: 512,
      height: 512,
    },
    description:
      'Premium medical tourism facilitator connecting GCC patients with JCI-accredited hospitals in Bangalore, India.',
    telephone: '+91-98765-43210',
    email: 'contact@shifaalhind.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'MG Road, Ashok Nagar',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560001',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Kuwait' },
      { '@type': 'Country', name: 'Oman' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Country', name: 'Bahrain' },
    ],
    sameAs: [
      'https://www.facebook.com/shifaalhind',
      'https://www.instagram.com/shifaalhind',
      'https://www.linkedin.com/company/shifaalhind',
      'https://twitter.com/shifaalhind',
    ],
  };

  return <SchemaMarkup schema={schema} />;
}

/**
 * WebSite Schema Component
 * Add to main layout for site-wide search
 */
export function WebSiteSchema({ locale = 'en' }: { locale?: 'en' | 'ar' }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://shifaalhind.com/#website',
    url: 'https://shifaalhind.com',
    name: 'Shifa AlHind Medical Tourism',
    description:
      'Medical tourism platform connecting GCC patients with world-class hospitals in India',
    publisher: {
      '@id': 'https://shifaalhind.com/#organization',
    },
    inLanguage: locale === 'ar' ? 'ar' : 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://shifaalhind.com/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <SchemaMarkup schema={schema} />;
}

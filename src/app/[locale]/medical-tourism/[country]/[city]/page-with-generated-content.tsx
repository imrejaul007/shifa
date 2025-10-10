/**
 * City Landing Page - Using Generated Content
 * This version uses the generated unique content from content-service
 *
 * To use this version:
 * 1. Backup the existing page.tsx
 * 2. Rename this file to page.tsx
 * 3. The page will automatically use the generated content
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCity, getAllCities, getTreatmentsByCity } from '@/lib/content-service';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    locale: string;
    country: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const cities = getAllCities();

  // Generate all city pages statically (only 20 pages)
  return cities.map((city) => {
    const urlParts = city.url.split('/');
    return {
      locale: urlParts[3],
      country: urlParts[5],
      city: urlParts[6],
    };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, country, city } = await params;

  const cityPage = getCity({ locale, country, city });

  if (!cityPage) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: cityPage.title,
    description: cityPage.meta_desc,
    openGraph: {
      title: cityPage.title,
      description: cityPage.meta_desc,
      url: cityPage.url,
      siteName: 'Shifa AlHind',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    alternates: {
      canonical: cityPage.url,
      languages: {
        en: cityPage.url.replace(`/${locale}/`, '/en/'),
        ar: cityPage.url.replace(`/${locale}/`, '/ar/'),
      },
    },
  };
}

export default async function CityPageWithContent({ params }: PageProps) {
  const { locale, country, city } = await params;

  const cityPage = getCity({ locale, country, city });

  if (!cityPage || !cityPage.full_content) {
    notFound();
  }

  const treatments = getTreatmentsByCity(city, locale).slice(0, 8);

  // Parse JSON-LD if available
  const jsonLd = cityPage.json_ld ? JSON.parse(cityPage.json_ld) : null;

  return (
    <>
      {/* JSON-LD Schema */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <nav className="bg-gray-50 py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4">
            <ol className="flex flex-wrap items-center space-x-2 text-sm">
              <li>
                <a href={`/${locale}`} className="text-primary-600 hover:text-primary-700">
                  {locale === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
              </li>
              <li className="before:content-['/'] before:mx-2">
                <a
                  href={`/${locale}/medical-tourism`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {locale === 'ar' ? 'السياحة العلاجية' : 'Medical Tourism'}
                </a>
              </li>
              <li className="before:content-['/'] before:mx-2 text-gray-700">{cityPage.h1}</li>
            </ol>
          </div>
        </nav>

        {/* Main Content */}
        <article className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{cityPage.h1}</h1>
            <p className="text-xl text-gray-600">{cityPage.meta_desc}</p>
          </header>

          {/* Generated Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
                    {children}
                  </ol>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full divide-y divide-gray-200 border">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-primary-600 text-white">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
                ),
                th: ({ children }) => (
                  <th className="px-6 py-3 text-left text-sm font-semibold">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="px-6 py-4 text-sm text-gray-900">{children}</td>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary-500 pl-4 italic my-4 text-gray-600 bg-gray-50 py-2">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary-600 hover:text-primary-700 underline"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {cityPage.full_content}
            </ReactMarkdown>
          </div>

          {/* Available Treatments */}
          {treatments.length > 0 && (
            <section className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-6">
                {locale === 'ar' ? 'العلاجات المتاحة' : 'Available Treatments'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {treatments.map((treatment) => {
                  const urlParts = treatment.url.split('/');
                  const treatmentSlug = urlParts[7];

                  return (
                    <Link
                      key={treatment.url}
                      href={`/${locale}/medical-tourism/${country}/${city}/${treatmentSlug}`}
                      className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border hover:border-primary-500"
                    >
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">
                        {treatment.h1.split(' in India')[0]}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {treatment.meta_desc.substring(0, 100)}...
                      </p>
                      <span className="inline-block mt-3 text-primary-600 text-sm font-medium">
                        {locale === 'ar' ? 'اعرف المزيد →' : 'Learn More →'}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}

// Enable ISR
export const revalidate = 3600; // Revalidate every hour

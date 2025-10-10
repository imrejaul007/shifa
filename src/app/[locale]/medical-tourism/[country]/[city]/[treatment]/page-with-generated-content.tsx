/**
 * Treatment Landing Page - Using Generated Content
 * This version uses the generated unique content from content-service
 *
 * To use this version:
 * 1. Backup the existing page.tsx
 * 2. Rename this file to page.tsx
 * 3. The page will automatically use the generated content
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTreatment, getAllTreatments, getTreatmentsByCity } from '@/lib/content-service';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    locale: string;
    country: string;
    city: string;
    treatment: string;
  }>;
}

export async function generateStaticParams() {
  const treatments = getAllTreatments();

  // Generate first 30 treatment pages statically
  return treatments.slice(0, 30).map((treatment) => {
    const urlParts = treatment.url.split('/');
    return {
      locale: urlParts[3],
      country: urlParts[5],
      city: urlParts[6],
      treatment: urlParts[7],
    };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, country, city, treatment } = await params;

  const treatmentPage = getTreatment({ locale, country, city, treatment });

  if (!treatmentPage) {
    return {
      title: 'Treatment Not Found',
    };
  }

  return {
    title: treatmentPage.title,
    description: treatmentPage.meta_desc,
    openGraph: {
      title: treatmentPage.title,
      description: treatmentPage.meta_desc,
      url: treatmentPage.url,
      siteName: 'Shifa AlHind',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    alternates: {
      canonical: treatmentPage.url,
      languages: {
        en: treatmentPage.url.replace(`/${locale}/`, '/en/'),
        ar: treatmentPage.url.replace(`/${locale}/`, '/ar/'),
      },
    },
  };
}

export default async function TreatmentPageWithContent({ params }: PageProps) {
  const { locale, country, city, treatment } = await params;

  const treatmentPage = getTreatment({ locale, country, city, treatment });

  if (!treatmentPage || !treatmentPage.full_content) {
    notFound();
  }

  const relatedTreatments = getTreatmentsByCity(city, locale)
    .filter((t) => t.slug !== treatment)
    .slice(0, 3);

  // Parse JSON-LD if available
  const jsonLd = treatmentPage.json_ld ? JSON.parse(treatmentPage.json_ld) : null;

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
              <li className="before:content-['/'] before:mx-2 text-gray-700">{treatmentPage.h1}</li>
            </ol>
          </div>
        </nav>

        {/* Main Content */}
        <article className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {treatmentPage.h1}
            </h1>
            <p className="text-xl text-gray-600">{treatmentPage.meta_desc}</p>
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
              {treatmentPage.full_content}
            </ReactMarkdown>
          </div>

          {/* Related Treatments */}
          {relatedTreatments.length > 0 && (
            <section className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-6">
                {locale === 'ar' ? 'علاجات أخرى في هذه المدينة' : 'Other Treatments in This City'}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedTreatments.map((related) => {
                  const urlParts = related.url.split('/');
                  const relatedTreatment = urlParts[7];

                  return (
                    <Link
                      key={related.url}
                      href={`/${locale}/medical-tourism/${country}/${city}/${relatedTreatment}`}
                      className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
                    >
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">{related.h1}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3">{related.meta_desc}</p>
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

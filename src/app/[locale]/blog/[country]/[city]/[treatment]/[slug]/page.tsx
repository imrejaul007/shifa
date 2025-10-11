import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticle, getRelatedArticles } from '@/lib/content-service';
import ReactMarkdown from 'react-markdown';

interface PageProps {
  params: Promise<{
    locale: string;
    country: string;
    city: string;
    treatment: string;
    slug: string;
  }>;
}

// Use dynamic rendering to avoid build errors with large datasets
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, country, city, treatment, slug } = await params;

  const article = getArticle({ locale, country, city, treatment, slug });

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.meta_desc,
    openGraph: {
      title: article.title,
      description: article.meta_desc,
      url: article.url,
      siteName: 'Shifa AlHind',
      type: 'article',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.meta_desc,
    },
    alternates: {
      canonical: article.url,
      languages: {
        en: article.url.replace(`/${locale}/`, '/en/'),
        ar: article.url.replace(`/${locale}/`, '/ar/'),
      },
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, country, city, treatment, slug } = await params;

  const article = getArticle({ locale, country, city, treatment, slug });

  if (!article || !article.full_content) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.url, 3);

  // Parse JSON-LD if available
  const jsonLd = article.json_ld ? JSON.parse(article.json_ld) : null;

  // Format treatment and city names from slugs for display
  const treatmentName = treatment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const cityName = city
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <>
      {/* JSON-LD Schema */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center space-x-2">
            <li>
              <a href={`/${locale}`} className="hover:text-primary-600">
                {locale === 'ar' ? 'الرئيسية' : 'Home'}
              </a>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <a href={`/${locale}/blog`} className="hover:text-primary-600">
                {locale === 'ar' ? 'المدونة' : 'Blog'}
              </a>
            </li>
            <li className="before:content-['/'] before:mx-2 text-gray-900">{article.h1}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{article.h1}</h1>
          <p className="text-xl text-gray-600">{article.meta_desc}</p>
          {article.generated_at && (
            <time className="block mt-4 text-sm text-gray-500">
              {locale === 'ar' ? 'آخر تحديث: ' : 'Last updated: '}
              {new Date(article.generated_at).toLocaleDateString(
                locale === 'ar' ? 'ar-SA' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </time>
          )}
        </header>

        {/* Related Resources Box */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 mb-8 border-l-4 border-primary">
          <h3 className="text-lg font-bold mb-4 text-primary">
            {locale === 'ar' ? '🔗 موارد ذات صلة' : '🔗 Related Resources'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href={`/${locale}/medical-tourism/${country}/${city}/${treatment}`}
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition font-medium"
            >
              <span>📋</span>
              <span>
                {locale === 'ar'
                  ? `معلومات ${treatmentName} الكاملة`
                  : `Complete ${treatmentName} Information`}
              </span>
            </Link>
            <Link
              href={`/${locale}/medical-tourism/${country}/${city}`}
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition font-medium"
            >
              <span>🏙️</span>
              <span>
                {locale === 'ar' ? `جميع العلاجات في ${cityName}` : `All Treatments in ${cityName}`}
              </span>
            </Link>
            <Link
              href={`/${locale}/consultation`}
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition font-medium"
            >
              <span>💬</span>
              <span>{locale === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}</span>
            </Link>
            <Link
              href={`/${locale}/hospitals`}
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition font-medium"
            >
              <span>🏥</span>
              <span>{locale === 'ar' ? 'المستشفيات الشريكة' : 'Partner Hospitals'}</span>
            </Link>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
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
              p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full divide-y divide-gray-200">{children}</table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
              tbody: ({ children }) => (
                <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
              ),
              th: ({ children }) => (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{children}</td>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary-500 pl-4 italic my-4 text-gray-600">
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
            {article.full_content}
          </ReactMarkdown>
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-primary-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            {locale === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Start Your Journey?'}
          </h2>
          <p className="mb-6 text-gray-700">
            {locale === 'ar'
              ? 'احصل على استشارة مجانية وخطة علاج شخصية'
              : 'Get a free consultation and personalized treatment plan'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`/${locale}/contact`}
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center"
            >
              {locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            </a>
            <a
              href="https://wa.me/918012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center"
            >
              {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              {locale === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => {
                const relatedUrlParts = related.url.split('/');
                const relatedSlug = relatedUrlParts[relatedUrlParts.length - 1];

                return (
                  <a
                    key={related.url}
                    href={`/${locale}/blog/${country}/${city}/${treatment}/${relatedSlug}`}
                    className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{related.h1}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{related.meta_desc}</p>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </>
  );
}

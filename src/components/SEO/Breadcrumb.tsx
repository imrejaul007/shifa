/**
 * SEO-Optimized Breadcrumb Component
 * Includes JSON-LD schema for search engines
 */

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbSchema, generateSchemaScript, BreadcrumbItem } from '@/lib/seo-helpers';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale: 'en' | 'ar';
  className?: string;
}

export default function Breadcrumb({ items, locale, className = '' }: BreadcrumbProps) {
  const schema = generateBreadcrumbSchema(items, locale);
  const isRTL = locale === 'ar';

  return (
    <>
      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={generateSchemaScript(schema)} />

      {/* Visual Breadcrumb */}
      <nav
        aria-label={locale === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}
        className={`flex items-center gap-2 text-sm ${className}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <ol className="flex items-center gap-2 flex-wrap">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight
                  className={`w-4 h-4 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              )}
              {index === items.length - 1 ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

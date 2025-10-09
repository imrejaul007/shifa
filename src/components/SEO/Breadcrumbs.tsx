'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from './JsonLd';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale?: 'en' | 'ar';
}

export default function Breadcrumbs({ items, locale = 'en' }: BreadcrumbsProps) {
  const allItems = [{ name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(allItems)} />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground py-4"
      >
        {allItems.map((item, index) => (
          <div key={item.url} className="flex items-center space-x-2 rtl:space-x-reverse">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            )}
            {index === 0 && <Home className="w-4 h-4" />}
            {index === allItems.length - 1 ? (
              <span className="font-medium text-foreground">{item.name}</span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-accent transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}

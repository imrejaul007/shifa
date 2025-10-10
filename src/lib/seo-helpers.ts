/**
 * SEO Helpers for Shifa AlHind
 * Comprehensive SEO utilities for metadata, schema, and optimization
 */

import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://shifaalhind.com';

// ============================================================================
// METADATA GENERATION
// ============================================================================

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  locale: 'en' | 'ar';
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

export function generateFullMetadata(params: SEOMetadata): Metadata {
  const {
    title,
    description,
    keywords = [],
    locale,
    canonical,
    ogImage,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    author = 'Shifa AlHind',
    noindex = false,
  } = params;

  const fullTitle = `${title} | Shifa AlHind – Trusted Medical Tourism Partner from GCC to India`;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : `${baseUrl}/${locale}`;
  const imageUrl = ogImage || `${baseUrl}/og-image.jpg`;

  // Alternate language URLs
  const alternateEn = canonical?.replace(`/${locale}`, '/en') || '/en';
  const alternateAr = canonical?.replace(`/${locale}`, '/ar') || '/ar';

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: 'Shifa AlHind',
    publisher: 'Shifa AlHind Medical Tourism',
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}${alternateEn}`,
        ar: `${baseUrl}${alternateAr}`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'Shifa AlHind',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: ogType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@shifaalhind',
      site: '@shifaalhind',
    },
    other: {
      'theme-color': '#005b4f',
      language: locale === 'ar' ? 'Arabic, English' : 'English, Arabic',
    },
  };

  return metadata;
}

// ============================================================================
// JSON-LD SCHEMA GENERATION
// ============================================================================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[], locale: 'en' | 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}/${locale}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${baseUrl}/#organization`,
    name: 'Shifa AlHind Medical Tourism',
    alternateName: 'شفاء الهند',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    description:
      'Premium medical tourism facilitator connecting GCC patients with JCI-accredited hospitals in Bangalore, India. Offering affordable, world-class medical care with complete Arabic support.',
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
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '12.9716',
      longitude: '77.5946',
    },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Kuwait' },
      { '@type': 'Country', name: 'Oman' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Country', name: 'Bahrain' },
    ],
    priceRange: '$$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/shifaalhind',
      'https://www.instagram.com/shifaalhind',
      'https://www.linkedin.com/company/shifaalhind',
      'https://twitter.com/shifaalhind',
    ],
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export interface BlogPostSchema {
  headline: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image: string;
  url: string;
}

export function generateBlogPostSchema(post: BlogPostSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.headline,
    description: post.description,
    image: post.image,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shifa AlHind',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate || post.publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
  };
}

export interface MedicalProcedureSchema {
  name: string;
  description: string;
  procedureType?: string;
  bodyLocation?: string;
  preparation?: string;
  followup?: string;
  howPerformed?: string;
  cost?: {
    minPrice: number;
    maxPrice: number;
    currency: string;
  };
}

export function generateMedicalProcedureSchema(procedure: MedicalProcedureSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: procedure.name,
    description: procedure.description,
    procedureType: procedure.procedureType || 'Therapeutic',
    bodyLocation: procedure.bodyLocation,
    preparation: procedure.preparation,
    followup: procedure.followup,
    howPerformed: procedure.howPerformed,
    ...(procedure.cost && {
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: procedure.cost.minPrice,
          maxPrice: procedure.cost.maxPrice,
          priceCurrency: procedure.cost.currency,
        },
      },
    }),
  };
}

export interface HospitalSchema {
  name: string;
  description: string;
  address: string;
  telephone?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
}

export function generateHospitalSchema(hospital: HospitalSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: hospital.name,
    description: hospital.description,
    image: hospital.image || `${baseUrl}/hospitals/default.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: hospital.address,
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    telephone: hospital.telephone,
    ...(hospital.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: hospital.rating,
        reviewCount: hospital.reviewCount || 100,
        bestRating: 5,
      },
    }),
  };
}

// ============================================================================
// INTERNAL LINKING HELPERS
// ============================================================================

export interface RelatedLink {
  title: string;
  url: string;
  description?: string;
}

export function generateInternalLinks(
  _pageType: 'treatment' | 'hospital' | 'blog' | 'service',
  _currentSlug: string
): {
  relatedTreatments: RelatedLink[];
  relatedHospitals: RelatedLink[];
  relatedBlogs: RelatedLink[];
  relatedServices: RelatedLink[];
} {
  // This would ideally fetch from database
  // For now, return structured format that components can use
  return {
    relatedTreatments: [],
    relatedHospitals: [],
    relatedBlogs: [],
    relatedServices: [],
  };
}

// ============================================================================
// SEO KEYWORDS BY PAGE TYPE
// ============================================================================

export const seoKeywords = {
  homepage: [
    'medical tourism India',
    'GCC patients India',
    'affordable surgery India',
    'hospitals Bangalore',
    'medical treatment India GCC',
    'Arabic support hospitals India',
    'medical visa India',
    'healthcare India UAE patients',
    'best hospitals India Saudi patients',
    'medical tourism facilitator',
  ],
  treatments: {
    ivf: [
      'IVF treatment India cost',
      'fertility clinic Bangalore',
      'IVF GCC patients',
      'affordable IVF India',
      'IVF success rate India',
      'IVF Dubai vs India cost',
    ],
    heart: [
      'heart surgery India cost',
      'cardiac surgery Bangalore',
      'heart treatment GCC patients',
      'bypass surgery India',
      'affordable heart surgery',
      'cardiology India',
    ],
    knee: [
      'knee replacement India cost',
      'joint replacement Bangalore',
      'orthopedic surgery India',
      'knee surgery GCC patients',
      'affordable knee replacement',
      'orthopedics India',
    ],
    cancer: [
      'cancer treatment India cost',
      'oncology hospitals Bangalore',
      'cancer care GCC patients',
      'chemotherapy India',
      'radiation therapy India',
      'cancer surgery India',
    ],
    transplant: [
      'organ transplant India',
      'kidney transplant cost India',
      'liver transplant Bangalore',
      'transplant surgery GCC patients',
      'affordable transplant India',
    ],
    cosmetic: [
      'cosmetic surgery India cost',
      'plastic surgery Bangalore',
      'rhinoplasty India',
      'liposuction India price',
      'cosmetic procedures GCC to India',
    ],
    dental: [
      'dental implants India cost',
      'dental clinic Bangalore',
      'teeth implant GCC patients',
      'affordable dental care India',
      'dental tourism India',
    ],
  },
  services: [
    'medical visa assistance India',
    'Arabic translator hospitals India',
    'airport pickup medical patients',
    'accommodation near hospitals Bangalore',
    'medical coordinator GCC patients',
    'post-treatment care India',
  ],
  travel: [
    'medical visa India GCC',
    'travel to India for treatment',
    'hotels near hospitals Bangalore',
    'medical tourism packages',
    'flight booking medical travel',
  ],
};

// ============================================================================
// VOICE SEARCH OPTIMIZATION
// ============================================================================

export function generateVoiceSearchFAQs(
  _pageType: 'treatment' | 'hospital' | 'service'
): FAQItem[] {
  const commonFAQs: FAQItem[] = [
    {
      question: 'How much does medical treatment cost in India?',
      answer:
        'Medical treatment in India costs 60-80% less than GCC countries. For example, heart surgery costs $8,000-15,000 in India compared to $50,000-100,000 in UAE/Saudi Arabia.',
    },
    {
      question: 'Can I get an Arabic translator at Indian hospitals?',
      answer:
        'Yes, all major hospitals we work with provide Arabic-speaking coordinators and medical interpreters for GCC patients throughout their treatment journey.',
    },
    {
      question: 'How do I get a medical visa for India?',
      answer:
        'We assist with e-Medical Visa applications which take 3-5 days. You need a passport, hospital invitation letter, and medical reports. The visa is valid for 60 days.',
    },
  ];

  return commonFAQs;
}

// ============================================================================
// HELPER: Generate JSON-LD Script Tag
// ============================================================================

export function generateSchemaScript(schema: object | object[]) {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  return {
    __html: JSON.stringify(schemaArray),
  };
}

// ============================================================================
// SEO AUDIT HELPERS
// ============================================================================

export interface SEOAuditResult {
  score: number;
  issues: string[];
  recommendations: string[];
}

export function auditPageSEO(params: {
  title?: string;
  description?: string;
  h1Count?: number;
  wordCount?: number;
  imageCount?: number;
  imagesWithAlt?: number;
  internalLinks?: number;
  externalLinks?: number;
}): SEOAuditResult {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Title checks
  if (!params.title || params.title.length === 0) {
    issues.push('Missing page title');
    score -= 20;
  } else if (params.title.length < 30) {
    issues.push('Title too short (< 30 characters)');
    score -= 10;
  } else if (params.title.length > 60) {
    issues.push('Title too long (> 60 characters)');
    score -= 5;
  }

  // Description checks
  if (!params.description || params.description.length === 0) {
    issues.push('Missing meta description');
    score -= 15;
  } else if (params.description.length < 120) {
    issues.push('Description too short (< 120 characters)');
    score -= 10;
  } else if (params.description.length > 160) {
    issues.push('Description too long (> 160 characters)');
    score -= 5;
  }

  // H1 checks
  if (params.h1Count === 0) {
    issues.push('Missing H1 tag');
    score -= 15;
  } else if ((params.h1Count || 0) > 1) {
    issues.push('Multiple H1 tags found');
    score -= 10;
  }

  // Content checks
  if ((params.wordCount || 0) < 300) {
    issues.push('Content too short (< 300 words)');
    score -= 10;
  }

  // Image alt text checks
  if (params.imageCount && params.imagesWithAlt && params.imagesWithAlt < params.imageCount) {
    issues.push(`${params.imageCount - params.imagesWithAlt} images missing alt text`);
    score -= 10;
  }

  // Internal linking checks
  if ((params.internalLinks || 0) < 3) {
    recommendations.push('Add more internal links (at least 3-5)');
  }

  // Generate recommendations
  if (score < 80) {
    recommendations.push('Fix critical SEO issues to improve score');
  }
  if ((params.wordCount || 0) < 500) {
    recommendations.push('Consider adding more content (aim for 500+ words)');
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations,
  };
}

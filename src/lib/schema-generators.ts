/**
 * Schema Markup Generators
 * Comprehensive schema.org markup for SEO optimization
 */

// Medical Business Schema
export interface MedicalBusinessSchema {
  name: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    addressCountry: string;
  };
  languages?: string[];
  priceRange?: string;
}

export function generateMedicalBusinessSchema(data: MedicalBusinessSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: data.name,
    description: data.description,
    url: data.url || 'https://shifaalhind.com',
    telephone: data.telephone || '+91 801 234 5678',
    email: data.email || 'info@shifaalhind.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address?.streetAddress,
      addressLocality: data.address?.addressLocality || 'Bangalore',
      addressRegion: data.address?.addressRegion || 'Karnataka',
      addressCountry: data.address?.addressCountry || 'IN',
    },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Country', name: 'Oman' },
      { '@type': 'Country', name: 'Kuwait' },
      { '@type': 'Country', name: 'Bahrain' },
    ],
    availableLanguage: data.languages || ['English', 'Arabic', 'Hindi'],
    priceRange: data.priceRange || '$$',
    medicalSpecialty: [
      'Cardiology',
      'Orthopedics',
      'Oncology',
      'Neurology',
      'Fertility',
      'Cosmetic Surgery',
      'Dental Care',
      'Ophthalmology',
      'Gastroenterology',
      'Organ Transplant',
      'ENT',
      'Ayurveda',
    ],
  };
}

// Breadcrumb Schema
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Medical Procedure Schema
export interface MedicalProcedureSchema {
  name: string;
  description: string;
  procedureType?: string;
  preparation?: string;
  followup?: string;
  howPerformed?: string;
  cost?: {
    minPrice: number;
    maxPrice: number;
    currency: string;
  };
}

export function generateMedicalProcedureSchema(data: MedicalProcedureSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: data.name,
    description: data.description,
    procedureType: data.procedureType || data.name,
    preparation: data.preparation,
    followup: data.followup,
    howPerformed: data.howPerformed,
    ...(data.cost && {
      cost: {
        '@type': 'MonetaryAmount',
        currency: data.cost.currency,
        minValue: data.cost.minPrice,
        maxValue: data.cost.maxPrice,
      },
    }),
  };
}

// FAQ Schema
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

// Article Schema
export interface ArticleSchema {
  headline: string;
  description: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  url: string;
}

export function generateArticleSchema(data: ArticleSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    author: {
      '@type': 'Organization',
      name: data.author || 'Shifa AlHind',
      url: 'https://shifaalhind.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shifa AlHind',
      url: 'https://shifaalhind.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://shifaalhind.com/logo.png',
      },
    },
    datePublished: data.datePublished || new Date().toISOString(),
    dateModified: data.dateModified || new Date().toISOString(),
    ...(data.image && { image: data.image }),
    url: data.url,
  };
}

// Organization Schema (for website)
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Shifa AlHind',
    alternateName: 'شفاء الهند',
    url: 'https://shifaalhind.com',
    logo: 'https://shifaalhind.com/logo.png',
    description:
      'Leading medical tourism facilitator connecting GCC patients with world-class healthcare in India. Affordable treatment with complete travel assistance.',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-801-234-5678',
        contactType: 'customer service',
        availableLanguage: ['English', 'Arabic'],
        areaServed: ['AE', 'SA', 'QA', 'OM', 'KW', 'BH'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/shifaalhind',
      'https://www.instagram.com/shifaalhind',
      'https://twitter.com/shifaalhind',
      'https://www.linkedin.com/company/shifaalhind',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
  };
}

// Website Schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shifa AlHind',
    alternateName: 'شفاء الهند',
    url: 'https://shifaalhind.com',
    description: 'Medical tourism from GCC to India - Save 60-70% on world-class healthcare',
    inLanguage: ['en', 'ar'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://shifaalhind.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Medical Condition Schema
export interface MedicalConditionSchema {
  name: string;
  description: string;
  possibleTreatment?: string[];
  riskFactor?: string[];
  typicalTest?: string[];
}

export function generateMedicalConditionSchema(data: MedicalConditionSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: data.name,
    description: data.description,
    ...(data.possibleTreatment && { possibleTreatment: data.possibleTreatment }),
    ...(data.riskFactor && { riskFactor: data.riskFactor }),
    ...(data.typicalTest && { typicalTest: data.typicalTest }),
  };
}

// Medical Organization Schema
export function generateMedicalOrganizationSchema(hospitalName: string, city: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: hospitalName,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city || 'Bangalore',
      addressCountry: 'IN',
    },
    medicalSpecialty: [
      'Cardiology',
      'Orthopedics',
      'Oncology',
      'Neurology',
      'Fertility',
      'Cosmetic Surgery',
      'Dental Care',
      'Ophthalmology',
      'Gastroenterology',
      'Organ Transplant',
    ],
    accreditation: 'JCI Accredited',
  };
}

// Travel Schema for Medical Tourism
export interface MedicalTripSchema {
  name: string;
  description: string;
  origin: string;
  destination: string;
  estimatedCost?: {
    min: number;
    max: number;
    currency: string;
  };
}

export function generateMedicalTripSchema(data: MedicalTripSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Trip',
    name: data.name,
    description: data.description,
    origin: {
      '@type': 'Place',
      name: data.origin,
    },
    destination: {
      '@type': 'Place',
      name: data.destination || 'Bangalore, India',
    },
    ...(data.estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: data.estimatedCost.currency,
        minValue: data.estimatedCost.min,
        maxValue: data.estimatedCost.max,
      },
    }),
  };
}

// Helper to combine multiple schemas
export function combineSchemas(...schemas: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

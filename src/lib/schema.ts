import { Organization, MedicalProcedure, FAQPage, Hospital, Physician } from 'schema-dts';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://shifaalhind.com';

// Organization Schema
export const organizationSchema: Organization = {
  '@type': 'MedicalBusiness',
  '@id': `${baseUrl}/#organization`,
  name: 'Shifa AlHind Medical Tourism',
  alternateName: 'شفاء الهند',
  description: 'Premium medical tourism facilitator connecting GCC patients with JCI-accredited hospitals in Bangalore, India. Offering affordable, world-class medical care with complete Arabic support.',
  url: baseUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${baseUrl}/logo.png`,
    width: '512',
    height: '512',
  },
  image: {
    '@type': 'ImageObject',
    url: `${baseUrl}/og-image.jpg`,
    width: '1200',
    height: '630',
  },
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
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-98765-43210',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Arabic', 'Hindi'],
      areaServed: ['AE', 'SA', 'KW', 'OM', 'QA', 'BH'],
    },
  ],
};

// Medical Procedure Schema
export const medicalProcedureSchema = (treatment: {
  name: string;
  nameAr?: string;
  description: string;
  price: number;
  duration: string;
  recoveryTime?: string;
  slug: string;
}): MedicalProcedure => ({
  '@type': 'MedicalProcedure',
  '@id': `${baseUrl}/treatments/${treatment.slug}#procedure`,
  name: treatment.name,
  alternateName: treatment.nameAr,
  description: treatment.description,
  procedureType: 'Surgical',
  medicineSystem: 'WesternConventional',
  followup: treatment.recoveryTime || 'Varies by patient',
  howPerformed: 'In hospital under expert care',
  preparation: 'Pre-operative consultations and medical tests required',
  offers: {
    '@type': 'Offer',
    price: treatment.price.toString(),
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `${baseUrl}/treatments/${treatment.slug}`,
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
});

// Hospital Schema
export const hospitalSchema = (hospital: {
  name: string;
  nameAr?: string;
  description: string;
  rating: number;
  reviewCount?: number;
  accreditations: string[];
  location: string;
  specialties: string[];
  image?: string;
}): Hospital => ({
  '@type': 'Hospital',
  name: hospital.name,
  alternateName: hospital.nameAr,
  description: hospital.description,
  image: hospital.image || `${baseUrl}/hospitals/default.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: hospital.location,
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: hospital.rating.toString(),
    reviewCount: (hospital.reviewCount || 100).toString(),
    bestRating: '5',
  },
  medicalSpecialty: hospital.specialties,
  availableService: hospital.accreditations.map(acc => ({
    '@type': 'MedicalProcedure',
    name: acc,
  })),
});

// Doctor/Physician Schema
export const physicianSchema = (doctor: {
  name: string;
  specialty: string;
  yearsExperience: number;
  qualifications: string[];
  hospital?: string;
  rating?: number;
  image?: string;
}): Physician => ({
  '@type': 'Physician',
  name: doctor.name,
  medicalSpecialty: doctor.specialty,
  image: doctor.image || `${baseUrl}/doctors/default.jpg`,
  hasCredential: doctor.qualifications.map(qual => ({
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: qual,
  })),
  workLocation: doctor.hospital
    ? {
        '@type': 'Hospital',
        name: doctor.hospital,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bangalore',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
      }
    : undefined,
  aggregateRating: doctor.rating
    ? {
        '@type': 'AggregateRating',
        ratingValue: doctor.rating.toString(),
        bestRating: '5',
      }
    : undefined,
});

// FAQ Schema
export const faqSchema = (faqs: Array<{ question: string; answer: string }>): FAQPage => ({
  '@type': 'FAQPage',
  '@id': `${baseUrl}/faq#faqpage`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Breadcrumb Schema
export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.url}`,
  })),
});

// Review Schema
export const reviewSchema = (review: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  treatmentName?: string;
}) => ({
  '@type': 'Review',
  author: {
    '@type': 'Person',
    name: review.author,
  },
  datePublished: review.datePublished,
  reviewBody: review.reviewBody,
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.rating.toString(),
    bestRating: '5',
  },
  itemReviewed: review.treatmentName
    ? {
        '@type': 'MedicalProcedure',
        name: review.treatmentName,
      }
    : {
        '@type': 'MedicalBusiness',
        name: 'Shifa AlHind Medical Tourism',
      },
});

// Package/Service Schema
export const serviceSchema = (pkg: {
  name: string;
  description: string;
  price: number;
  includes: string[];
  duration: string;
}) => ({
  '@type': 'Service',
  serviceType: pkg.name,
  description: pkg.description,
  provider: {
    '@type': 'MedicalBusiness',
    name: 'Shifa AlHind Medical Tourism',
  },
  offers: {
    '@type': 'Offer',
    price: pkg.price.toString(),
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  areaServed: ['AE', 'SA', 'KW', 'OM', 'QA', 'BH'],
  additionalProperty: pkg.includes.map((item) => ({
    '@type': 'PropertyValue',
    name: 'Included Service',
    value: item,
  })),
});

// Helper function to generate JSON-LD script tag
export const generateJsonLd = (schema: any) => {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      ...schema,
    }),
  };
};

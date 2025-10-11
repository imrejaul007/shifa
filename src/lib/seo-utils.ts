/**
 * SEO Utilities
 * Comprehensive SEO tools for optimization
 */

// Calculate keyword density
export function calculateKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/);
  const keywordWords = keyword.toLowerCase().split(/\s+/);
  let count = 0;

  for (let i = 0; i <= words.length - keywordWords.length; i++) {
    const slice = words.slice(i, i + keywordWords.length).join(' ');
    if (slice === keywordWords.join(' ')) {
      count++;
    }
  }

  return (count / words.length) * 100;
}

// Generate optimal meta description
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  const sentences = content.split(/[.!?]+/);
  let description = '';

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (description.length + trimmed.length + 1 <= maxLength) {
      description += (description ? ' ' : '') + trimmed;
    } else {
      break;
    }
  }

  if (description.length < maxLength * 0.8) {
    // If description is too short, add more
    description = content.slice(0, maxLength - 3) + '...';
  }

  return description;
}

// Extract headings for SEO structure analysis
export function extractHeadings(content: string): {
  h1: string[];
  h2: string[];
  h3: string[];
} {
  const h1Matches = content.match(/^#\s+(.+)$/gm) || [];
  const h2Matches = content.match(/^##\s+(.+)$/gm) || [];
  const h3Matches = content.match(/^###\s+(.+)$/gm) || [];

  return {
    h1: h1Matches.map((h) => h.replace(/^#\s+/, '')),
    h2: h2Matches.map((h) => h.replace(/^##\s+/, '')),
    h3: h3Matches.map((h) => h.replace(/^###\s+/, '')),
  };
}

// Calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Generate SEO-friendly URL slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract internal links from content
export function extractInternalLinks(
  content: string,
  domain: string = 'shifaalhind.com'
): string[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: string[] = [];
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[2];
    if (url.includes(domain) || url.startsWith('/')) {
      links.push(url);
    }
  }

  return links;
}

// Calculate content quality score
export interface ContentQualityMetrics {
  wordCount: number;
  readingTime: number;
  headingStructure: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
  };
  internalLinks: number;
  externalLinks: number;
  imageCount: number;
  qualityScore: number; // 0-100
}

export function analyzeContentQuality(content: string): ContentQualityMetrics {
  const wordCount = content.split(/\s+/).length;
  const readingTime = calculateReadingTime(content);
  const headings = extractHeadings(content);
  const internalLinks = extractInternalLinks(content).length;
  const externalLinks = (content.match(/\[([^\]]+)\]\(https?:\/\/(?!shifaalhind\.com)/g) || [])
    .length;
  const imageCount = (content.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || []).length;

  // Calculate quality score based on multiple factors
  let qualityScore = 0;

  // Word count (ideal: 1500-2500 words)
  if (wordCount >= 1500 && wordCount <= 2500) qualityScore += 25;
  else if (wordCount >= 1000) qualityScore += 15;
  else qualityScore += 5;

  // Heading structure
  if (headings.h1.length === 1) qualityScore += 10;
  if (headings.h2.length >= 3 && headings.h2.length <= 8) qualityScore += 15;
  if (headings.h3.length >= 2) qualityScore += 10;

  // Internal links (ideal: 5-10)
  if (internalLinks >= 5 && internalLinks <= 10) qualityScore += 20;
  else if (internalLinks >= 3) qualityScore += 10;

  // External links (ideal: 2-5)
  if (externalLinks >= 2 && externalLinks <= 5) qualityScore += 10;
  else if (externalLinks >= 1) qualityScore += 5;

  // Images (ideal: 2-5)
  if (imageCount >= 2 && imageCount <= 5) qualityScore += 10;
  else if (imageCount >= 1) qualityScore += 5;

  return {
    wordCount,
    readingTime,
    headingStructure: {
      h1Count: headings.h1.length,
      h2Count: headings.h2.length,
      h3Count: headings.h3.length,
    },
    internalLinks,
    externalLinks,
    imageCount,
    qualityScore,
  };
}

// Generate hreflang tags
export function generateHreflangLinks(
  baseUrl: string,
  locales: string[] = ['en', 'ar']
): Array<{ rel: string; hrefLang: string; href: string }> {
  return locales.map((locale) => ({
    rel: 'alternate',
    hrefLang: locale === 'ar' ? 'ar-SA' : 'en-US',
    href: baseUrl.replace(/\/(en|ar)\//, `/${locale}/`),
  }));
}

// Validate SEO requirements
export interface SEOValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

export function validateSEO(data: {
  title?: string;
  metaDescription?: string;
  h1?: string;
  content?: string;
  url?: string;
  canonical?: string;
  keywords?: string[];
}): SEOValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // Title validation
  if (!data.title) {
    errors.push('Title is required');
    score -= 20;
  } else {
    if (data.title.length < 30) {
      warnings.push('Title is too short (< 30 characters)');
      score -= 5;
    }
    if (data.title.length > 60) {
      warnings.push('Title is too long (> 60 characters)');
      score -= 5;
    }
  }

  // Meta description validation
  if (!data.metaDescription) {
    errors.push('Meta description is required');
    score -= 15;
  } else {
    if (data.metaDescription.length < 120) {
      warnings.push('Meta description is too short (< 120 characters)');
      score -= 5;
    }
    if (data.metaDescription.length > 160) {
      warnings.push('Meta description is too long (> 160 characters)');
      score -= 5;
    }
  }

  // H1 validation
  if (!data.h1) {
    errors.push('H1 is required');
    score -= 15;
  }

  // Content validation
  if (data.content) {
    const wordCount = data.content.split(/\s+/).length;
    if (wordCount < 300) {
      warnings.push('Content is too short (< 300 words)');
      score -= 10;
    }

    const headings = extractHeadings(data.content);
    if (headings.h1.length !== 1) {
      warnings.push('Page should have exactly one H1 tag');
      score -= 10;
    }
    if (headings.h2.length === 0) {
      warnings.push('Page should have at least one H2 tag');
      score -= 5;
    }
  }

  // URL validation
  if (data.url) {
    if (data.url.length > 100) {
      warnings.push('URL is too long (> 100 characters)');
      score -= 5;
    }
    if (/[A-Z]/.test(data.url)) {
      warnings.push('URL should be lowercase');
      score -= 3;
    }
  }

  // Canonical validation
  if (!data.canonical) {
    warnings.push('Canonical URL is recommended');
    score -= 5;
  }

  // Keywords validation
  if (!data.keywords || data.keywords.length === 0) {
    warnings.push('Keywords are recommended');
    score -= 5;
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, score),
  };
}

// Generate Open Graph tags
export function generateOpenGraphTags(data: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  locale?: string;
}) {
  return {
    'og:title': data.title,
    'og:description': data.description,
    'og:url': data.url,
    'og:site_name': 'Shifa AlHind',
    'og:type': data.type || 'website',
    'og:locale': data.locale === 'ar' ? 'ar_SA' : 'en_US',
    ...(data.image && { 'og:image': data.image }),
  };
}

// Generate Twitter Card tags
export function generateTwitterCardTags(data: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': data.title,
    'twitter:description': data.description,
    ...(data.image && { 'twitter:image': data.image }),
  };
}

// Calculate internal linking depth
export function calculateLinkingDepth(url: string): number {
  const pathParts = url.split('/').filter((part) => part && !part.startsWith('http'));
  return pathParts.length - 1; // Subtract 1 for locale
}

// Generate sitemap entry
export interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemapEntry(
  url: string,
  options?: {
    lastModified?: string;
    changeFrequency?: SitemapEntry['changeFrequency'];
    priority?: number;
  }
): SitemapEntry {
  return {
    url,
    lastModified: options?.lastModified || new Date().toISOString(),
    changeFrequency: options?.changeFrequency || 'weekly',
    priority: options?.priority || 0.8,
  };
}

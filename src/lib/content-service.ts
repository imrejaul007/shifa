/**
 * Content Service
 * Provides access to generated medical tourism content
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Lazy load JSON data to avoid bundling large files
let articlesData: ContentPage[] | null = null;
let treatmentsData: ContentPage[] | null = null;
let citiesData: ContentPage[] | null = null;

function loadArticles(): ContentPage[] {
  if (!articlesData) {
    const filePath = join(process.cwd(), 'src/data/content_articles_full.json');
    articlesData = JSON.parse(readFileSync(filePath, 'utf-8'));
  }
  return articlesData!;
}

function loadTreatments(): ContentPage[] {
  if (!treatmentsData) {
    const filePath = join(process.cwd(), 'src/data/content_treatments_full.json');
    treatmentsData = JSON.parse(readFileSync(filePath, 'utf-8'));
  }
  return treatmentsData!;
}

function loadCities(): ContentPage[] {
  if (!citiesData) {
    const filePath = join(process.cwd(), 'src/data/content_cities_full.json');
    citiesData = JSON.parse(readFileSync(filePath, 'utf-8'));
  }
  return citiesData!;
}

export interface ContentPage {
  url: string;
  locale: string;
  slug: string;
  page_type: string;
  title: string;
  meta_desc: string;
  h1: string;
  json_ld?: string;
  full_content?: string;
  word_count?: number;
  generated_at?: string;
  needs_native_review?: boolean;
  needs_medical_review?: boolean;
  status?: string;
}

/**
 * Get all articles
 */
export function getAllArticles(): ContentPage[] {
  return loadArticles();
}

/**
 * Get article by URL parameters
 */
export function getArticle(params: {
  locale: string;
  country: string;
  city: string;
  treatment: string;
  slug: string;
}): ContentPage | null {
  const url = `https://shifaalhind.com/${params.locale}/blog/${params.country}/${params.city}/${params.treatment}/${params.slug}`;
  return loadArticles().find((a) => a.url === url) || null;
}

/**
 * Get articles by treatment
 */
export function getArticlesByTreatment(
  treatmentSlug: string,
  locale: string = 'en'
): ContentPage[] {
  return loadArticles().filter((a) => a.url.includes(`/${treatmentSlug}/`) && a.locale === locale);
}

/**
 * Get articles by city
 */
export function getArticlesByCity(citySlug: string, locale: string = 'en'): ContentPage[] {
  return loadArticles().filter((a) => a.url.includes(`/${citySlug}/`) && a.locale === locale);
}

/**
 * Get all treatment pages
 */
export function getAllTreatments(): ContentPage[] {
  return loadTreatments();
}

/**
 * Get treatment page by URL parameters
 */
export function getTreatment(params: {
  locale: string;
  country: string;
  city: string;
  treatment: string;
}): ContentPage | null {
  const url = `https://shifaalhind.com/${params.locale}/medical-tourism/${params.country}/${params.city}/${params.treatment}`;
  return loadTreatments().find((t) => t.url === url) || null;
}

/**
 * Get treatment pages by city
 */
export function getTreatmentsByCity(citySlug: string, locale: string = 'en'): ContentPage[] {
  return loadTreatments().filter((t) => t.url.includes(`/${citySlug}/`) && t.locale === locale);
}

/**
 * Get all city pages
 */
export function getAllCities(): ContentPage[] {
  return loadCities();
}

/**
 * Get city page by URL parameters
 */
export function getCity(params: {
  locale: string;
  country: string;
  city: string;
}): ContentPage | null {
  const url = `https://shifaalhind.com/${params.locale}/medical-tourism/${params.country}/${params.city}`;
  return loadCities().find((c) => c.url === url) || null;
}

/**
 * Get city pages by country
 */
export function getCitiesByCountry(countrySlug: string, locale: string = 'en'): ContentPage[] {
  return loadCities().filter((c) => c.url.includes(`/${countrySlug}/`) && c.locale === locale);
}

/**
 * Get related articles for a page
 */
export function getRelatedArticles(currentUrl: string, limit: number = 3): ContentPage[] {
  // Extract country, city, treatment from URL
  const urlParts = currentUrl.split('/');
  const locale = urlParts[3];
  const country = urlParts[5];
  const city = urlParts[6];
  const treatment = urlParts[7];

  // Find articles with same city and treatment but different slug
  const related = loadArticles().filter(
    (a) =>
      a.url.includes(`/${country}/${city}/${treatment}/`) &&
      a.url !== currentUrl &&
      a.locale === locale
  );

  return related.slice(0, limit);
}

/**
 * Parse markdown-like content to HTML
 */
export function parseContent(content: string): string {
  if (!content) return '';

  // Simple markdown parsing (you can use a library like 'marked' for more features)
  let html = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    // Tables (basic)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match
        .split('|')
        .filter((c) => c.trim())
        .map((c) => `<td>${c.trim()}</td>`)
        .join('');
      return `<tr>${cells}</tr>`;
    });

  // Wrap in paragraphs
  if (!html.startsWith('<h1>') && !html.startsWith('<h2>')) {
    html = `<p>${html}</p>`;
  }

  return html;
}

/**
 * Get all unique countries
 */
export function getAllCountries(): string[] {
  const countries = new Set<string>();
  [...loadArticles(), ...loadTreatments(), ...loadCities()].forEach((page) => {
    const urlParts = page.url.split('/');
    if (urlParts.length > 5) {
      countries.add(urlParts[5]); // Country slug
    }
  });
  return Array.from(countries);
}

/**
 * Get all unique treatments
 */
export function getAllTreatmentTypes(): string[] {
  const treatmentTypes = new Set<string>();
  [...loadArticles(), ...loadTreatments()].forEach((page) => {
    const urlParts = page.url.split('/');
    if (page.page_type === 'treatment_landing' && urlParts.length > 7) {
      treatmentTypes.add(urlParts[7]); // Treatment slug
    } else if (page.page_type === 'article' && urlParts.length > 8) {
      treatmentTypes.add(urlParts[7]); // Treatment slug from article
    }
  });
  return Array.from(treatmentTypes);
}

/**
 * Search content by keyword
 */
export function searchContent(
  query: string,
  locale: string = 'en',
  limit: number = 10
): ContentPage[] {
  const lowerQuery = query.toLowerCase();
  const allContent = [...loadArticles(), ...loadTreatments(), ...loadCities()];

  const results = allContent.filter(
    (page) =>
      page.locale === locale &&
      (page.title?.toLowerCase().includes(lowerQuery) ||
        page.meta_desc?.toLowerCase().includes(lowerQuery) ||
        page.h1?.toLowerCase().includes(lowerQuery) ||
        page.full_content?.toLowerCase().includes(lowerQuery))
  );

  return results.slice(0, limit);
}

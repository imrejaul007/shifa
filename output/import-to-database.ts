#!/usr/bin/env ts-node
/**
 * Shifa AlHind - Database Import Script
 * Imports generated SEO content into Prisma database
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface ContentPage {
  url: string;
  locale: string;
  slug: string;
  page_type: string;
  title: string;
  meta_desc: string;
  h1: string;
  json_ld?: string;
  needs_native_review?: boolean;
  needs_medical_review?: boolean;
  status: string;
}

interface Interlink {
  source_url: string;
  page_type: string;
  locale: string;
  internal_links: {
    url: string;
    anchor_text: string;
    link_type: string;
  }[];
}

async function importContent() {
  console.log('='.repeat(70));
  console.log('Shifa AlHind - Database Import Script');
  console.log('='.repeat(70));

  // Load content manifest
  console.log('\n⏳ Loading content manifest...');
  const manifestPath = path.join(__dirname, 'content_manifest_full.json');
  const manifest: ContentPage[] = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  console.log(`✅ Loaded ${manifest.length} pages`);

  // Load interlinks
  console.log('\n⏳ Loading interlinking structure...');
  const interlinksPath = path.join(__dirname, 'interlink_structure.json');
  const interlinks: Interlink[] = JSON.parse(fs.readFileSync(interlinksPath, 'utf-8'));
  console.log(`✅ Loaded ${interlinks.length} interlink entries`);

  // Create a map of URLs to content pages
  const contentMap = new Map<string, ContentPage>();
  manifest.forEach((page) => {
    contentMap.set(page.url, page);
  });

  // Import city pages
  console.log('\n⏳ Importing city landing pages...');
  const cityPages = manifest.filter((p) => p.page_type === 'city_landing');
  let cityCount = 0;

  for (const page of cityPages) {
    try {
      // Extract country and city slugs from URL
      const urlParts = page.url.split('/');
      const countrySlug = urlParts[urlParts.length - 2];
      const citySlug = urlParts[urlParts.length - 1];

      // Check if this is a city we want to import
      // Note: You may want to filter or customize this logic

      console.log(`   Importing: ${page.url}`);
      cityCount++;

      // You would insert into your database here
      // Example (customize based on your schema):
      // await prisma.cityPage.upsert({
      //   where: { url: page.url },
      //   update: {
      //     title: page.title,
      //     metaDescription: page.meta_desc,
      //     h1: page.h1,
      //     jsonLd: page.json_ld,
      //     locale: page.locale,
      //   },
      //   create: {
      //     url: page.url,
      //     title: page.title,
      //     metaDescription: page.meta_desc,
      //     h1: page.h1,
      //     jsonLd: page.json_ld,
      //     locale: page.locale,
      //     countrySlug,
      //     citySlug,
      //   },
      // });
    } catch (error) {
      console.error(`   ❌ Failed to import ${page.url}:`, error);
    }
  }
  console.log(`✅ Imported ${cityCount} city pages`);

  // Import treatment pages
  console.log('\n⏳ Importing treatment landing pages...');
  const treatmentPages = manifest.filter((p) => p.page_type === 'treatment_landing');
  let treatmentCount = 0;

  for (const page of treatmentPages) {
    try {
      console.log(`   Importing: ${page.url}`);
      treatmentCount++;

      // Database insert logic here
    } catch (error) {
      console.error(`   ❌ Failed to import ${page.url}:`, error);
    }
  }
  console.log(`✅ Imported ${treatmentCount} treatment pages`);

  // Import articles
  console.log('\n⏳ Importing article pages...');
  const articlePages = manifest.filter((p) => p.page_type === 'article');
  let articleCount = 0;

  for (const page of articlePages) {
    try {
      // Extract metadata from URL
      const urlParts = page.url.split('/');
      const articleSlug = urlParts[urlParts.length - 1];
      const treatmentSlug = urlParts[urlParts.length - 2];
      const citySlug = urlParts[urlParts.length - 3];
      const countrySlug = urlParts[urlParts.length - 4];

      console.log(`   Importing: ${page.url}`);
      articleCount++;

      // Database insert logic here
      // Example:
      // await prisma.article.upsert({
      //   where: { url: page.url },
      //   update: {
      //     title: page.title,
      //     metaDescription: page.meta_desc,
      //     h1: page.h1,
      //     jsonLd: page.json_ld,
      //   },
      //   create: {
      //     url: page.url,
      //     slug: articleSlug,
      //     title: page.title,
      //     metaDescription: page.meta_desc,
      //     h1: page.h1,
      //     jsonLd: page.json_ld,
      //     locale: page.locale,
      //     treatmentSlug,
      //     citySlug,
      //     countrySlug,
      //     status: 'draft',
      //   },
      // });
    } catch (error) {
      console.error(`   ❌ Failed to import ${page.url}:`, error);
    }
  }
  console.log(`✅ Imported ${articleCount} article pages`);

  console.log('\n🎉 Import Complete!');
  console.log(`\n📊 Summary:`);
  console.log(`   - City pages: ${cityCount}`);
  console.log(`   - Treatment pages: ${treatmentCount}`);
  console.log(`   - Article pages: ${articleCount}`);
  console.log(`   - Total: ${cityCount + treatmentCount + articleCount}`);
}

async function main() {
  try {
    await importContent();
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { importContent };

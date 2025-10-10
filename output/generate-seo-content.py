#!/usr/bin/env python3
"""
Shifa AlHind - SEO Content Generator
Generates 980+ pages of bilingual medical tourism content
"""

import json
import csv
from datetime import datetime
from typing import List, Dict

# Configuration from YAML
BRAND = {
    "name": "Shifa AlHind",
    "domain": "https://shifaalhind.com",
    "default_locale": "en",
    "alt_locale": "ar",
}

GCC_STRUCTURE = [
    {
        "country_slug": "saudi-arabia",
        "country_name": "Saudi Arabia",
        "country_name_ar": "المملكة العربية السعودية",
        "cities": [
            {"slug": "riyadh", "name": "Riyadh", "name_ar": "الرياض"},
            {"slug": "jeddah", "name": "Jeddah", "name_ar": "جدة"},
            {"slug": "dammam", "name": "Dammam", "name_ar": "الدمام"},
        ],
    },
    {
        "country_slug": "united-arab-emirates",
        "country_name": "United Arab Emirates",
        "country_name_ar": "الإمارات العربية المتحدة",
        "cities": [
            {"slug": "dubai", "name": "Dubai", "name_ar": "دبي"},
            {"slug": "abu-dhabi", "name": "Abu Dhabi", "name_ar": "أبو ظبي"},
            {"slug": "sharjah", "name": "Sharjah", "name_ar": "الشارقة"},
        ],
    },
    {
        "country_slug": "qatar",
        "country_name": "Qatar",
        "country_name_ar": "قطر",
        "cities": [{"slug": "doha", "name": "Doha", "name_ar": "الدوحة"}],
    },
    {
        "country_slug": "oman",
        "country_name": "Oman",
        "country_name_ar": "عُمان",
        "cities": [{"slug": "muscat", "name": "Muscat", "name_ar": "مسقط"}],
    },
    {
        "country_slug": "kuwait",
        "country_name": "Kuwait",
        "country_name_ar": "الكويت",
        "cities": [{"slug": "kuwait-city", "name": "Kuwait City", "name_ar": "مدينة الكويت"}],
    },
    {
        "country_slug": "bahrain",
        "country_name": "Bahrain",
        "country_name_ar": "البحرين",
        "cities": [{"slug": "manama", "name": "Manama", "name_ar": "المنامة"}],
    },
]

TREATMENTS = [
    {"slug": "heart-surgery", "name": "Heart Surgery", "name_ar": "جراحة القلب"},
    {"slug": "knee-replacement", "name": "Knee Replacement", "name_ar": "استبدال الركبة"},
    {"slug": "ivf", "name": "IVF & Fertility Treatment", "name_ar": "التلقيح الصناعي وعلاج الخصوبة"},
    {"slug": "dental-implants", "name": "Dental Implants", "name_ar": "زراعة الأسنان"},
    {"slug": "hair-transplant", "name": "Hair Transplant", "name_ar": "زراعة الشعر"},
    {"slug": "cosmetic-surgery", "name": "Cosmetic Surgery", "name_ar": "الجراحة التجميلية"},
    {"slug": "oncology-treatment", "name": "Cancer Treatment", "name_ar": "علاج السرطان"},
    {"slug": "bariatric-surgery", "name": "Bariatric Surgery", "name_ar": "جراحة السمنة"},
]

ARTICLES_PER_TREATMENT = 5


def calculate_totals():
    """Calculate total pages to be generated"""
    total_cities = sum(len(country["cities"]) for country in GCC_STRUCTURE)
    total_city_pages = total_cities * 2  # EN + AR
    total_treatment_pages = total_cities * len(TREATMENTS) * 2
    total_article_pages = total_cities * len(TREATMENTS) * ARTICLES_PER_TREATMENT * 2

    return {
        "total_cities": total_cities,
        "total_treatments": len(TREATMENTS),
        "total_city_pages": total_city_pages,
        "total_treatment_pages": total_treatment_pages,
        "total_article_pages": total_article_pages,
        "grand_total": total_city_pages + total_treatment_pages + total_article_pages,
    }


def generate_city_page(country, city, locale="en"):
    """Generate city landing page metadata"""
    is_ar = locale == "ar"
    city_name = city["name_ar"] if is_ar else city["name"]
    country_name = country["country_name_ar"] if is_ar else country["country_name"]

    url = f"{BRAND['domain']}/{locale}/medical-tourism/{country['country_slug']}/{city['slug']}"

    title = f"{city_name} to India Medical Tourism — Affordable Healthcare | {BRAND['name']}" if not is_ar else f"السياحة العلاجية من {city_name} إلى الهند — رعاية صحية ميسورة التكلفة | {BRAND['name']}"

    meta_desc = f"Trusted medical tourism from {city_name}, {country_name} to India. Save 60-70%, JCI hospitals, Arabic support, visa help. Get free quote!" if not is_ar else f"السياحة العلاجية الموثوقة من {city_name}، {country_name} إلى الهند. وفر 60-70٪، مستشفيات معتمدة JCI، دعم عربي، مساعدة في التأشيرة."

    return {
        "url": url,
        "locale": locale,
        "slug": city["slug"],
        "page_type": "city_landing",
        "title": title,
        "meta_desc": meta_desc[:160],
        "h1": f"Medical Tourism from {city_name} to India" if not is_ar else f"السياحة العلاجية من {city_name} إلى الهند",
        "primary_keyword": f"{city_name} medical tourism India" if not is_ar else f"السياحة العلاجية {city_name} الهند",
        "needs_native_review": is_ar,
        "canonical": url,
        "hreflang_en": f"{BRAND['domain']}/en/medical-tourism/{country['country_slug']}/{city['slug']}",
        "hreflang_ar": f"{BRAND['domain']}/ar/medical-tourism/{country['country_slug']}/{city['slug']}",
    }


def generate_treatment_page(country, city, treatment, locale="en"):
    """Generate treatment landing page metadata"""
    is_ar = locale == "ar"
    city_name = city["name_ar"] if is_ar else city["name"]
    treatment_name = treatment["name_ar"] if is_ar else treatment["name"]

    url = f"{BRAND['domain']}/{locale}/medical-tourism/{country['country_slug']}/{city['slug']}/{treatment['slug']}"

    title = f"{city_name} {treatment_name} in India — Trusted & Affordable | {BRAND['name']}" if not is_ar else f"{treatment_name} في الهند من {city_name} — موثوق وبأسعار معقولة | {BRAND['name']}"

    meta_desc = f"Get {treatment_name} in India from {city_name}. 60-70% savings, top hospitals, Arabic coordinators, visa support. Free consultation!" if not is_ar else f"احصل على {treatment_name} في الهند من {city_name}. توفير 60-70٪، أفضل المستشفيات، منسقون عرب، دعم التأشيرة."

    return {
        "url": url,
        "locale": locale,
        "slug": treatment["slug"],
        "page_type": "treatment_landing",
        "title": title,
        "meta_desc": meta_desc[:160],
        "h1": f"{treatment_name} in India for {city_name} Patients" if not is_ar else f"{treatment_name} في الهند لمرضى {city_name}",
        "primary_keyword": f"{city_name} {treatment_name} India" if not is_ar else f"{treatment_name} {city_name} الهند",
        "needs_native_review": is_ar,
        "needs_medical_review": True,
        "canonical": url,
        "hreflang_en": f"{BRAND['domain']}/en/medical-tourism/{country['country_slug']}/{city['slug']}/{treatment['slug']}",
        "hreflang_ar": f"{BRAND['domain']}/ar/medical-tourism/{country['country_slug']}/{city['slug']}/{treatment['slug']}",
    }


def generate_article_slugs(treatment_slug):
    """Generate article slug variations for each treatment"""
    article_templates = {
        "heart-surgery": [
            "understanding-cabg-procedure-costs-recovery",
            "best-heart-hospitals-india-gcc-patients",
            "heart-valve-replacement-complete-guide",
            "preparing-for-heart-surgery-india",
            "post-heart-surgery-care-recovery-tips",
        ],
        "knee-replacement": [
            "knee-replacement-surgery-complete-guide",
            "best-orthopedic-hospitals-india",
            "knee-replacement-recovery-timeline",
            "partial-vs-total-knee-replacement",
            "preparing-for-knee-surgery-india",
        ],
        "ivf": [
            "ivf-treatment-success-rates-india",
            "best-fertility-clinics-india-gcc",
            "ivf-cost-comparison-gcc-vs-india",
            "preparing-for-ivf-treatment-india",
            "ivf-success-stories-gcc-patients",
        ],
        "dental-implants": [
            "dental-implants-procedure-complete-guide",
            "best-dental-clinics-india",
            "dental-implants-cost-comparison",
            "all-on-4-dental-implants-guide",
            "dental-tourism-india-gcc-patients",
        ],
        "hair-transplant": [
            "fue-hair-transplant-complete-guide",
            "best-hair-transplant-clinics-india",
            "hair-transplant-cost-india-vs-gcc",
            "hair-transplant-recovery-timeline",
            "hair-transplant-success-stories",
        ],
        "cosmetic-surgery": [
            "cosmetic-surgery-india-complete-guide",
            "best-plastic-surgeons-india",
            "rhinoplasty-nose-surgery-guide",
            "liposuction-procedure-costs-recovery",
            "cosmetic-surgery-safety-india",
        ],
        "oncology-treatment": [
            "cancer-treatment-india-complete-guide",
            "best-cancer-hospitals-india",
            "chemotherapy-radiation-india",
            "cancer-surgery-options-india",
            "cancer-treatment-costs-india-gcc",
        ],
        "bariatric-surgery": [
            "bariatric-surgery-weight-loss-guide",
            "gastric-bypass-vs-sleeve-gastrectomy",
            "best-bariatric-surgeons-india",
            "bariatric-surgery-recovery-tips",
            "bariatric-surgery-costs-india",
        ],
    }

    return article_templates.get(treatment_slug, [
        f"{treatment_slug}-complete-guide",
        f"best-{treatment_slug}-hospitals-india",
        f"{treatment_slug}-cost-comparison",
        f"{treatment_slug}-recovery-tips",
        f"{treatment_slug}-success-stories",
    ])


def generate_sitemap_preview():
    """Generate Stage 1: Sitemap Preview CSV"""
    pages = []

    for country in GCC_STRUCTURE:
        for city in country["cities"]:
            # City pages
            for locale in ["en", "ar"]:
                page = generate_city_page(country, city, locale)
                pages.append({
                    "url": page["url"],
                    "locale": locale,
                    "page_type": "city_landing",
                    "priority": "0.8",
                    "changefreq": "weekly",
                })

            # Treatment pages
            for treatment in TREATMENTS:
                for locale in ["en", "ar"]:
                    page = generate_treatment_page(country, city, treatment, locale)
                    pages.append({
                        "url": page["url"],
                        "locale": locale,
                        "page_type": "treatment_landing",
                        "priority": "0.7",
                        "changefreq": "weekly",
                    })

                # Article pages
                article_slugs = generate_article_slugs(treatment["slug"])
                for i, article_slug in enumerate(article_slugs[:ARTICLES_PER_TREATMENT]):
                    for locale in ["en", "ar"]:
                        url = f"{BRAND['domain']}/{locale}/blog/{country['country_slug']}/{city['slug']}/{treatment['slug']}/{article_slug}"
                        pages.append({
                            "url": url,
                            "locale": locale,
                            "page_type": "article",
                            "priority": "0.6",
                            "changefreq": "monthly",
                        })

    return pages


def main():
    """Main execution"""
    print("=" * 60)
    print("Shifa AlHind - SEO Content Generator")
    print("=" * 60)

    # Calculate totals
    totals = calculate_totals()
    print(f"\n📊 Content Generation Plan:")
    print(f"   - Cities: {totals['total_cities']}")
    print(f"   - Treatments: {totals['total_treatments']}")
    print(f"   - City Pages: {totals['total_city_pages']}")
    print(f"   - Treatment Pages: {totals['total_treatment_pages']}")
    print(f"   - Article Pages: {totals['total_article_pages']}")
    print(f"   - TOTAL PAGES: {totals['grand_total']}")

    # Generate sitemap preview
    print(f"\n⏳ Generating sitemap preview...")
    sitemap_pages = generate_sitemap_preview()

    # Save to CSV
    output_file = "sitemap_master_preview.csv"
    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["url", "locale", "page_type", "priority", "changefreq"])
        writer.writeheader()
        writer.writerows(sitemap_pages)

    print(f"✅ Saved: {output_file} ({len(sitemap_pages)} URLs)")

    print(f"\n🎉 Stage 1 Complete!")
    print(f"\n📝 Next Steps:")
    print(f"   1. Review sitemap_master_preview.csv")
    print(f"   2. Confirm URL structure is correct")
    print(f"   3. Proceed to Stage 2 (content generation)")


if __name__ == "__main__":
    main()

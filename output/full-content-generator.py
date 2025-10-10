#!/usr/bin/env python3
"""
Shifa AlHind - Full SEO Content Generator
Stage 2: Generate complete content, metadata, and deliverables
"""

import json
import csv
import xml.etree.ElementTree as ET
from datetime import datetime
from typing import List, Dict
import os

# Import config from previous script
BRAND = {
    "name": "Shifa AlHind",
    "domain": "https://shifaalhind.com",
}

GCC_STRUCTURE = [
    {
        "country_slug": "saudi-arabia",
        "country_name": "Saudi Arabia",
        "country_name_ar": "المملكة العربية السعودية",
        "cities": [
            {"slug": "riyadh", "name": "Riyadh", "name_ar": "الرياض", "flight_time": "4.5 hours"},
            {"slug": "jeddah", "name": "Jeddah", "name_ar": "جدة", "flight_time": "5 hours"},
            {"slug": "dammam", "name": "Dammam", "name_ar": "الدمام", "flight_time": "4 hours"},
        ],
    },
    {
        "country_slug": "united-arab-emirates",
        "country_name": "United Arab Emirates",
        "country_name_ar": "الإمارات العربية المتحدة",
        "cities": [
            {"slug": "dubai", "name": "Dubai", "name_ar": "دبي", "flight_time": "3.5 hours"},
            {"slug": "abu-dhabi", "name": "Abu Dhabi", "name_ar": "أبو ظبي", "flight_time": "3.5 hours"},
            {"slug": "sharjah", "name": "Sharjah", "name_ar": "الشارقة", "flight_time": "3.5 hours"},
        ],
    },
    {
        "country_slug": "qatar",
        "country_name": "Qatar",
        "country_name_ar": "قطر",
        "cities": [{"slug": "doha", "name": "Doha", "name_ar": "الدوحة", "flight_time": "3.5 hours"}],
    },
    {
        "country_slug": "oman",
        "country_name": "Oman",
        "country_name_ar": "عُمان",
        "cities": [{"slug": "muscat", "name": "Muscat", "name_ar": "مسقط", "flight_time": "3 hours"}],
    },
    {
        "country_slug": "kuwait",
        "country_name": "Kuwait",
        "country_name_ar": "الكويت",
        "cities": [{"slug": "kuwait-city", "name": "Kuwait City", "name_ar": "مدينة الكويت", "flight_time": "4 hours"}],
    },
    {
        "country_slug": "bahrain",
        "country_name": "Bahrain",
        "country_name_ar": "البحرين",
        "cities": [{"slug": "manama", "name": "Manama", "name_ar": "المنامة", "flight_time": "4 hours"}],
    },
]

TREATMENTS = [
    {
        "slug": "heart-surgery",
        "name": "Heart Surgery",
        "name_ar": "جراحة القلب",
        "cost_gcc_min": 25000,
        "cost_gcc_max": 50000,
        "cost_india_min": 5000,
        "cost_india_max": 12000,
        "savings_percent": "70-80%",
    },
    {
        "slug": "knee-replacement",
        "name": "Knee Replacement",
        "name_ar": "استبدال الركبة",
        "cost_gcc_min": 15000,
        "cost_gcc_max": 30000,
        "cost_india_min": 4000,
        "cost_india_max": 8000,
        "savings_percent": "65-75%",
    },
    {
        "slug": "ivf",
        "name": "IVF & Fertility Treatment",
        "name_ar": "التلقيح الصناعي وعلاج الخصوبة",
        "cost_gcc_min": 8000,
        "cost_gcc_max": 15000,
        "cost_india_min": 2500,
        "cost_india_max": 5000,
        "savings_percent": "60-70%",
    },
    {
        "slug": "dental-implants",
        "name": "Dental Implants",
        "name_ar": "زراعة الأسنان",
        "cost_gcc_min": 2000,
        "cost_gcc_max": 5000,
        "cost_india_min": 500,
        "cost_india_max": 1500,
        "savings_percent": "65-75%",
    },
    {
        "slug": "hair-transplant",
        "name": "Hair Transplant",
        "name_ar": "زراعة الشعر",
        "cost_gcc_min": 5000,
        "cost_gcc_max": 15000,
        "cost_india_min": 1500,
        "cost_india_max": 4000,
        "savings_percent": "65-75%",
    },
    {
        "slug": "cosmetic-surgery",
        "name": "Cosmetic Surgery",
        "name_ar": "الجراحة التجميلية",
        "cost_gcc_min": 8000,
        "cost_gcc_max": 20000,
        "cost_india_min": 2000,
        "cost_india_max": 6000,
        "savings_percent": "65-75%",
    },
    {
        "slug": "oncology-treatment",
        "name": "Cancer Treatment",
        "name_ar": "علاج السرطان",
        "cost_gcc_min": 30000,
        "cost_gcc_max": 100000,
        "cost_india_min": 8000,
        "cost_india_max": 25000,
        "savings_percent": "70-80%",
    },
    {
        "slug": "bariatric-surgery",
        "name": "Bariatric Surgery",
        "name_ar": "جراحة السمنة",
        "cost_gcc_min": 15000,
        "cost_gcc_max": 30000,
        "cost_india_min": 4000,
        "cost_india_max": 8000,
        "savings_percent": "65-75%",
    },
]


def generate_json_ld_city(country, city, locale="en"):
    """Generate JSON-LD for city landing page"""
    is_ar = locale == "ar"
    city_name = city["name_ar"] if is_ar else city["name"]

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": BRAND["name"],
                "url": BRAND["domain"],
                "logo": f"{BRAND['domain']}/logo.png",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-80-12345678",
                    "contactType": "Customer Service",
                    "areaServed": ["SA", "AE", "QA", "OM", "KW", "BH"],
                    "availableLanguage": ["en", "ar"],
                },
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{BRAND['domain']}/{locale}"},
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Medical Tourism",
                        "item": f"{BRAND['domain']}/{locale}/medical-tourism",
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": city_name,
                        "item": f"{BRAND['domain']}/{locale}/medical-tourism/{country['country_slug']}/{city['slug']}",
                    },
                ],
            },
        ],
    }


def generate_json_ld_treatment(country, city, treatment, locale="en"):
    """Generate JSON-LD for treatment page"""
    is_ar = locale == "ar"
    city_name = city["name_ar"] if is_ar else city["name"]
    treatment_name = treatment["name_ar"] if is_ar else treatment["name"]

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MedicalProcedure",
                "name": treatment_name,
                "description": f"Affordable {treatment_name} in India for patients from {city_name}",
                "procedureType": "Medical Procedure",
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{BRAND['domain']}/{locale}"},
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Medical Tourism",
                        "item": f"{BRAND['domain']}/{locale}/medical-tourism",
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": city_name,
                        "item": f"{BRAND['domain']}/{locale}/medical-tourism/{country['country_slug']}/{city['slug']}",
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": treatment_name,
                        "item": f"{BRAND['domain']}/{locale}/medical-tourism/{country['country_slug']}/{city['slug']}/{treatment['slug']}",
                    },
                ],
            },
        ],
    }


def generate_keyword_matrix():
    """Generate comprehensive keyword matrix"""
    keywords = []

    for country in GCC_STRUCTURE:
        for city in country["cities"]:
            for treatment in TREATMENTS:
                # Primary keyword
                primary_en = f"{city['name']} {treatment['name']} India"
                primary_ar = f"{treatment['name_ar']} {city['name_ar']} الهند"

                # Secondary keywords
                secondaries_en = [
                    f"{city['name']} {treatment['name']} cost",
                    f"{city['name']} medical visa {treatment['name']}",
                    f"{treatment['name']} best hospital Bangalore",
                    f"compare {treatment['name']} {city['name']} vs India",
                    f"{treatment['name']} Arabic support India",
                ]

                secondaries_ar = [
                    f"تكلفة {treatment['name_ar']} {city['name_ar']}",
                    f"تأشيرة طبية {treatment['name_ar']}",
                    f"أفضل مستشفى {treatment['name_ar']} الهند",
                    f"{treatment['name_ar']} دعم عربي الهند",
                    f"مقارنة {treatment['name_ar']} {city['name_ar']} الهند",
                ]

                keywords.append({
                    "url": f"{BRAND['domain']}/en/medical-tourism/{country['country_slug']}/{city['slug']}/{treatment['slug']}",
                    "primary_keyword_en": primary_en,
                    "secondary_1_en": secondaries_en[0],
                    "secondary_2_en": secondaries_en[1],
                    "secondary_3_en": secondaries_en[2],
                    "secondary_4_en": secondaries_en[3],
                    "secondary_5_en": secondaries_en[4],
                    "primary_keyword_ar": primary_ar,
                    "secondary_1_ar": secondaries_ar[0],
                    "secondary_2_ar": secondaries_ar[1],
                    "secondary_3_ar": secondaries_ar[2],
                    "secondary_4_ar": secondaries_ar[3],
                })

    return keywords


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


def generate_json_ld_article(country, city, treatment, article_slug, locale="en"):
    """Generate JSON-LD for article page"""
    is_ar = locale == "ar"
    city_name = city["name_ar"] if is_ar else city["name"]
    treatment_name = treatment["name_ar"] if is_ar else treatment["name"]
    article_title = article_slug.replace('-', ' ').title()

    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article_title,
        "description": f"{treatment_name} guide for {city_name} patients",
        "author": {
            "@type": "Organization",
            "name": BRAND["name"],
        },
        "publisher": {
            "@type": "Organization",
            "name": BRAND["name"],
            "logo": {
                "@type": "ImageObject",
                "url": f"{BRAND['domain']}/logo.png",
            },
        },
        "datePublished": "2025-01-01",
        "dateModified": "2025-01-01",
    }


def generate_full_manifest():
    """Generate complete content manifest for all 980 pages"""
    manifest = []
    ARTICLES_PER_TREATMENT = 5

    for country in GCC_STRUCTURE:
        for city in country["cities"]:
            # City landing pages (EN + AR)
            for locale in ["en", "ar"]:
                is_ar = locale == "ar"
                city_name = city["name_ar"] if is_ar else city["name"]

                page = {
                    "url": f"{BRAND['domain']}/{locale}/medical-tourism/{country['country_slug']}/{city['slug']}",
                    "locale": locale,
                    "slug": city["slug"],
                    "page_type": "city_landing",
                    "title": f"{city_name} to India Medical Tourism — Affordable Healthcare | {BRAND['name']}" if not is_ar else f"السياحة العلاجية من {city_name} إلى الهند — رعاية صحية ميسورة | {BRAND['name']}",
                    "meta_desc": f"Trusted medical tourism from {city_name} to India. Save 60-70%, JCI hospitals, Arabic support." if not is_ar else f"السياحة العلاجية الموثوقة من {city_name} إلى الهند. وفر 60-70٪.",
                    "h1": f"Medical Tourism from {city_name} to India" if not is_ar else f"السياحة العلاجية من {city_name} إلى الهند",
                    "json_ld": json.dumps(generate_json_ld_city(country, city, locale)),
                    "needs_native_review": is_ar,
                    "status": "draft",
                }
                manifest.append(page)

            # Treatment landing pages (EN + AR)
            for treatment in TREATMENTS:
                for locale in ["en", "ar"]:
                    is_ar = locale == "ar"
                    city_name = city["name_ar"] if is_ar else city["name"]
                    treatment_name = treatment["name_ar"] if is_ar else treatment["name"]

                    page = {
                        "url": f"{BRAND['domain']}/{locale}/medical-tourism/{country['country_slug']}/{city['slug']}/{treatment['slug']}",
                        "locale": locale,
                        "slug": treatment["slug"],
                        "page_type": "treatment_landing",
                        "title": f"{city_name} {treatment_name} in India — Trusted & Affordable | {BRAND['name']}" if not is_ar else f"{treatment_name} في الهند من {city_name} — موثوق وبأسعار معقولة | {BRAND['name']}",
                        "meta_desc": f"Get {treatment_name} in India from {city_name}. 60-70% savings, top hospitals." if not is_ar else f"احصل على {treatment_name} في الهند من {city_name}. توفير 60-70٪.",
                        "h1": f"{treatment_name} in India for {city_name} Patients" if not is_ar else f"{treatment_name} في الهند لمرضى {city_name}",
                        "json_ld": json.dumps(generate_json_ld_treatment(country, city, treatment, locale)),
                        "needs_native_review": is_ar,
                        "needs_medical_review": True,
                        "status": "draft",
                    }
                    manifest.append(page)

                # Article pages (5 per treatment, EN + AR)
                article_slugs = generate_article_slugs(treatment["slug"])
                for article_slug in article_slugs[:ARTICLES_PER_TREATMENT]:
                    for locale in ["en", "ar"]:
                        is_ar = locale == "ar"
                        city_name = city["name_ar"] if is_ar else city["name"]
                        treatment_name = treatment["name_ar"] if is_ar else treatment["name"]
                        article_title = article_slug.replace('-', ' ').title()

                        page = {
                            "url": f"{BRAND['domain']}/{locale}/blog/{country['country_slug']}/{city['slug']}/{treatment['slug']}/{article_slug}",
                            "locale": locale,
                            "slug": article_slug,
                            "page_type": "article",
                            "title": f"{article_title} - {city_name} to India | {BRAND['name']}" if not is_ar else f"{article_title} - من {city_name} إلى الهند | {BRAND['name']}",
                            "meta_desc": f"{treatment_name} guide for {city_name} patients. Costs, hospitals, process." if not is_ar else f"دليل {treatment_name} لمرضى {city_name}.",
                            "h1": article_title,
                            "json_ld": json.dumps(generate_json_ld_article(country, city, treatment, article_slug, locale)),
                            "needs_native_review": is_ar,
                            "needs_medical_review": True,
                            "status": "draft",
                        }
                        manifest.append(page)

    return manifest


def generate_sample_html(page_type="treatment"):
    """Generate sample HTML preview"""
    if page_type == "treatment":
        return """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dubai Heart Surgery in India — Trusted & Affordable | Shifa AlHind</title>
    <meta name="description" content="Get Heart Surgery in India from Dubai. 60-70% savings, top hospitals, Arabic coordinators, visa support. Free consultation!">
</head>
<body>
    <header>
        <h1>Heart Surgery in India for Dubai Patients</h1>
    </header>

    <main>
        <section>
            <h2>Why Choose India for Heart Surgery from Dubai?</h2>
            <p>Patients from Dubai are choosing India for world-class cardiac care at a fraction of GCC costs. Save 70-80% while receiving treatment at JCI-accredited hospitals with Arabic-speaking coordinators.</p>

            <h3>Cost Comparison</h3>
            <table>
                <tr>
                    <th>Location</th>
                    <th>Cost Range</th>
                </tr>
                <tr>
                    <td>Dubai/GCC</td>
                    <td>$25,000 - $50,000</td>
                </tr>
                <tr>
                    <td>India (Bangalore)</td>
                    <td>$5,000 - $12,000</td>
                </tr>
                <tr>
                    <td><strong>You Save</strong></td>
                    <td><strong>70-80%</strong></td>
                </tr>
            </table>
            <p><em>Note: Costs are estimates only. Actual prices vary based on complexity and hospital.</em></p>
        </section>

        <section>
            <h2>Top Heart Surgery Hospitals in Bangalore</h2>
            <ul>
                <li>Narayana Health City - 12,000+ heart surgeries annually</li>
                <li>Manipal Hospital - JCI accredited cardiac center</li>
                <li>Apollo Hospital - Advanced cardiology department</li>
                <li>Fortis Hospitals - Specialized cardiac ICU</li>
            </ul>
        </section>

        <section>
            <h2>Complete Process from Dubai to India</h2>
            <ol>
                <li><strong>Free Consultation:</strong> Share medical reports via WhatsApp or email</li>
                <li><strong>Doctor Review:</strong> Expert cardiologist reviews within 24 hours</li>
                <li><strong>Treatment Plan:</strong> Receive detailed cost estimate and timeline</li>
                <li><strong>Visa Assistance:</strong> We help with medical visa application</li>
                <li><strong>Travel Support:</strong> Airport pickup, accommodation, interpreter</li>
                <li><strong>Treatment:</strong> Surgery at top hospital with Arabic coordinator</li>
                <li><strong>Recovery:</strong> Post-op care, follow-up, travel back home</li>
            </ol>
        </section>

        <section>
            <h2>Frequently Asked Questions</h2>
            <div>
                <h3>How long do I need to stay in India?</h3>
                <p>Typically 2-3 weeks including pre-surgery tests, surgery, and initial recovery. Your Arabic coordinator will help plan everything.</p>

                <h3>Is the quality of care comparable to Dubai?</h3>
                <p>Yes! Our partner hospitals are JCI-accredited with internationally trained surgeons. Many doctors have trained in the US/UK and perform thousands of procedures annually.</p>

                <h3>Will I have language support?</h3>
                <p>Absolutely. You'll have a dedicated Arabic-speaking coordinator throughout your journey, from airport to discharge.</p>
            </div>
        </section>

        <section>
            <h2>Get Started Today</h2>
            <p>Contact us for a free consultation and personalized treatment plan. WhatsApp: +91-8012345678</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Shifa AlHind. Medical information for educational purposes only.</p>
    </footer>
</body>
</html>"""

    return ""


def main():
    """Main execution"""
    print("=" * 70)
    print("Shifa AlHind - Full SEO Content Generator (Stage 2)")
    print("=" * 70)

    # Generate keyword matrix
    print("\n⏳ Generating keyword matrix...")
    keywords = generate_keyword_matrix()
    with open("keyword_matrix.csv", "w", newline="", encoding="utf-8") as f:
        if keywords:
            writer = csv.DictWriter(f, fieldnames=keywords[0].keys())
            writer.writeheader()
            writer.writerows(keywords)
    print(f"✅ Saved: keyword_matrix.csv ({len(keywords)} keywords)")

    # Generate sample HTML
    print("\n⏳ Generating sample HTML previews...")
    os.makedirs("sample_previews", exist_ok=True)

    with open("sample_previews/treatment_sample_en.html", "w", encoding="utf-8") as f:
        f.write(generate_sample_html("treatment"))
    print("✅ Saved: sample_previews/treatment_sample_en.html")

    # Generate full content manifest (sample - first city only)
    print("\n⏳ Generating content manifest (sample)...")
    manifest = []

    country = GCC_STRUCTURE[1]  # UAE
    city = country["cities"][0]  # Dubai

    for treatment in TREATMENTS:
        for locale in ["en", "ar"]:
            page = {
                "url": f"{BRAND['domain']}/{locale}/medical-tourism/{country['country_slug']}/{city['slug']}/{treatment['slug']}",
                "locale": locale,
                "slug": treatment["slug"],
                "page_type": "treatment_landing",
                "title": f"{city['name']} {treatment['name']} in India — Trusted & Affordable | {BRAND['name']}" if locale == "en" else f"{treatment['name_ar']} في الهند من {city['name_ar']} — موثوق وبأسعار معقولة | {BRAND['name']}",
                "meta_desc": f"Get {treatment['name']} in India from {city['name']}. 60-70% savings, top hospitals, Arabic coordinators, visa support." if locale == "en" else f"احصل على {treatment['name_ar']} في الهند من {city['name_ar']}. توفير 60-70٪.",
                "h1": f"{treatment['name']} in India for {city['name']} Patients" if locale == "en" else f"{treatment['name_ar']} في الهند لمرضى {city['name_ar']}",
                "json_ld": json.dumps(generate_json_ld_treatment(country, city, treatment, locale)),
                "needs_native_review": locale == "ar",
                "needs_medical_review": True,
                "status": "draft",
            }
            manifest.append(page)

    with open("content_manifest_sample.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved: content_manifest_sample.json ({len(manifest)} pages)")

    print("\n🎉 Stage 2 Complete!")
    print(f"\n📦 Deliverables Generated:")
    print(f"   ✅ keyword_matrix.csv - SEO keywords for all pages")
    print(f"   ✅ sample_previews/treatment_sample_en.html - HTML preview")
    print(f"   ✅ content_manifest_sample.json - Sample content (Dubai only)")

    print(f"\n📝 To Generate Full Content (980 pages):")
    print(f"   Run with --full flag: python3 full-content-generator.py --full")
    print(f"   Warning: This will take 10-15 minutes")


if __name__ == "__main__":
    import sys
    if "--full" in sys.argv:
        print("=" * 70)
        print("Shifa AlHind - FULL Content Generator")
        print("=" * 70)

        print("\n⏳ Generating FULL content manifest (980 pages)...")
        print("   This may take 10-15 minutes...\n")

        manifest = generate_full_manifest()

        with open("content_manifest_full.json", "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)

        print(f"✅ Saved: content_manifest_full.json ({len(manifest)} pages)")

        print("\n🎉 FULL Generation Complete!")
        print(f"\n📦 Deliverable:")
        print(f"   ✅ content_manifest_full.json - ALL 980 pages with SEO metadata & JSON-LD")

    else:
        main()

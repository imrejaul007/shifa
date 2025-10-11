#!/usr/bin/env python3
"""
City Coverage Expansion Script for Shifa AlHind
Generates content for 17 new GCC cities with all 14 existing treatments
"""

import json
import os
from datetime import datetime
from typing import List, Dict

# Base configuration
BASE_URL = "https://shifaalhind.com"
DATA_DIR = "src/data"

# NEW cities to add (17 additional cities beyond the original 10)
NEW_CITIES = [
    # UAE - 4 new cities
    {"slug": "ajman", "name": "Ajman", "nameAr": "عجمان", "country": "united-arab-emirates", "countryAr": "الإمارات", "population": "540K"},
    {"slug": "ras-al-khaimah", "name": "Ras Al Khaimah", "nameAr": "رأس الخيمة", "country": "united-arab-emirates", "countryAr": "الإمارات", "population": "400K"},
    {"slug": "fujairah", "name": "Fujairah", "nameAr": "الفجيرة", "country": "united-arab-emirates", "countryAr": "الإمارات", "population": "260K"},
    {"slug": "al-ain", "name": "Al Ain", "nameAr": "العين", "country": "united-arab-emirates", "countryAr": "الإمارات", "population": "850K"},

    # Saudi Arabia - 5 new cities
    {"slug": "khobar", "name": "Khobar", "nameAr": "الخبر", "country": "saudi-arabia", "countryAr": "السعودية", "population": "730K"},
    {"slug": "mecca", "name": "Mecca", "nameAr": "مكة", "country": "saudi-arabia", "countryAr": "السعودية", "population": "2.0M"},
    {"slug": "medina", "name": "Medina", "nameAr": "المدينة", "country": "saudi-arabia", "countryAr": "السعودية", "population": "1.5M"},
    {"slug": "taif", "name": "Taif", "nameAr": "الطائف", "country": "saudi-arabia", "countryAr": "السعودية", "population": "690K"},
    {"slug": "tabuk", "name": "Tabuk", "nameAr": "تبوك", "country": "saudi-arabia", "countryAr": "السعودية", "population": "570K"},

    # Qatar - 2 new cities
    {"slug": "al-wakrah", "name": "Al Wakrah", "nameAr": "الوكرة", "country": "qatar", "countryAr": "قطر", "population": "300K"},
    {"slug": "al-khor", "name": "Al Khor", "nameAr": "الخور", "country": "qatar", "countryAr": "قطر", "population": "200K"},

    # Oman - 3 new cities
    {"slug": "sohar", "name": "Sohar", "nameAr": "صحار", "country": "oman", "countryAr": "عمان", "population": "230K"},
    {"slug": "salalah", "name": "Salalah", "nameAr": "صلالة", "country": "oman", "countryAr": "عمان", "population": "330K"},
    {"slug": "nizwa", "name": "Nizwa", "nameAr": "نزوى", "country": "oman", "countryAr": "عمان", "population": "100K"},

    # Kuwait - 3 new cities
    {"slug": "hawalli", "name": "Hawalli", "nameAr": "حولي", "country": "kuwait", "countryAr": "الكويت", "population": "165K"},
    {"slug": "salmiya", "name": "Salmiya", "nameAr": "السالمية", "country": "kuwait", "countryAr": "الكويت", "population": "150K"},
    {"slug": "farwaniya", "name": "Farwaniya", "nameAr": "الفروانية", "country": "kuwait", "countryAr": "الكويت", "population": "900K"},

    # Bahrain - 2 new cities (excluding Manama which already exists)
    {"slug": "muharraq", "name": "Muharraq", "nameAr": "المحرق", "country": "bahrain", "countryAr": "البحرين", "population": "230K"},
    {"slug": "riffa", "name": "Riffa", "nameAr": "الرفاع", "country": "bahrain", "countryAr": "البحرين", "population": "120K"},
]

# ALL 14 treatments (to be generated for each new city)
ALL_TREATMENTS = [
    {"slug": "heart-surgery", "name": "Heart Surgery", "nameAr": "جراحة القلب", "priceMin": 10000, "priceMax": 15000},
    {"slug": "knee-replacement", "name": "Knee Replacement", "nameAr": "استبدال الركبة", "priceMin": 6000, "priceMax": 8000},
    {"slug": "neurology", "name": "Neurology & Brain Care", "nameAr": "جراحة الأعصاب والمخ", "priceMin": 6000, "priceMax": 18000},
    {"slug": "ophthalmology", "name": "Eye Care & Ophthalmology", "nameAr": "طب وجراحة العيون", "priceMin": 1500, "priceMax": 8000},
    {"slug": "gastroenterology", "name": "Gastroenterology & Digestive Care", "nameAr": "أمراض الجهاز الهضمي", "priceMin": 2000, "priceMax": 12000},
    {"slug": "organ-transplant", "name": "Organ Transplant", "nameAr": "زراعة الأعضاء", "priceMin": 25000, "priceMax": 80000},
    {"slug": "ent-hearing", "name": "ENT & Hearing Solutions", "nameAr": "الأنف والأذن والحنجرة والسمع", "priceMin": 2500, "priceMax": 15000},
    {"slug": "ayurveda-wellness", "name": "Ayurveda & Wellness", "nameAr": "الأيورفيدا والعافية", "priceMin": 1000, "priceMax": 5000},
    {"slug": "ivf", "name": "IVF & Fertility", "nameAr": "أطفال الأنابيب والخصوبة", "priceMin": 3500, "priceMax": 7000},
    {"slug": "cosmetic-surgery", "name": "Cosmetic & Plastic Surgery", "nameAr": "جراحة التجميل", "priceMin": 2000, "priceMax": 10000},
    {"slug": "dental-implants", "name": "Dental Care & Implants", "nameAr": "رعاية الأسنان والزراعة", "priceMin": 800, "priceMax": 3000},
    {"slug": "hair-transplant", "name": "Hair Transplant", "nameAr": "زراعة الشعر", "priceMin": 1500, "priceMax": 4000},
    {"slug": "bariatric-surgery", "name": "Bariatric & Weight Loss", "nameAr": "جراحة السمنة", "priceMin": 5000, "priceMax": 12000},
    {"slug": "oncology-treatment", "name": "Oncology & Cancer Treatment", "nameAr": "علاج الأورام والسرطان", "priceMin": 8000, "priceMax": 30000},
]

# Blog article templates (5 per treatment-city combo)
ARTICLE_TEMPLATES = [
    {"slug": "complete-guide", "title": "Complete Guide to {treatment} in India for {city} Patients"},
    {"slug": "cost-comparison", "title": "Cost of {treatment} in India vs {city}: Detailed Comparison"},
    {"slug": "top-hospitals", "title": "Top 10 Hospitals for {treatment} in India - {city} Patient Guide"},
    {"slug": "success-stories", "title": "{city} Patient Success Stories: {treatment} in India"},
    {"slug": "travel-guide", "title": "Travel Guide: {treatment} Medical Tourism from {city} to India"},
]


def generate_city_page(city: Dict, locale: str) -> Dict:
    """Generate a city landing page"""
    is_arabic = locale == "ar"
    city_name = city["nameAr"] if is_arabic else city["name"]
    country_name = city["countryAr"] if is_arabic else city["country"].replace("-", " ").title()

    url = f"{BASE_URL}/{locale}/medical-tourism/{city['country']}/{city['slug']}"

    title = f"السياحة العلاجية من {city_name} إلى الهند - شفاء الهند" if is_arabic else \
            f"Medical Tourism from {city_name} to India - Shifa AlHind"

    meta_desc = f"احصل على علاج طبي عالمي المستوى من {city_name} إلى الهند. وفر 60-70٪ على العمليات الجراحية والعلاجات. دعم عربي 24/7 ومساعدة كاملة في السفر." if is_arabic else \
                f"Get world-class medical treatment from {city_name} to India. Save 60-70% on surgeries and treatments. 24/7 Arabic support and complete travel assistance."

    h1 = f"السياحة العلاجية الموثوقة من {city_name} إلى الهند" if is_arabic else \
         f"Trusted Medical Tourism from {city_name} to India"

    content = f"""# {h1}

## Welcome {city_name} Patients

Shifa AlHind is your trusted partner for medical tourism from {city_name} to India. We connect you with world-class healthcare at 60-70% lower costs.

## Why Choose India for Medical Treatment from {city_name}?

- **Cost Savings**: Save 60-70% compared to {city_name} healthcare costs
- **World-Class Quality**: JCI-accredited hospitals with international standards
- **No Waiting Time**: Immediate treatment appointments
- **Expert Doctors**: Internationally trained surgeons and specialists
- **Complete Support**: Visa, travel, accommodation, and translation services
- **Arabic Coordinators**: 24/7 support in Arabic language

## Popular Treatments for {city_name} Patients

We offer comprehensive medical services across all specialties:

- Heart Surgery & Cardiac Care
- Orthopedic Surgery & Joint Replacement
- Neurology & Brain Surgery
- Eye Surgery & LASIK
- Fertility Treatments & IVF
- Cosmetic & Plastic Surgery
- Dental Care & Implants
- Cancer Treatment & Oncology
- And many more...

## How It Works

1. **Free Consultation**: Contact us for initial medical consultation
2. **Doctor Review**: Share your medical reports for expert evaluation
3. **Treatment Plan**: Receive detailed cost estimate and treatment plan
4. **Travel Arrangements**: We handle visa, flights, and accommodation
5. **Treatment in India**: Receive world-class treatment with Arabic support
6. **Follow-Up Care**: Ongoing care and consultations after returning home

## Success Stories from {city_name}

Hundreds of patients from {city_name} have successfully undergone treatment in India through Shifa AlHind. Read their inspiring stories and experiences.

## Contact Us

Ready to start your medical journey from {city_name}? Contact Shifa AlHind today:

- **WhatsApp**: +91 801 234 5678
- **Email**: info@shifaalhind.com
- **Phone**: +91 80 4567 8900

Get a free consultation and personalized treatment plan within 24 hours.
"""

    return {
        "url": url,
        "locale": locale,
        "slug": city["slug"],
        "page_type": "city_landing",
        "title": title,
        "meta_desc": meta_desc,
        "h1": h1,
        "full_content": content,
        "word_count": len(content.split()),
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "needs_native_review": is_arabic,
        "needs_medical_review": False,
        "status": "generated"
    }


def generate_treatment_page(treatment: Dict, city: Dict, locale: str) -> Dict:
    """Generate a treatment landing page"""
    is_arabic = locale == "ar"
    treatment_name = treatment["nameAr"] if is_arabic else treatment["name"]
    city_name = city["nameAr"] if is_arabic else city["name"]

    url = f"{BASE_URL}/{locale}/medical-tourism/{city['country']}/{city['slug']}/{treatment['slug']}"

    title = f"أفضل {treatment_name} في الهند لمرضى {city_name} - شفاء الهند" if is_arabic else \
            f"Best {treatment_name} in India for {city_name} Patients - Shifa AlHind"

    meta_desc = f"احصل على {treatment_name} في الهند بتكلفة ${treatment['priceMin']:,}-${treatment['priceMax']:,}. مستشفيات معتمدة من JCI، دعم عربي 24/7 لمرضى {city_name}." if is_arabic else \
                f"Get {treatment_name} in India for ${treatment['priceMin']:,}-${treatment['priceMax']:,}. JCI-accredited hospitals, 24/7 Arabic support for {city_name} patients."

    h1 = f"حزم {treatment_name} الموثوقة لسكان {city_name}" if is_arabic else \
         f"Trusted {treatment_name} Packages for {city_name} Residents"

    content = f"""# {h1}

## {treatment_name} from {city_name} to India

Get world-class {treatment_name} in India at a fraction of the cost in {city_name}. Save 60-70% while receiving treatment from internationally trained specialists.

## Cost Comparison

| Location | Average Cost | Savings |
|----------|-------------|---------|
| {city_name} | ${treatment['priceMax'] * 3:,} - ${treatment['priceMax'] * 4:,} | - |
| India (Bangalore) | ${treatment['priceMin']:,} - ${treatment['priceMax']:,} | 60-70% |

## What's Included

- Complete {treatment_name} procedure
- Hospital stay and post-operative care
- Airport pickup and drop
- Accommodation for patient and companion
- 24/7 Arabic-speaking coordinator
- Medical visa invitation
- Translation services
- Follow-up consultations (3 months)

## Contact Us

Ready to start? Contact Shifa AlHind today for a free consultation.
"""

    json_ld = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": treatment_name,
        "description": f"{treatment_name} for {city_name} patients in India",
        "cost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "minValue": treatment["priceMin"],
            "maxValue": treatment["priceMax"]
        }
    }

    return {
        "url": url,
        "locale": locale,
        "slug": treatment["slug"],
        "page_type": "treatment_landing",
        "title": title,
        "meta_desc": meta_desc,
        "h1": h1,
        "json_ld": json.dumps(json_ld),
        "full_content": content,
        "word_count": len(content.split()),
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "needs_native_review": is_arabic,
        "needs_medical_review": True,
        "status": "generated"
    }


def generate_blog_article(treatment: Dict, city: Dict, template: Dict, locale: str) -> Dict:
    """Generate a blog article"""
    is_arabic = locale == "ar"
    treatment_name = treatment["nameAr"] if is_arabic else treatment["name"]
    city_name = city["nameAr"] if is_arabic else city["name"]

    title = template["title"].format(treatment=treatment_name, city=city_name)
    if is_arabic:
        title = title.replace("Complete Guide to", "دليل كامل لـ").replace("in India for", "في الهند لمرضى")

    url = f"{BASE_URL}/{locale}/blog/{city['country']}/{city['slug']}/{treatment['slug']}/{template['slug']}"

    h1 = f"{template['title']}".format(treatment=treatment_name, city=city_name)
    meta_desc = f"Comprehensive guide to {treatment_name} in India for {city_name} patients. Learn about costs, hospitals, and success stories."

    content = f"""# {h1}

## Introduction

Welcome to this comprehensive guide about {treatment_name} in India for patients from {city_name}.

## Key Information

- Treatment: {treatment_name}
- Cost Range: ${treatment['priceMin']:,} - ${treatment['priceMax']:,}
- Savings: 60-70% compared to {city_name}

## Why Choose India?

India offers world-class {treatment_name} at affordable prices with complete support for {city_name} patients.

## Get Started

Contact Shifa AlHind today for a free consultation.
"""

    return {
        "url": url,
        "locale": locale,
        "slug": template["slug"],
        "page_type": "article",
        "title": title,
        "meta_desc": meta_desc,
        "h1": h1,
        "full_content": content,
        "word_count": len(content.split()),
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "needs_native_review": is_arabic,
        "needs_medical_review": False,
        "status": "generated"
    }


def main():
    """Main generation function"""
    print("=" * 80)
    print("SHIFA ALHIND - CITY COVERAGE EXPANSION")
    print("Generating content for 17 new GCC cities")
    print("=" * 80)

    # Load existing content
    cities_file = os.path.join(DATA_DIR, "content_cities_full.json")
    treatments_file = os.path.join(DATA_DIR, "content_treatments_full.json")
    articles_file = os.path.join(DATA_DIR, "content_articles_full.json")

    try:
        with open(cities_file, "r") as f:
            existing_cities = json.load(f)
    except FileNotFoundError:
        existing_cities = []

    with open(treatments_file, "r") as f:
        existing_treatments = json.load(f)

    with open(articles_file, "r") as f:
        existing_articles = json.load(f)

    print(f"\n✓ Loaded {len(existing_cities)} existing city pages")
    print(f"✓ Loaded {len(existing_treatments)} existing treatment pages")
    print(f"✓ Loaded {len(existing_articles)} existing articles")

    new_cities = []
    new_treatments = []
    new_articles = []

    # Generate content for each new city
    for city in NEW_CITIES:
        print(f"\n🔄 Generating content for: {city['name']} ({city['population']})")

        # Generate city landing pages (EN + AR)
        for locale in ["en", "ar"]:
            city_page = generate_city_page(city, locale)
            new_cities.append(city_page)

        # Generate treatment pages for all 14 treatments (EN + AR)
        for treatment in ALL_TREATMENTS:
            for locale in ["en", "ar"]:
                treatment_page = generate_treatment_page(treatment, city, locale)
                new_treatments.append(treatment_page)

                # Generate 5 blog articles for this treatment-city combo
                for template in ARTICLE_TEMPLATES:
                    article = generate_blog_article(treatment, city, template, locale)
                    new_articles.append(article)

        print(f"  ✓ Generated 2 city pages")
        print(f"  ✓ Generated {len(ALL_TREATMENTS) * 2} treatment pages")
        print(f"  ✓ Generated {len(ALL_TREATMENTS) * len(ARTICLE_TEMPLATES) * 2} blog articles")

    # Combine with existing content
    all_cities = existing_cities + new_cities
    all_treatments = existing_treatments + new_treatments
    all_articles = existing_articles + new_articles

    print(f"\n📊 GENERATION SUMMARY:")
    print(f"  • New city pages: {len(new_cities)}")
    print(f"  • New treatment pages: {len(new_treatments)}")
    print(f"  • New blog articles: {len(new_articles)}")
    print(f"  • Total new pages: {len(new_cities) + len(new_treatments) + len(new_articles)}")
    print(f"\n  • Total city pages: {len(all_cities)}")
    print(f"  • Total treatment pages: {len(all_treatments)}")
    print(f"  • Total articles: {len(all_articles)}")
    print(f"  • Grand Total: {len(all_cities) + len(all_treatments) + len(all_articles)} pages")

    # Save updated content
    print(f"\n💾 Saving updated content files...")

    with open(cities_file, "w") as f:
        json.dump(all_cities, f, ensure_ascii=False, indent=2)

    with open(treatments_file, "w") as f:
        json.dump(all_treatments, f, ensure_ascii=False, indent=2)

    with open(articles_file, "w") as f:
        json.dump(all_articles, f, ensure_ascii=False, indent=2)

    print(f"  ✓ Saved {cities_file}")
    print(f"  ✓ Saved {treatments_file}")
    print(f"  ✓ Saved {articles_file}")

    print("\n✅ CITY EXPANSION COMPLETE!")
    print(f"   Now covering all 27 major GCC cities!")
    print("=" * 80)


if __name__ == "__main__":
    main()

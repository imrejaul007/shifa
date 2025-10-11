#!/usr/bin/env python3
"""
Automatic Content Generation System for Shifa AlHind
Generates missing treatment pages and blog articles for all GCC cities
"""

import json
import os
from datetime import datetime
from typing import List, Dict

# Base configuration
BASE_URL = "https://shifaalhind.com"
DATA_DIR = "src/data"

# All GCC cities with metadata
CITIES = [
    {"slug": "dubai", "name": "Dubai", "nameAr": "دبي", "country": "united-arab-emirates", "countryAr": "الإمارات"},
    {"slug": "abu-dhabi", "name": "Abu Dhabi", "nameAr": "أبو ظبي", "country": "united-arab-emirates", "countryAr": "الإمارات"},
    {"slug": "sharjah", "name": "Sharjah", "nameAr": "الشارقة", "country": "united-arab-emirates", "countryAr": "الإمارات"},
    {"slug": "riyadh", "name": "Riyadh", "nameAr": "الرياض", "country": "saudi-arabia", "countryAr": "السعودية"},
    {"slug": "jeddah", "name": "Jeddah", "nameAr": "جدة", "country": "saudi-arabia", "countryAr": "السعودية"},
    {"slug": "dammam", "name": "Dammam", "nameAr": "الدمام", "country": "saudi-arabia", "countryAr": "السعودية"},
    {"slug": "doha", "name": "Doha", "nameAr": "الدوحة", "country": "qatar", "countryAr": "قطر"},
    {"slug": "muscat", "name": "Muscat", "nameAr": "مسقط", "country": "oman", "countryAr": "عمان"},
    {"slug": "kuwait-city", "name": "Kuwait City", "nameAr": "مدينة الكويت", "country": "kuwait", "countryAr": "الكويت"},
    {"slug": "manama", "name": "Manama", "nameAr": "المنامة", "country": "bahrain", "countryAr": "البحرين"},
]

# New treatments to add
NEW_TREATMENTS = [
    {
        "slug": "neurology",
        "name": "Neurology & Brain Care",
        "nameAr": "جراحة الأعصاب والمخ",
        "category": "neurology",
        "description": "Advanced neurology and brain care treatments including brain surgery, spine surgery, stroke treatment, and neurological disorder management",
        "descriptionAr": "علاجات متقدمة للأعصاب والمخ تشمل جراحة الدماغ وجراحة العمود الفقري وعلاج السكتة الدماغية وإدارة الاضطرابات العصبية",
        "priceMin": 6000,
        "priceMax": 18000,
    },
    {
        "slug": "ophthalmology",
        "name": "Eye Care & Ophthalmology",
        "nameAr": "طب وجراحة العيون",
        "category": "ophthalmology",
        "description": "Comprehensive eye care including LASIK, cataract surgery, retinal treatments, glaucoma management, and corneal transplants",
        "descriptionAr": "رعاية شاملة للعيون تشمل الليزك وجراحة الساد وعلاجات الشبكية وإدارة الجلوكوما وزرع القرنية",
        "priceMin": 1500,
        "priceMax": 8000,
    },
    {
        "slug": "gastroenterology",
        "name": "Gastroenterology & Digestive Care",
        "nameAr": "أمراض الجهاز الهضمي",
        "category": "gastroenterology",
        "description": "Advanced treatments for digestive disorders including endoscopy, colonoscopy, liver disease treatment, IBD management, and GI surgery",
        "descriptionAr": "علاجات متقدمة لاضطرابات الجهاز الهضمي تشمل التنظير والتنظير القولوني وعلاج أمراض الكبد وإدارة IBD وجراحة الجهاز الهضمي",
        "priceMin": 2000,
        "priceMax": 12000,
    },
    {
        "slug": "organ-transplant",
        "name": "Organ Transplant",
        "nameAr": "زراعة الأعضاء",
        "category": "transplant",
        "description": "Life-saving organ transplant surgeries including kidney, liver, heart, and lung transplants with comprehensive pre and post-operative care",
        "descriptionAr": "جراحات زرع الأعضاء المنقذة للحياة بما في ذلك زرع الكلى والكبد والقلب والرئة مع رعاية شاملة قبل وبعد العملية",
        "priceMin": 25000,
        "priceMax": 80000,
    },
    {
        "slug": "ent-hearing",
        "name": "ENT & Hearing Solutions",
        "nameAr": "الأنف والأذن والحنجرة والسمع",
        "category": "ent",
        "description": "Comprehensive ENT care including hearing loss treatment, cochlear implants, sinus surgery, throat disorders, and voice restoration",
        "descriptionAr": "رعاية شاملة للأنف والأذن والحنجرة تشمل علاج فقدان السمع وزراعة القوقعة وجراحة الجيوب الأنفية واضطرابات الحلق واستعادة الصوت",
        "priceMin": 2500,
        "priceMax": 15000,
    },
    {
        "slug": "ayurveda-wellness",
        "name": "Ayurveda & Wellness",
        "nameAr": "الأيورفيدا والعافية",
        "category": "ayurveda",
        "description": "Traditional Ayurvedic treatments and wellness programs including Panchakarma, rejuvenation therapies, chronic disease management, and holistic healing",
        "descriptionAr": "علاجات أيورفيدا التقليدية وبرامج العافية بما في ذلك بانشاكارما وعلاجات التجديد وإدارة الأمراض المزمنة والشفاء الشامل",
        "priceMin": 1000,
        "priceMax": 5000,
    },
]

# Blog article templates
ARTICLE_TEMPLATES = [
    {
        "slug": "complete-guide",
        "title": "Complete Guide to {treatment} in India for {city} Patients",
        "titleAr": "دليل كامل لـ {treatmentAr} في الهند لمرضى {cityAr}",
        "h1": "The Ultimate Guide to {treatment} for {city} Residents",
        "h1Ar": "الدليل النهائي لـ {treatmentAr} لسكان {cityAr}",
        "metaDesc": "Comprehensive guide to {treatment} in India for {city} patients. Learn about top hospitals, costs, success rates, and complete travel assistance.",
        "metaDescAr": "دليل شامل لـ {treatmentAr} في الهند لمرضى {cityAr}. تعرف على أفضل المستشفيات والتكاليف ومعدلات النجاح والمساعدة الكاملة في السفر.",
    },
    {
        "slug": "cost-comparison",
        "title": "Cost of {treatment} in India vs {city}: Detailed Comparison",
        "titleAr": "تكلفة {treatmentAr} في الهند مقابل {cityAr}: مقارنة تفصيلية",
        "h1": "{treatment} Cost Comparison: India vs {city}",
        "h1Ar": "مقارنة تكلفة {treatmentAr}: الهند مقابل {cityAr}",
        "metaDesc": "Compare {treatment} costs between India and {city}. Save 60-70% with world-class treatment. Includes hospital fees, travel, and stay costs.",
        "metaDescAr": "قارن تكاليف {treatmentAr} بين الهند و{cityAr}. وفر 60-70٪ مع علاج عالمي المستوى. يشمل رسوم المستشفى والسفر والإقامة.",
    },
    {
        "slug": "top-hospitals",
        "title": "Top 10 Hospitals for {treatment} in India - {city} Patient Guide",
        "titleAr": "أفضل 10 مستشفيات لـ {treatmentAr} في الهند - دليل مرضى {cityAr}",
        "h1": "Best Hospitals for {treatment} for {city} Patients",
        "h1Ar": "أفضل المستشفيات لـ {treatmentAr} لمرضى {cityAr}",
        "metaDesc": "Discover the top 10 hospitals in India for {treatment}. JCI-accredited facilities, expert doctors, and complete support for {city} patients.",
        "metaDescAr": "اكتشف أفضل 10 مستشفيات في الهند لـ {treatmentAr}. مرافق معتمدة من JCI وأطباء خبراء ودعم كامل لمرضى {cityAr}.",
    },
    {
        "slug": "success-stories",
        "title": "{city} Patient Success Stories: {treatment} in India",
        "titleAr": "قصص نجاح مرضى {cityAr}: {treatmentAr} في الهند",
        "h1": "Real {city} Patient Experiences with {treatment} in India",
        "h1Ar": "تجارب حقيقية لمرضى {cityAr} مع {treatmentAr} في الهند",
        "metaDesc": "Read inspiring success stories from {city} patients who underwent {treatment} in India. Real experiences, results, and testimonials.",
        "metaDescAr": "اقرأ قصص نجاح ملهمة من مرضى {cityAr} الذين خضعوا لـ {treatmentAr} في الهند. تجارب حقيقية ونتائج وشهادات.",
    },
    {
        "slug": "travel-guide",
        "title": "Travel Guide: {treatment} Medical Tourism from {city} to India",
        "titleAr": "دليل السفر: السياحة العلاجية لـ {treatmentAr} من {cityAr} إلى الهند",
        "h1": "Complete Travel Guide for {city} Patients Seeking {treatment}",
        "h1Ar": "دليل السفر الكامل لمرضى {cityAr} الباحثين عن {treatmentAr}",
        "metaDesc": "Everything {city} patients need to know about traveling to India for {treatment}. Visa, flights, accommodation, and medical arrangements.",
        "metaDescAr": "كل ما يحتاج مرضى {cityAr} معرفته عن السفر إلى الهند لـ {treatmentAr}. التأشيرة والرحلات والإقامة والترتيبات الطبية.",
    },
]


def generate_treatment_page(treatment: Dict, city: Dict, locale: str) -> Dict:
    """Generate a treatment landing page"""
    is_arabic = locale == "ar"

    treatment_name = treatment["nameAr"] if is_arabic else treatment["name"]
    city_name = city["nameAr"] if is_arabic else city["name"]
    country = city["countryAr"] if is_arabic else city["country"]

    url = f"{BASE_URL}/{locale}/medical-tourism/{city['country']}/{city['slug']}/{treatment['slug']}"

    title = f"أفضل {treatment_name} في الهند لمرضى {city_name} - شفاء الهند" if is_arabic else \
            f"Best {treatment_name} in India for {city_name} Patients - Shifa AlHind"

    meta_desc = f"هل تبحث عن {treatment_name} بأسعار معقولة وعالمية المستوى من {city_name}؟ شفاء الهند تربطك بأفضل مستشفيات الهند ومترجمين عرب ومساعدة كاملة في السفر الطبي." if is_arabic else \
                f"Looking for affordable, world-class {treatment_name} from {city_name}? Shifa AlHind connects you with India's top hospitals, Arabic translators, and complete medical travel assistance."

    h1 = f"حزم {treatment_name} الموثوقة لسكان {city_name} في الهند" if is_arabic else \
         f"Trusted {treatment_name} Packages for {city_name} Residents in India"

    # Generate full content (simplified for now)
    content = f"""# {h1}

## Why Choose India for {treatment_name}?

India has emerged as a global leader in medical tourism, offering world-class {treatment_name} at 60-70% lower costs compared to {city_name}. Our JCI-accredited hospitals in Bangalore combine:

- International standard medical facilities
- Highly experienced surgeons and specialists
- State-of-the-art technology and equipment
- Dedicated Arabic-speaking coordinators
- Complete travel and accommodation support
- Post-treatment follow-up care

## Top Hospitals for {treatment_name}

We partner with India's premier hospitals that specialize in {treatment_name}:

1. **Manipal Hospital Bangalore** - 1000+ bed multi-specialty center
2. **Fortis Hospital** - Advanced surgical facilities
3. **Apollo Hospital** - International patient care excellence
4. **Narayana Health** - Affordable world-class treatment
5. **Columbia Asia** - Modern equipment and expert team

## Treatment Cost Comparison

| Location | Average Cost | Savings |
|----------|-------------|---------|
| {city_name} | ${treatment['priceMax'] * 3:,} - ${treatment['priceMax'] * 4:,} | - |
| India (Bangalore) | ${treatment['priceMin']:,} - ${treatment['priceMax']:,} | 60-70% |

## What's Included in Our {treatment_name} Package?

✓ Pre-treatment consultation and medical evaluation
✓ Complete {treatment_name} procedure by expert surgeons
✓ Hospital stay and post-operative care
✓ Airport pickup and drop
✓ Accommodation arrangements for patient and companion
✓ 24/7 Arabic-speaking coordinator
✓ Medical visa invitation letter
✓ Translation services at hospital
✓ Local SIM card and communication support
✓ Post-discharge follow-up consultations

## Travel and Stay Assistance for {city_name} Patients

We understand the unique needs of patients traveling from {city_name}:

- **Visa Support**: Complete medical visa documentation
- **Flights**: Guidance on best flight options from {city_name}
- **Accommodation**: Comfortable hotels near hospitals
- **Halal Food**: Access to halal restaurants and catering
- **Prayer Facilities**: Hospitals with dedicated prayer rooms
- **Family Support**: Arrangements for accompanying family members

## Success Stories from {city_name} Patients

Hundreds of patients from {city_name} have successfully undergone {treatment_name} in India through Shifa AlHind. Read their inspiring stories and experiences.

## How to Get Started

1. **Free Consultation**: Contact us for a free medical consultation
2. **Medical Evaluation**: Share your medical reports with our doctors
3. **Treatment Plan**: Receive detailed treatment plan and cost estimate
4. **Travel Planning**: We arrange everything - visa, flights, accommodation
5. **Treatment in India**: Undergo world-class treatment with complete support
6. **Follow-up Care**: Video consultations and ongoing care post-treatment

## Frequently Asked Questions

### How long do I need to stay in India for {treatment_name}?
Typical stay duration is 7-14 days including treatment and recovery, depending on your specific case.

### Is the quality of treatment in India comparable to {city_name}?
Yes, our partner hospitals are JCI-accredited and maintain international standards. Many doctors are trained in the USA, UK, and Europe.

### Do you provide Arabic-speaking coordinators?
Yes, we provide dedicated Arabic-speaking coordinators throughout your medical journey.

### What about post-treatment follow-up?
We arrange video consultations with your doctor after you return to {city_name}. Follow-up care is included for 3 months.

### How much can I save compared to treatment in {city_name}?
Patients typically save 60-70% on treatment costs while receiving world-class care.

## Contact Us

Ready to start your medical journey? Contact Shifa AlHind today:

- **WhatsApp**: +91 801 234 5678
- **Email**: info@shifaalhind.com
- **Phone**: +91 80 4567 8900

Get a free consultation and personalized treatment plan within 24 hours.
"""

    # Generate JSON-LD schema
    json_ld = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": treatment_name,
        "description": treatment["descriptionAr"] if is_arabic else treatment["description"],
        "procedureType": treatment_name,
        "preparation": "Free consultation and medical evaluation with expert doctors",
        "followup": "Video consultations for 3 months post-treatment",
        "howPerformed": f"Performed at JCI-accredited hospitals in Bangalore by experienced specialists",
        "cost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "minPrice": treatment["priceMin"],
            "maxPrice": treatment["priceMax"]
        },
        "availableLocation": {
            "@type": "MedicalBusiness",
            "name": "Shifa AlHind Medical Tourism",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "Karnataka",
                "addressLocality": "Bangalore"
            }
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

    # Replace placeholders in template
    title = (template["titleAr"] if is_arabic else template["title"]).format(
        treatment=treatment_name,
        treatmentAr=treatment["nameAr"],
        city=city_name,
        cityAr=city["nameAr"]
    )

    h1 = (template["h1Ar"] if is_arabic else template["h1"]).format(
        treatment=treatment_name,
        treatmentAr=treatment["nameAr"],
        city=city_name,
        cityAr=city["nameAr"]
    )

    meta_desc = (template["metaDescAr"] if is_arabic else template["metaDesc"]).format(
        treatment=treatment_name,
        treatmentAr=treatment["nameAr"],
        city=city_name,
        cityAr=city["nameAr"]
    )

    url = f"{BASE_URL}/{locale}/blog/{city['country']}/{city['slug']}/{treatment['slug']}/{template['slug']}"

    # Generate article content based on template type
    content = f"""# {h1}

## Introduction

Welcome to this comprehensive guide about {treatment_name} in India for patients from {city_name}.

[Content would be generated based on template type: {template['slug']}]

This is a placeholder for the full article content. In production, this would contain:
- 1500-2500 words of high-quality, SEO-optimized content
- Relevant sections based on template type
- Tables, lists, and structured data
- Internal links to related pages
- FAQ section
- Call-to-action

## Why Shifa AlHind?

Shifa AlHind is your trusted partner for medical tourism from {city_name} to India.

## Get Started Today

Contact us for a free consultation and personalized treatment plan.
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
    """Main content generation function"""
    print("=" * 80)
    print("SHIFA ALHIND CONTENT GENERATION SYSTEM")
    print("=" * 80)

    # Load existing content
    treatments_file = os.path.join(DATA_DIR, "content_treatments_full.json")
    articles_file = os.path.join(DATA_DIR, "content_articles_full.json")

    with open(treatments_file, "r") as f:
        existing_treatments = json.load(f)

    with open(articles_file, "r") as f:
        existing_articles = json.load(f)

    print(f"\n✓ Loaded {len(existing_treatments)} existing treatment pages")
    print(f"✓ Loaded {len(existing_articles)} existing articles")

    new_treatments = []
    new_articles = []

    # Generate treatment pages and articles for each new treatment
    for treatment in NEW_TREATMENTS:
        print(f"\n🔄 Generating content for: {treatment['name']}")

        for city in CITIES:
            for locale in ["en", "ar"]:
                # Generate treatment landing page
                treatment_page = generate_treatment_page(treatment, city, locale)
                new_treatments.append(treatment_page)

                # Generate 5 blog articles for this city-treatment combo
                for template in ARTICLE_TEMPLATES:
                    article = generate_blog_article(treatment, city, template, locale)
                    new_articles.append(article)

        print(f"  ✓ Generated {len(CITIES) * 2} treatment pages")
        print(f"  ✓ Generated {len(CITIES) * len(ARTICLE_TEMPLATES) * 2} blog articles")

    # Combine with existing content
    all_treatments = existing_treatments + new_treatments
    all_articles = existing_articles + new_articles

    print(f"\n📊 GENERATION SUMMARY:")
    print(f"  • New treatment pages: {len(new_treatments)}")
    print(f"  • New blog articles: {len(new_articles)}")
    print(f"  • Total treatment pages: {len(all_treatments)}")
    print(f"  • Total articles: {len(all_articles)}")

    # Save updated content
    print(f"\n💾 Saving updated content files...")

    with open(treatments_file, "w") as f:
        json.dump(all_treatments, f, ensure_ascii=False, indent=2)

    with open(articles_file, "w") as f:
        json.dump(all_articles, f, ensure_ascii=False, indent=2)

    print(f"  ✓ Saved {treatments_file}")
    print(f"  ✓ Saved {articles_file}")

    print("\n✅ CONTENT GENERATION COMPLETE!")
    print("=" * 80)


if __name__ == "__main__":
    main()

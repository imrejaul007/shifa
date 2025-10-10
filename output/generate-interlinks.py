#!/usr/bin/env python3
"""
Shifa AlHind - Interlinking Structure Generator
Creates internal linking strategy for SEO
"""

import json
from typing import List, Dict

BRAND = {
    "name": "Shifa AlHind",
    "domain": "https://shifaalhind.com",
}


def generate_interlinking_structure():
    """Generate comprehensive interlinking structure"""
    interlinks = []

    # Load the full content manifest
    with open("content_manifest_full.json", "r", encoding="utf-8") as f:
        all_pages = json.load(f)

    # Create page index by type and locale
    pages_by_type = {}
    for page in all_pages:
        key = f"{page['page_type']}_{page['locale']}"
        if key not in pages_by_type:
            pages_by_type[key] = []
        pages_by_type[key].append(page)

    # Generate interlinks for each page type
    for page in all_pages:
        page_interlinks = {
            "source_url": page["url"],
            "page_type": page["page_type"],
            "locale": page["locale"],
            "internal_links": [],
        }

        if page["page_type"] == "city_landing":
            # City pages link to:
            # 1. Homepage
            # 2. All treatment pages for this city
            # 3. Related city pages (same country)

            page_interlinks["internal_links"].append({
                "url": f"{BRAND['domain']}/{page['locale']}",
                "anchor_text": "Home" if page["locale"] == "en" else "الرئيسية",
                "link_type": "navigation",
            })

            # Link to treatment pages for this city
            for other_page in all_pages:
                if (
                    other_page["page_type"] == "treatment_landing"
                    and other_page["locale"] == page["locale"]
                    and page["slug"] in other_page["url"]
                ):
                    treatment_name = other_page["h1"].split(" in India")[0] if page["locale"] == "en" else other_page["h1"].split(" في الهند")[0]
                    page_interlinks["internal_links"].append({
                        "url": other_page["url"],
                        "anchor_text": treatment_name,
                        "link_type": "related_treatment",
                    })

        elif page["page_type"] == "treatment_landing":
            # Treatment pages link to:
            # 1. City landing page
            # 2. Homepage
            # 3. All article pages for this treatment
            # 4. Related treatment pages (same city)

            # Extract city slug from URL
            url_parts = page["url"].split("/")
            city_slug = url_parts[-2]
            country_slug = url_parts[-3]

            # Link to city page
            city_page_url = f"{BRAND['domain']}/{page['locale']}/medical-tourism/{country_slug}/{city_slug}"
            for other_page in all_pages:
                if other_page["url"] == city_page_url:
                    city_name = other_page["h1"].split(" to India")[0].replace("Medical Tourism from ", "") if page["locale"] == "en" else other_page["h1"].split(" إلى الهند")[0].replace("السياحة العلاجية من ", "")
                    page_interlinks["internal_links"].append({
                        "url": other_page["url"],
                        "anchor_text": f"{city_name} Medical Tourism" if page["locale"] == "en" else f"السياحة العلاجية {city_name}",
                        "link_type": "parent_page",
                    })

            # Link to article pages for this treatment
            article_count = 0
            for other_page in all_pages:
                if (
                    other_page["page_type"] == "article"
                    and other_page["locale"] == page["locale"]
                    and city_slug in other_page["url"]
                    and page["slug"] in other_page["url"]
                    and article_count < 5
                ):
                    page_interlinks["internal_links"].append({
                        "url": other_page["url"],
                        "anchor_text": other_page["h1"],
                        "link_type": "related_article",
                    })
                    article_count += 1

        elif page["page_type"] == "article":
            # Article pages link to:
            # 1. Treatment landing page
            # 2. City landing page
            # 3. Other articles for same treatment
            # 4. Homepage

            # Extract slugs from URL
            url_parts = page["url"].split("/")
            treatment_slug = url_parts[-2]
            city_slug = url_parts[-3]
            country_slug = url_parts[-4]

            # Link to treatment page
            treatment_page_url = f"{BRAND['domain']}/{page['locale']}/medical-tourism/{country_slug}/{city_slug}/{treatment_slug}"
            for other_page in all_pages:
                if other_page["url"] == treatment_page_url:
                    treatment_name = other_page["h1"].split(" in India")[0] if page["locale"] == "en" else other_page["h1"].split(" في الهند")[0]
                    page_interlinks["internal_links"].append({
                        "url": other_page["url"],
                        "anchor_text": treatment_name,
                        "link_type": "parent_page",
                    })

            # Link to city page
            city_page_url = f"{BRAND['domain']}/{page['locale']}/medical-tourism/{country_slug}/{city_slug}"
            for other_page in all_pages:
                if other_page["url"] == city_page_url:
                    city_name = other_page["h1"].split(" to India")[0].replace("Medical Tourism from ", "") if page["locale"] == "en" else other_page["h1"].split(" إلى الهند")[0].replace("السياحة العلاجية من ", "")
                    page_interlinks["internal_links"].append({
                        "url": other_page["url"],
                        "anchor_text": city_name,
                        "link_type": "breadcrumb",
                    })

            # Link to other articles (max 3)
            article_count = 0
            for other_page in all_pages:
                if (
                    other_page["page_type"] == "article"
                    and other_page["locale"] == page["locale"]
                    and city_slug in other_page["url"]
                    and treatment_slug in other_page["url"]
                    and other_page["url"] != page["url"]
                    and article_count < 3
                ):
                    page_interlinks["internal_links"].append({
                        "url": other_page["url"],
                        "anchor_text": other_page["h1"],
                        "link_type": "related_article",
                    })
                    article_count += 1

        interlinks.append(page_interlinks)

    return interlinks


def main():
    print("=" * 70)
    print("Shifa AlHind - Interlinking Structure Generator")
    print("=" * 70)

    print("\n⏳ Generating interlinking structure for 980 pages...")

    interlinks = generate_interlinking_structure()

    with open("interlink_structure.json", "w", encoding="utf-8") as f:
        json.dump(interlinks, f, indent=2, ensure_ascii=False)

    print(f"✅ Saved: interlink_structure.json ({len(interlinks)} pages)")

    # Generate summary report
    total_links = sum(len(page["internal_links"]) for page in interlinks)
    avg_links = total_links / len(interlinks)

    print(f"\n📊 Interlinking Summary:")
    print(f"   - Total pages: {len(interlinks)}")
    print(f"   - Total internal links: {total_links}")
    print(f"   - Average links per page: {avg_links:.1f}")

    print(f"\n🎉 Interlinking Structure Complete!")


if __name__ == "__main__":
    main()

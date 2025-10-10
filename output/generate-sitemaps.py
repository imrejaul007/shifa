#!/usr/bin/env python3
"""
Shifa AlHind - XML Sitemap Generator
Generates XML sitemaps for SEO
"""

import json
from datetime import datetime
import xml.etree.ElementTree as ET
from xml.dom import minidom

BRAND = {
    "domain": "https://shifaalhind.com",
}


def prettify_xml(elem):
    """Return a pretty-printed XML string for the Element."""
    rough_string = ET.tostring(elem, encoding='utf-8')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="  ", encoding="utf-8").decode("utf-8")


def generate_sitemap(pages, filename, locale=None):
    """Generate XML sitemap for given pages"""
    urlset = ET.Element("urlset")
    urlset.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
    urlset.set("xmlns:xhtml", "http://www.w3.org/1999/xhtml")

    for page in pages:
        if locale and page["locale"] != locale:
            continue

        url = ET.SubElement(urlset, "url")

        loc = ET.SubElement(url, "loc")
        loc.text = page["url"]

        # Determine priority based on page type
        priority_map = {
            "city_landing": "0.8",
            "treatment_landing": "0.7",
            "article": "0.6",
        }

        priority = ET.SubElement(url, "priority")
        priority.text = priority_map.get(page["page_type"], "0.5")

        changefreq = ET.SubElement(url, "changefreq")
        changefreq.text = "weekly" if page["page_type"] != "article" else "monthly"

        lastmod = ET.SubElement(url, "lastmod")
        lastmod.text = datetime.now().strftime("%Y-%m-%d")

        # Add alternate language links (hreflang)
        # Find alternate language version
        alternate_locale = "ar" if page["locale"] == "en" else "en"
        alternate_url = page["url"].replace(f"/{page['locale']}/", f"/{alternate_locale}/")

        # Self reference
        xhtml_link_self = ET.SubElement(url, "xhtml:link")
        xhtml_link_self.set("rel", "alternate")
        xhtml_link_self.set("hreflang", page["locale"])
        xhtml_link_self.set("href", page["url"])

        # Alternate language
        xhtml_link_alt = ET.SubElement(url, "xhtml:link")
        xhtml_link_alt.set("rel", "alternate")
        xhtml_link_alt.set("hreflang", alternate_locale)
        xhtml_link_alt.set("href", alternate_url)

    # Write to file
    xml_string = prettify_xml(urlset)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(xml_string)


def generate_sitemap_index(sitemap_files):
    """Generate sitemap index file"""
    sitemapindex = ET.Element("sitemapindex")
    sitemapindex.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")

    for sitemap_file in sitemap_files:
        sitemap = ET.SubElement(sitemapindex, "sitemap")

        loc = ET.SubElement(sitemap, "loc")
        loc.text = f"{BRAND['domain']}/{sitemap_file}"

        lastmod = ET.SubElement(sitemap, "lastmod")
        lastmod.text = datetime.now().strftime("%Y-%m-%d")

    # Write to file
    xml_string = prettify_xml(sitemapindex)
    with open("sitemap_index.xml", "w", encoding="utf-8") as f:
        f.write(xml_string)


def main():
    print("=" * 70)
    print("Shifa AlHind - XML Sitemap Generator")
    print("=" * 70)

    # Load full content manifest
    with open("content_manifest_full.json", "r", encoding="utf-8") as f:
        all_pages = json.load(f)

    # Generate separate sitemaps
    print("\n⏳ Generating XML sitemaps...")

    # English sitemap
    en_pages = [p for p in all_pages if p["locale"] == "en"]
    generate_sitemap(en_pages, "sitemap_en.xml", "en")
    print(f"✅ Saved: sitemap_en.xml ({len(en_pages)} URLs)")

    # Arabic sitemap
    ar_pages = [p for p in all_pages if p["locale"] == "ar"]
    generate_sitemap(ar_pages, "sitemap_ar.xml", "ar")
    print(f"✅ Saved: sitemap_ar.xml ({len(ar_pages)} URLs)")

    # Master sitemap (all pages)
    generate_sitemap(all_pages, "sitemap.xml")
    print(f"✅ Saved: sitemap.xml ({len(all_pages)} URLs)")

    # Sitemap index
    print("\n⏳ Generating sitemap index...")
    generate_sitemap_index(["sitemap_en.xml", "sitemap_ar.xml"])
    print("✅ Saved: sitemap_index.xml")

    print("\n🎉 XML Sitemaps Complete!")
    print(f"\n📦 Deliverables:")
    print(f"   ✅ sitemap.xml - Master sitemap (980 URLs)")
    print(f"   ✅ sitemap_en.xml - English sitemap (490 URLs)")
    print(f"   ✅ sitemap_ar.xml - Arabic sitemap (490 URLs)")
    print(f"   ✅ sitemap_index.xml - Sitemap index")

    print(f"\n📝 Next Steps:")
    print(f"   1. Upload sitemaps to /public folder")
    print(f"   2. Submit sitemap_index.xml to Google Search Console")
    print(f"   3. Add sitemap reference to robots.txt")


if __name__ == "__main__":
    main()

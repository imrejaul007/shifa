#!/usr/bin/env python3
"""
Update remaining for-patients pages with all cities
"""

# City data for remaining countries
COUNTRIES = {
    'oman': {
        'cities': [
            {'nameEn': 'Muscat', 'nameAr': 'مسقط', 'slug': 'muscat', 'icon': '🏛️', 'population': '1.7M', 'flights': '3-4 hours'},
            {'nameEn': 'Sohar', 'nameAr': 'صحار', 'slug': 'sohar', 'icon': '🏭', 'population': '230K', 'flights': '3-4 hours'},
            {'nameEn': 'Salalah', 'nameAr': 'صلالة', 'slug': 'salalah', 'icon': '🌴', 'population': '330K', 'flights': '4-5 hours'},
            {'nameEn': 'Nizwa', 'nameAr': 'نزوى', 'slug': 'nizwa', 'icon': '🏰', 'population': '100K', 'flights': '3-4 hours'},
        ],
        'count': 4,
        'keywords_add': [
            'Muscat to India medical tourism',
            'Sohar medical tourism',
            'Salalah patients India',
            'Nizwa to Bangalore healthcare',
        ]
    },
    'kuwait': {
        'cities': [
            {'nameEn': 'Kuwait City', 'nameAr': 'مدينة الكويت', 'slug': 'kuwait-city', 'icon': '🏙️', 'population': '4.3M', 'flights': '4-5 hours'},
            {'nameEn': 'Hawalli', 'nameAr': 'حولي', 'slug': 'hawalli', 'icon': '🏘️', 'population': '165K', 'flights': '4-5 hours'},
            {'nameEn': 'Salmiya', 'nameAr': 'السالمية', 'slug': 'salmiya', 'icon': '🌊', 'population': '150K', 'flights': '4-5 hours'},
            {'nameEn': 'Farwaniya', 'nameAr': 'الفروانية', 'slug': 'farwaniya', 'icon': '🏗️', 'population': '900K', 'flights': '4-5 hours'},
        ],
        'count': 4,
        'keywords_add': [
            'Kuwait City to India medical tourism',
            'Hawalli medical tourism',
            'Salmiya patients India',
            'Farwaniya to Bangalore healthcare',
        ]
    },
    'bahrain': {
        'cities': [
            {'nameEn': 'Manama', 'nameAr': 'المنامة', 'slug': 'manama', 'icon': '🏙️', 'population': '640K', 'flights': '4-5 hours'},
            {'nameEn': 'Muharraq', 'nameAr': 'المحرق', 'slug': 'muharraq', 'icon': '✈️', 'population': '230K', 'flights': '4-5 hours'},
            {'nameEn': 'Riffa', 'nameAr': 'الرفاع', 'slug': 'riffa', 'icon': '🏡', 'population': '120K', 'flights': '4-5 hours'},
        ],
        'count': 3,
        'keywords_add': [
            'Manama to India medical tourism',
            'Muharraq medical tourism',
            'Riffa patients India',
        ]
    }
}

# Print update summary
for country, data in COUNTRIES.items():
    print(f"\n{country.upper()}: {data['count']} cities")
    for city in data['cities']:
        print(f"  - {city['nameEn']} ({city['population']})")
    print(f"  Keywords to add: {', '.join(data['keywords_add'][:2])}, ...")

print("\n✓ City data prepared for Oman, Kuwait, and Bahrain")
print("✓ Ready to manually update each page")

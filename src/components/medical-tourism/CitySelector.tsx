'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Search } from 'lucide-react';
import { trackCitySelection, trackSearch } from '@/lib/analytics';

interface City {
  country: string;
  countryName: string;
  countryNameAr: string;
  slug: string;
  name: string;
  nameAr: string;
  flag: string;
}

const CITIES: City[] = [
  // Saudi Arabia
  {
    country: 'saudi-arabia',
    countryName: 'Saudi Arabia',
    countryNameAr: 'المملكة العربية السعودية',
    slug: 'riyadh',
    name: 'Riyadh',
    nameAr: 'الرياض',
    flag: '🇸🇦',
  },
  {
    country: 'saudi-arabia',
    countryName: 'Saudi Arabia',
    countryNameAr: 'المملكة العربية السعودية',
    slug: 'jeddah',
    name: 'Jeddah',
    nameAr: 'جدة',
    flag: '🇸🇦',
  },
  // UAE
  {
    country: 'united-arab-emirates',
    countryName: 'United Arab Emirates',
    countryNameAr: 'الإمارات العربية المتحدة',
    slug: 'dubai',
    name: 'Dubai',
    nameAr: 'دبي',
    flag: '🇦🇪',
  },
  {
    country: 'united-arab-emirates',
    countryName: 'United Arab Emirates',
    countryNameAr: 'الإمارات العربية المتحدة',
    slug: 'abu-dhabi',
    name: 'Abu Dhabi',
    nameAr: 'أبو ظبي',
    flag: '🇦🇪',
  },
  // Qatar
  {
    country: 'qatar',
    countryName: 'Qatar',
    countryNameAr: 'قطر',
    slug: 'doha',
    name: 'Doha',
    nameAr: 'الدوحة',
    flag: '🇶🇦',
  },
  // Oman
  {
    country: 'oman',
    countryName: 'Oman',
    countryNameAr: 'سلطنة عمان',
    slug: 'muscat',
    name: 'Muscat',
    nameAr: 'مسقط',
    flag: '🇴🇲',
  },
  // Kuwait
  {
    country: 'kuwait',
    countryName: 'Kuwait',
    countryNameAr: 'الكويت',
    slug: 'kuwait-city',
    name: 'Kuwait City',
    nameAr: 'مدينة الكويت',
    flag: '🇰🇼',
  },
  // Bahrain
  {
    country: 'bahrain',
    countryName: 'Bahrain',
    countryNameAr: 'البحرين',
    slug: 'manama',
    name: 'Manama',
    nameAr: 'المنامة',
    flag: '🇧🇭',
  },
];

interface CitySelectorProps {
  locale: 'en' | 'ar';
  variant?: 'compact' | 'full';
  title?: string;
  description?: string;
}

export default function CitySelector({
  locale,
  variant = 'compact',
  title,
  description,
}: CitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const isArabic = locale === 'ar';

  const defaultTitle = isArabic ? 'اختر مدينتك' : 'Choose Your City';
  const defaultDescription = isArabic
    ? 'احصل على معلومات مخصصة لمدينتك'
    : 'Get personalized information for your city';

  const filteredCities = CITIES.filter((city) => {
    const cityName = isArabic ? city.nameAr : city.name;
    const countryName = isArabic ? city.countryNameAr : city.countryName;
    const searchLower = searchQuery.toLowerCase();

    return (
      cityName.toLowerCase().includes(searchLower) ||
      countryName.toLowerCase().includes(searchLower)
    );
  });

  // Handle city click with analytics
  const handleCityClick = (city: City) => {
    trackCitySelection(city.slug, city.country, locale);
  };

  // Handle search with analytics
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      trackSearch(query, filteredCities.length, 'city_selector');
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${isArabic ? 'rtl' : 'ltr'}`}>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">{title || defaultTitle}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">{description || defaultDescription}</p>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${
              isArabic ? 'right-3' : 'left-3'
            }`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={isArabic ? 'ابحث عن مدينة...' : 'Search for a city...'}
            className={`w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isArabic ? 'pr-10 pl-3' : 'pl-10 pr-3'
            }`}
          />
        </div>

        {/* City List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredCities.map((city) => (
            <Link
              key={`${city.country}-${city.slug}`}
              href={`/${locale}/medical-tourism/${city.country}/${city.slug}`}
              onClick={() => handleCityClick(city)}
              className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-md transition group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{city.flag}</span>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {isArabic ? city.nameAr : city.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isArabic ? city.countryNameAr : city.countryName}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
            </Link>
          ))}

          {filteredCities.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              {isArabic ? 'لم يتم العثور على مدن' : 'No cities found'}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full variant with grid
  return (
    <div className={`${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title || defaultTitle}</h2>
        <p className="text-gray-600">{description || defaultDescription}</p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search
            className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${
              isArabic ? 'right-4' : 'left-4'
            }`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={isArabic ? 'ابحث عن مدينة...' : 'Search for a city...'}
            className={`w-full py-3 px-4 border border-gray-300 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'
            }`}
          />
        </div>
      </div>

      {/* City Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCities.map((city) => (
          <Link
            key={`${city.country}-${city.slug}`}
            href={`/${locale}/medical-tourism/${city.country}/${city.slug}`}
            onClick={() => handleCityClick(city)}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border border-gray-200 hover:border-blue-500"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{city.flag}</div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition mb-1">
                {isArabic ? city.nameAr : city.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {isArabic ? city.countryNameAr : city.countryName}
              </p>
              <div className="flex items-center justify-center gap-2 text-blue-600 text-sm font-medium">
                <span>{isArabic ? 'عرض العلاجات' : 'View Treatments'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </Link>
        ))}

        {filteredCities.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            {isArabic ? 'لم يتم العثور على مدن' : 'No cities found'}
          </div>
        )}
      </div>
    </div>
  );
}

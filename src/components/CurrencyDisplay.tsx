'use client';

import { useEffect, useState } from 'react';

// GCC country currency mapping
const GCC_CURRENCIES = {
  AE: { code: 'AED', symbol: 'د.إ', rate: 3.67 }, // UAE Dirham
  SA: { code: 'SAR', symbol: 'ر.س', rate: 3.75 }, // Saudi Riyal
  KW: { code: 'KWD', symbol: 'د.ك', rate: 0.31 }, // Kuwaiti Dinar
  OM: { code: 'OMR', symbol: 'ر.ع', rate: 0.38 }, // Omani Rial
  QA: { code: 'QAR', symbol: 'ر.ق', rate: 3.64 }, // Qatari Riyal
  BH: { code: 'BHD', symbol: 'د.ب', rate: 0.38 }, // Bahraini Dinar
  IN: { code: 'INR', symbol: '₹', rate: 83.0 }, // Indian Rupee
  US: { code: 'USD', symbol: '$', rate: 1.0 }, // US Dollar (base)
} as const;

type CountryCode = keyof typeof GCC_CURRENCIES;

interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
  countryCode: CountryCode;
}

/**
 * Detect user's country using multiple methods
 */
async function detectCountry(): Promise<CountryCode> {
  try {
    // Try to get location from browser's Intl API
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Map common timezones to GCC countries
    const timezoneMap: Record<string, CountryCode> = {
      'Asia/Dubai': 'AE',
      'Asia/Riyadh': 'SA',
      'Asia/Kuwait': 'KW',
      'Asia/Muscat': 'OM',
      'Asia/Qatar': 'QA',
      'Asia/Bahrain': 'BH',
      'Asia/Kolkata': 'IN',
      'Asia/Calcutta': 'IN',
    };

    if (timezone && timezoneMap[timezone]) {
      return timezoneMap[timezone];
    }

    // Try to fetch from a geolocation API (fallback)
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    if (data.country_code && data.country_code in GCC_CURRENCIES) {
      return data.country_code as CountryCode;
    }
  } catch (error) {
    console.warn('Failed to detect country:', error);
  }

  // Default to USD
  return 'US';
}

/**
 * Get currency information for a country
 */
function getCurrencyInfo(countryCode: CountryCode): CurrencyInfo {
  const currency = GCC_CURRENCIES[countryCode];
  return {
    code: currency.code,
    symbol: currency.symbol,
    rate: currency.rate,
    countryCode,
  };
}

/**
 * Convert USD amount to target currency
 */
function convertCurrency(amountUSD: number, targetRate: number): number {
  return Math.round(amountUSD * targetRate);
}

interface CurrencyDisplayProps {
  amountUSD: number;
  showCode?: boolean;
  className?: string;
}

/**
 * Component to display price in user's local currency
 */
export function CurrencyDisplay({
  amountUSD,
  showCode = false,
  className = '',
}: CurrencyDisplayProps) {
  const [currency, setCurrency] = useState<CurrencyInfo>(getCurrencyInfo('US'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectCountry().then((countryCode) => {
      setCurrency(getCurrencyInfo(countryCode));
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <span className={className}>Loading...</span>;
  }

  const localAmount = convertCurrency(amountUSD, currency.rate);
  const formattedAmount = localAmount.toLocaleString();

  return (
    <span className={className}>
      {currency.symbol}
      {formattedAmount}
      {showCode && ` ${currency.code}`}
    </span>
  );
}

/**
 * Hook to get user's currency information
 */
export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyInfo>(getCurrencyInfo('US'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectCountry().then((countryCode) => {
      setCurrency(getCurrencyInfo(countryCode));
      setIsLoading(false);
    });
  }, []);

  const convert = (amountUSD: number) => convertCurrency(amountUSD, currency.rate);

  const format = (amountUSD: number, options?: { showCode?: boolean }) => {
    const localAmount = convert(amountUSD);
    const formatted = `${currency.symbol}${localAmount.toLocaleString()}`;
    return options?.showCode ? `${formatted} ${currency.code}` : formatted;
  };

  return {
    currency,
    isLoading,
    convert,
    format,
  };
}

/**
 * Component to display price range in user's currency
 */
interface PriceRangeProps {
  minUSD: number;
  maxUSD: number;
  className?: string;
}

export function CurrencyRange({ minUSD, maxUSD, className = '' }: PriceRangeProps) {
  const { format, isLoading } = useCurrency();

  if (isLoading) {
    return <span className={className}>Loading...</span>;
  }

  return (
    <span className={className}>
      {format(minUSD)} - {format(maxUSD)}
    </span>
  );
}

/**
 * Currency selector component (for manual selection)
 */
interface CurrencySelectorProps {
  value: CountryCode;
  onChange: (code: CountryCode) => void;
  className?: string;
}

export function CurrencySelector({ value, onChange, className = '' }: CurrencySelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as CountryCode)}
      className={className}
      aria-label="Select currency"
    >
      {Object.entries(GCC_CURRENCIES).map(([code, { code: currencyCode, symbol }]) => (
        <option key={code} value={code}>
          {symbol} {currencyCode}
        </option>
      ))}
    </select>
  );
}

'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null; // Don't load in development
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Event tracking utilities
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Conversion events
export const trackConsultationRequest = () => {
  trackEvent('consultation_request', {
    event_category: 'engagement',
    event_label: 'Free Consultation Form',
  });
};

export const trackBookingRequest = () => {
  trackEvent('booking_request', {
    event_category: 'engagement',
    event_label: 'Book Consultation Form',
  });
};

export const trackPackageView = (packageName: string) => {
  trackEvent('view_package', {
    event_category: 'engagement',
    event_label: packageName,
  });
};

export const trackTreatmentView = (treatmentName: string) => {
  trackEvent('view_treatment', {
    event_category: 'engagement',
    event_label: treatmentName,
  });
};

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'WhatsApp Button',
  });
};

export const trackPhoneClick = () => {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: 'Phone Number',
  });
};

export const trackEmailClick = () => {
  trackEvent('email_click', {
    event_category: 'engagement',
    event_label: 'Email Address',
  });
};

// Custom hook for tracking page views
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams ? `?${searchParams}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);
}

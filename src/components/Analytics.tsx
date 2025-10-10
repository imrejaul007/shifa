'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null; // Don't load in development
  }

  return (
    <>
      {/* Google Tag Manager */}
      {GTM_ID && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics (fallback if GTM is not configured) */}
      {!GTM_ID && (
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
      )}
    </>
  );
}

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

// Event tracking utilities
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
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

// Microsoft Clarity for heatmaps and session recording
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function MicrosoftClarity() {
  if (process.env.NODE_ENV !== 'production' || !CLARITY_ID) {
    return null;
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}

// Combined Analytics Component
export function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <MicrosoftClarity />
    </>
  );
}

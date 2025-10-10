/**
 * Analytics Tracking Utilities for Shifa AlHind
 * Supports Google Analytics 4 and custom event tracking
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  // Custom parameters for GA4
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track custom event in Google Analytics
 */
export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const { action, category, label, value, ...customParams } = event;

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParams,
    });

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }
  }
};

/**
 * Track page view
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title,
    });
  }
};

/**
 * Medical Tourism Specific Events
 */

// City selection tracking
export const trackCitySelection = (city: string, country: string, locale: string) => {
  trackEvent({
    action: 'select_city',
    category: 'medical_tourism',
    label: `${city}, ${country}`,
    city,
    country,
    locale,
  });
};

// Treatment selection tracking
export const trackTreatmentSelection = (treatment: string, city: string, country: string) => {
  trackEvent({
    action: 'select_treatment',
    category: 'medical_tourism',
    label: treatment,
    treatment,
    city,
    country,
  });
};

// Cost calculator interaction
export const trackCostCalculatorView = (treatment: string, locale: string) => {
  trackEvent({
    action: 'view_cost_calculator',
    category: 'medical_tourism',
    label: treatment,
    treatment,
    locale,
  });
};

export const trackCostCalculatorChange = (
  treatment: string,
  gccCost: number,
  indiaCost: number,
  savings: number
) => {
  trackEvent({
    action: 'calculate_cost',
    category: 'medical_tourism',
    label: treatment,
    treatment,
    gcc_cost: gccCost,
    india_cost: indiaCost,
    savings_amount: savings,
    savings_percent: Math.round(((gccCost - indiaCost) / gccCost) * 100),
  });
};

// Inquiry form tracking
export const trackFormStart = (formType: string, context?: Record<string, string>) => {
  trackEvent({
    action: 'form_start',
    category: 'lead_generation',
    label: formType,
    form_type: formType,
    ...context,
  });
};

export const trackFormFieldComplete = (formType: string, fieldName: string) => {
  trackEvent({
    action: 'form_field_complete',
    category: 'lead_generation',
    label: `${formType} - ${fieldName}`,
    form_type: formType,
    field_name: fieldName,
  });
};

export const trackFormSubmit = (
  formType: string,
  context: {
    city?: string;
    country?: string;
    treatment?: string;
    locale?: string;
  }
) => {
  trackEvent({
    action: 'form_submit',
    category: 'lead_generation',
    label: formType,
    form_type: formType,
    ...context,
  });
};

export const trackFormSuccess = (
  formType: string,
  leadId?: string,
  context?: Record<string, string>
) => {
  trackEvent({
    action: 'form_success',
    category: 'conversion',
    label: formType,
    form_type: formType,
    lead_id: leadId,
    ...context,
  });
};

export const trackFormError = (formType: string, errorMessage: string) => {
  trackEvent({
    action: 'form_error',
    category: 'lead_generation',
    label: `${formType} - ${errorMessage}`,
    form_type: formType,
    error_message: errorMessage,
  });
};

// CTA tracking
export const trackCTAClick = (ctaName: string, location: string, destination: string) => {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: ctaName,
    cta_name: ctaName,
    cta_location: location,
    cta_destination: destination,
  });
};

// Consultation booking tracking
export const trackConsultationRequest = (
  treatment: string,
  city: string,
  preferredDate?: string
) => {
  trackEvent({
    action: 'consultation_request',
    category: 'conversion',
    label: treatment,
    treatment,
    city,
    preferred_date: preferredDate,
  });
};

// Download tracking
export const trackDownload = (fileName: string, fileType: string, context?: string) => {
  trackEvent({
    action: 'download',
    category: 'engagement',
    label: fileName,
    file_name: fileName,
    file_type: fileType,
    download_context: context,
  });
};

// Search tracking
export const trackSearch = (searchQuery: string, resultCount: number, searchType: string) => {
  trackEvent({
    action: 'search',
    category: 'engagement',
    label: searchQuery,
    search_query: searchQuery,
    result_count: resultCount,
    search_type: searchType,
  });
};

// Scroll depth tracking
export const trackScrollDepth = (depth: number, pagePath: string) => {
  trackEvent({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${depth}%`,
    scroll_depth: depth,
    page_path: pagePath,
  });
};

// Video tracking
export const trackVideoPlay = (videoName: string, videoUrl: string) => {
  trackEvent({
    action: 'video_play',
    category: 'engagement',
    label: videoName,
    video_name: videoName,
    video_url: videoUrl,
  });
};

export const trackVideoComplete = (videoName: string, duration: number, percentWatched: number) => {
  trackEvent({
    action: 'video_complete',
    category: 'engagement',
    label: videoName,
    video_name: videoName,
    duration_seconds: duration,
    percent_watched: percentWatched,
  });
};

// Medical Tourism Funnel Stages
export enum FunnelStage {
  AWARENESS = 'awareness',
  CONSIDERATION = 'consideration',
  INTENT = 'intent',
  CONVERSION = 'conversion',
}

export const trackFunnelStage = (stage: FunnelStage, treatment?: string, city?: string) => {
  trackEvent({
    action: 'funnel_stage',
    category: 'medical_tourism_funnel',
    label: stage,
    funnel_stage: stage,
    treatment,
    city,
  });
};

/**
 * E-commerce tracking for medical packages
 */
export const trackViewPackage = (packageId: string, packageName: string, price: number) => {
  trackEvent({
    action: 'view_item',
    category: 'ecommerce',
    label: packageName,
    item_id: packageId,
    item_name: packageName,
    price: price,
  });
};

export const trackAddToCart = (packageId: string, packageName: string, price: number) => {
  trackEvent({
    action: 'add_to_cart',
    category: 'ecommerce',
    label: packageName,
    item_id: packageId,
    item_name: packageName,
    price: price,
  });
};

export const trackBeginCheckout = (packageId: string, packageName: string, price: number) => {
  trackEvent({
    action: 'begin_checkout',
    category: 'ecommerce',
    label: packageName,
    item_id: packageId,
    item_name: packageName,
    value: price,
  });
};

export const trackPurchase = (
  transactionId: string,
  value: number,
  items: Array<{ id: string; name: string; price: number }>
) => {
  trackEvent({
    action: 'purchase',
    category: 'ecommerce',
    label: transactionId,
    transaction_id: transactionId,
    value: value,
    currency: 'USD',
    items: JSON.stringify(items),
  });
};

/**
 * User engagement metrics
 */
export const trackTimeOnPage = (seconds: number, pagePath: string) => {
  trackEvent({
    action: 'time_on_page',
    category: 'engagement',
    label: pagePath,
    time_seconds: seconds,
    page_path: pagePath,
  });
};

export const trackBounce = (pagePath: string, timeOnPage: number) => {
  if (timeOnPage < 10) {
    // Bounce if less than 10 seconds
    trackEvent({
      action: 'bounce',
      category: 'engagement',
      label: pagePath,
      page_path: pagePath,
      time_on_page: timeOnPage,
    });
  }
};

/**
 * WhatsApp click tracking
 */
export const trackWhatsAppClick = (context: string, message?: string) => {
  trackEvent({
    action: 'whatsapp_click',
    category: 'engagement',
    label: context,
    whatsapp_context: context,
    message_type: message,
  });
};

/**
 * Phone call tracking
 */
export const trackPhoneClick = (phoneNumber: string, context: string) => {
  trackEvent({
    action: 'phone_click',
    category: 'engagement',
    label: context,
    phone_number: phoneNumber,
    call_context: context,
  });
};

/**
 * Email click tracking
 */
export const trackEmailClick = (emailType: string, context: string) => {
  trackEvent({
    action: 'email_click',
    category: 'engagement',
    label: emailType,
    email_type: emailType,
    email_context: context,
  });
};

/**
 * Social media tracking
 */
export const trackSocialShare = (platform: string, contentType: string, url: string) => {
  trackEvent({
    action: 'social_share',
    category: 'engagement',
    label: platform,
    social_platform: platform,
    content_type: contentType,
    shared_url: url,
  });
};

export const trackSocialFollow = (platform: string) => {
  trackEvent({
    action: 'social_follow',
    category: 'engagement',
    label: platform,
    social_platform: platform,
  });
};

/**
 * Error tracking
 */
export const trackError = (errorType: string, errorMessage: string, errorStack?: string) => {
  trackEvent({
    action: 'error',
    category: 'error',
    label: errorType,
    error_type: errorType,
    error_message: errorMessage,
    error_stack: errorStack?.substring(0, 500), // Limit stack trace length
  });
};

/**
 * Initialize scroll depth tracking
 */
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const depths = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercent = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);

    depths.forEach((depth) => {
      if (scrollPercent >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        trackScrollDepth(depth, window.location.pathname);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Initialize time on page tracking
 */
export const initTimeTracking = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();

  const handleUnload = () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(timeOnPage, window.location.pathname);
    trackBounce(window.location.pathname, timeOnPage);
  };

  window.addEventListener('beforeunload', handleUnload);

  return () => {
    window.removeEventListener('beforeunload', handleUnload);
  };
};

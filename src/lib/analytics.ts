// Analytics & conversion monitoring per Layer 16
export type AnalyticsEvent = 
  | 'page_view'
  | 'property_view'
  | 'search_performed'
  | 'filter_applied'
  | 'viewing_requested'
  | 'valuation_requested'
  | 'lead_submitted'
  | 'property_favorited';

interface EventProperties {
  page?: string;
  property_id?: string;
  property_slug?: string;
  neighborhood?: string;
  lead_type?: string;
  filters?: Record<string, unknown>;
  [key: string]: unknown;
}

export function trackEvent(event: AnalyticsEvent, properties?: EventProperties) {
  const payload = {
    event,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.pathname + window.location.search,
      referrer: document.referrer || 'direct',
    },
  };

  // In production, forward to Plausible or Vercel Analytics
  if (import.meta.env.PROD) {
    // e.g. window.plausible?.(event, { props: properties });
  }

  // Development logger
  if (import.meta.env.DEV) {
    console.debug(`[Analytics] ${event}`, payload);
  }
}

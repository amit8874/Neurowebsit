// Google Analytics 4 (GA4) Utilities
export const GA_MEASUREMENT_ID = 'G-9VH0PZCRLT';

/**
 * Tracks a page view for Single Page Applications (SPA).
 * @param {string} [path] - Path including route/hash, e.g. '/#second-opinion'
 * @param {string} [title] - Title of the page
 */
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const pagePath = path || (window.location.pathname + (window.location.hash || ''));
    const pageTitle = title || document.title;
    const pageLocation = window.location.href;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: pageLocation,
    });

    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: pageLocation,
    });
  }
};

/**
 * Tracks a custom user interaction event.
 * @param {string} eventName - Name of the GA4 event
 * @param {Record<string, any>} [params] - Optional event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

export type AnalyticsEventName =
  | "hero_primary_cta_click"
  | "hero_secondary_cta_click"
  | "service_cta_click"
  | "project_card_click"
  | "review_source_click"
  | "form_start"
  | "form_submit"
  | "form_submit_success"
  | "form_submit_error";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    __mainextAnalyticsInitialized?: boolean;
  }
}

const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim();

const ensureScript = (id: string, src: string) => {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

export const initAnalytics = () => {
  if (typeof window === "undefined" || window.__mainextAnalyticsInitialized) {
    return;
  }

  if (gaMeasurementId) {
    ensureScript("mainext-ga-script", `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`);

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    });

    window.gtag("js", new Date());
    window.gtag("config", gaMeasurementId, { send_page_view: true });
  }

  if (clarityProjectId && !window.clarity) {
    ((c: Window, l: Document, a: string, r: string, i: string, t?: HTMLScriptElement, y?: HTMLScriptElement) => {
      c[a as keyof Window] = c[a as keyof Window] || ((...args: unknown[]) => {
        ((c[a as keyof Window] as unknown) as { q?: unknown[] }).q = ((c[a as keyof Window] as unknown) as { q?: unknown[] }).q || [];
        ((c[a as keyof Window] as unknown) as { q?: unknown[] }).q?.push(args);
      });
      t = l.createElement(r);
      t.async = true;
      t.src = `https://www.clarity.ms/tag/${i}`;
      y = l.getElementsByTagName(r)[0];
      y.parentNode?.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityProjectId);
  }

  window.__mainextAnalyticsInitialized = true;
};

export const trackEvent = (eventName: AnalyticsEventName, params?: AnalyticsParams) => {
  if (typeof window === "undefined") {
    return;
  }

  if (window.gtag) {
    window.gtag("event", eventName, params || {});
    return;
  }

  if (import.meta.env.DEV) {
    console.info("[analytics:event]", eventName, params || {});
  }
};

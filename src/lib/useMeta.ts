import { useEffect } from "react";

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/** Updates title, description and canonical for client-side navigation. Build-time HTML handles crawlers. */
export const useMeta = (title: string, description?: string, path?: string) => {
  useEffect(() => {
    document.title = title;
    setMeta('meta[property="og:title"]', "content", title);
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
    }
    if (path !== undefined) {
      const url = `https://mainext.in${path}`;
      setMeta('link[rel="canonical"]', "href", url);
      setMeta('meta[property="og:url"]', "content", url);
    }
  }, [title, description, path]);
};

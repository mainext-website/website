import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import SiteNav, { scrollToHash } from "./SiteNav";
import SiteFooter from "./SiteFooter";
import { whatsappLink } from "@/lib/content";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  const { pathname, hash } = useLocation();
  const wa = whatsappLink();

  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => scrollToHash(hash), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      )}
    </div>
  );
};

export default SiteLayout;

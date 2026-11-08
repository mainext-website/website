import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", to: "/#work" },
  { label: "Services", to: "/#services" },
  { label: "Journey", to: "/#journey" },
  { label: "Process", to: "/#process" },
  { label: "Contact", to: "/#contact" },
];

export const scrollToHash = (hash: string) => {
  const el = document.getElementById(hash.replace("#", ""));
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const isDark = theme === "dark" || (theme === "system" && document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const handleClick = (e: React.MouseEvent, to: string) => {
    const [path, hash] = to.split("#");
    if ((path || "/") === location.pathname && hash) {
      e.preventDefault();
      setOpen(false);
      scrollToHash(hash);
      history.replaceState(null, "", `#${hash}`);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
          mainext<span className="text-primary">.</span>
        </Link>

        <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={(e) => handleClick(e, l.to)} className="transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {site.availability.open && (
            <span className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[0.7rem] lg:flex">
              <i className="ping-dot h-2 w-2 rounded-full bg-green-400" />
              {site.availability.text}
            </span>
          )}
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/#contact" onClick={(e) => handleClick(e, "/#contact")} className="btn-primary hidden !py-2 sm:inline-flex">
            Start a project
          </Link>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="container-x flex flex-col py-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={(e) => handleClick(e, l.to)} className="py-3 font-display text-lg font-semibold">
                {l.label}
              </Link>
            ))}
            <Link to="/#contact" onClick={(e) => handleClick(e, "/#contact")} className="btn-primary my-2">
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteNav;

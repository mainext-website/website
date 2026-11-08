import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { site, stats } from "@/lib/content";
import { services } from "@/content/services";

const SiteFooter = () => {
  const socials = [
    { icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
    { icon: Github, href: site.social.github, label: "GitHub" },
    { icon: Instagram, href: site.social.instagram, label: "Instagram" },
    { icon: Mail, href: `mailto:${site.contact.email}`, label: "Email" },
  ].filter((s) => s.href && !s.href.endsWith("mailto:"));

  return (
    <footer className="border-t border-border">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Link to="/" className="font-display text-2xl font-extrabold">
            mainext<span className="text-primary">.</span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            {site.brand} by {site.person.name}. {stats.years}+ years in professional IT, building business software with an
            AI-first workflow since {site.freelanceSince}.
          </p>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="eyebrow mb-4">Services</div>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-muted-foreground hover:text-foreground">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="break-all">{site.contact.email}</li>
            {site.contact.phone && <li>{site.contact.phone}</li>}
            <li>{site.contact.location}</li>
            <li><Link to="/work" className="hover:text-foreground">All work →</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {site.brand}. All rights reserved.</span>
        <span>Built by {site.person.name} with an AI-first workflow.</span>
      </div>
    </footer>
  );
};

export default SiteFooter;

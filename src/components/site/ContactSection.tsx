import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Copy, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { site, whatsappLink } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc4wmIqa_tsA_Vl0obncIhREjDFf7ypMLil8R5y_8nLxG9eOQ/formResponse";

const NEEDS = ["Website", "Billing / Invoice", "Accounts", "Custom ERP", "Mobile / Web app", "Automation / AI", "Not sure yet"];
const BUDGETS = ["Under ₹50k", "₹50k – 2L", "₹2L – 5L", "₹5L+", "Need guidance"];
const TIMELINES = ["ASAP", "This month", "1–3 months", "Just exploring"];

const ChipGroup = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
  <fieldset className="space-y-2">
    <legend className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{label}</legend>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(value === o ? "" : o)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
            value === o ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground/40",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  </fieldset>
);

const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

const ContactSection = () => {
  const [need, setNeed] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [form, setForm] = useState({ name: "", contact: "", company: "", details: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const started = useRef(false);
  const wa = whatsappLink();

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { section: "contact", form_name: "project_inquiry" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) return;
    setState("sending");
    trackEvent("form_submit", { section: "contact", project_type: need || "not_specified", budget_range: budget || "not_specified" });
    if (form.website) {
      setState("sent");
      return;
    }
    try {
      const fd = new FormData();
      const isEmail = form.contact.includes("@");
      fd.append("entry.1053242332", form.name);
      fd.append("entry.1200181153", isEmail ? form.contact : "");
      fd.append("entry.1544500804", [form.company, isEmail ? "" : `Phone: ${form.contact}`].filter(Boolean).join(" · "));
      fd.append(
        "entry.554465849",
        [`Need: ${need || "Not specified"}`, `Budget: ${budget || "Not specified"}`, `Timeline: ${timeline || "Not specified"}`, "", form.details].join("\n"),
      );
      await fetch(GOOGLE_FORM_URL, { method: "POST", mode: "no-cors", body: fd });
      setState("sent");
      trackEvent("form_submit_success", { section: "contact", project_type: need || "not_specified" });
    } catch {
      setState("error");
      trackEvent("form_submit_error", { section: "contact" });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the address stays visible to copy by hand */
    }
  };

  const channels = [
    wa && { icon: MessageCircle, label: "WhatsApp", sub: "Fastest · replies the same day", href: wa, hot: true },
    site.contact.bookingUrl && { icon: CalendarDays, label: "Book a 20-min call", sub: "Free · Google Meet", href: site.contact.bookingUrl },
    site.contact.phone && { icon: Phone, label: site.contact.phone, sub: "Call · evenings and weekends", href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
  ].filter(Boolean) as { icon: typeof Mail; label: string; sub: string; href: string; hot?: boolean }[];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-20 sm:py-28">
      <div className="glow-bg pointer-events-none absolute inset-0" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">Start a project</p>
          <h2 className="section-title mt-3">Tell me what's slowing your business down.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            A short message is enough. I reply within 24 hours with questions or a rough plan. Tamil or English, whichever
            you prefer.
          </p>
          <div className="mt-8 space-y-3">
            {channels.map(({ icon: Icon, label, sub, href, hot }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={cn("panel flex items-center gap-4 p-4 transition-colors hover:border-primary", hot && "border-primary/60")}
              >
                <Icon className="h-5 w-5 text-primary" />
                <div className="min-w-0">
                  <div className="font-semibold">{label}</div>
                  <div className="font-mono text-[0.7rem] text-muted-foreground">{sub}</div>
                </div>
              </a>
            ))}
            <div className="panel flex items-center gap-4 p-4">
              <Mail className="h-5 w-5 text-primary" />
              <div className="min-w-0 flex-1">
                <a href={`mailto:${site.contact.email}`} className="block truncate font-semibold hover:text-primary">{site.contact.email}</a>
                <div className="font-mono text-[0.7rem] text-muted-foreground">For detailed briefs</div>
              </div>
              <button type="button" onClick={copyEmail} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground" aria-label="Copy email address">
                {copied ? <CheckCircle2 className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex items-start gap-4 px-4 pt-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{site.contact.location} · {site.contact.languages}</span>
            </div>
          </div>
        </div>

        <div className="panel relative p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {state === "sent" ? (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
                <CheckCircle2 className="h-14 w-14 text-accent" />
                <h3 className="font-display text-2xl font-bold">Got it. Thank you!</h3>
                <p className="max-w-sm text-muted-foreground">I'll reply within 24 hours. If it's urgent, {wa ? "message me on WhatsApp" : `email ${site.contact.email}`}.</p>
                <button type="button" className="btn-ghost mt-2" onClick={() => { setState("idle"); setForm({ name: "", contact: "", company: "", details: "", website: "" }); setNeed(""); setBudget(""); setTimeline(""); }}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} onFocus={onStart} className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ChipGroup label="What do you need?" options={NEEDS} value={need} onChange={setNeed} />
                <ChipGroup label="Budget" options={BUDGETS} value={budget} onChange={setBudget} />
                <ChipGroup label="When" options={TIMELINES} value={timeline} onChange={setTimeline} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="c-name" className="text-sm font-medium">Your name *</label>
                    <input id="c-name" required className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="c-contact" className="text-sm font-medium">Phone or email *</label>
                    <input id="c-contact" required className={inputCls} value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="c-company" className="text-sm font-medium">Business name</label>
                  <input id="c-company" className={inputCls} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} autoComplete="organization" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="c-details" className="text-sm font-medium">What should the software do?</label>
                  <textarea id="c-details" rows={4} className={inputCls} placeholder="E.g. we bill 40 customers a day in Excel and lose track of payments." value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
                </div>
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                {state === "error" && (
                  <p className="text-sm text-destructive">Couldn't send right now. Please email {site.contact.email} and I'll reply the same day.</p>
                )}
                <button type="submit" disabled={state === "sending"} className="btn-primary w-full !py-4 disabled:opacity-60">
                  <Send className="h-4 w-4" /> {state === "sending" ? "Sending…" : "Send · reply within 24h"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import type { SiteSettings } from "@/lib/content";
import { Area, Field, Repeater, Section, Text, Toggle } from "./fields";

const SettingsEditor = ({ value, onChange }: { value: SiteSettings; onChange: (v: SiteSettings) => void }) => {
  const s = value;
  const contact = (k: keyof SiteSettings["contact"], v: string) => onChange({ ...s, contact: { ...s.contact, [k]: v } });
  const social = (k: keyof SiteSettings["social"], v: string) => onChange({ ...s, social: { ...s.social, [k]: v } });

  return (
    <div className="space-y-5">
      <Section title="About you">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" htmlFor="s-name"><Text id="s-name" value={s.person.name} onChange={(v) => onChange({ ...s, person: { ...s.person, name: v } })} /></Field>
          <Field label="Role line" htmlFor="s-role"><Text id="s-role" value={s.person.role} onChange={(v) => onChange({ ...s, person: { ...s.person, role: v } })} /></Field>
          <Field label="Years in IT" htmlFor="s-years"><Text id="s-years" type="number" value={String(s.experienceYears)} onChange={(v) => onChange({ ...s, experienceYears: Number(v) || 0 })} /></Field>
          <Field label="Freelancing since (year)" htmlFor="s-since"><Text id="s-since" type="number" value={String(s.freelanceSince)} onChange={(v) => onChange({ ...s, freelanceSince: Number(v) || 0 })} /></Field>
        </div>
        <Toggle id="s-open" checked={s.availability.open} onChange={(v) => onChange({ ...s, availability: { ...s.availability, open: v } })} label="Show availability badge" hint="The green dot in the top bar." />
        <Field label="Availability text" htmlFor="s-avail"><Text id="s-avail" value={s.availability.text} onChange={(v) => onChange({ ...s, availability: { ...s.availability, text: v } })} /></Field>
      </Section>

      <Section title="Homepage hero">
        <Field label="Rotating words" htmlFor="s-words" hint='Separate with commas. Reads as "I build the ___ your business runs on."'>
          <Text id="s-words" value={s.hero.words.join(", ")} onChange={(v) => onChange({ ...s, hero: { ...s.hero, words: v.split(",").map((w) => w.trim()).filter(Boolean) } })} />
        </Field>
        <Field label="Subtitle" htmlFor="s-sub"><Area id="s-sub" value={s.hero.subtitle} onChange={(v) => onChange({ ...s, hero: { ...s.hero, subtitle: v } })} /></Field>
      </Section>

      <Section title="Contact" desc="Empty fields are hidden on the site.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp number" htmlFor="s-wa" hint="With country code, e.g. 919876543210. Turns on the WhatsApp buttons."><Text id="s-wa" value={s.contact.whatsapp} inputMode="tel" onChange={(v) => contact("whatsapp", v)} /></Field>
          <Field label="Phone (shown as text)" htmlFor="s-phone"><Text id="s-phone" value={s.contact.phone} onChange={(v) => contact("phone", v)} /></Field>
          <Field label="Email" htmlFor="s-email"><Text id="s-email" value={s.contact.email} onChange={(v) => contact("email", v)} /></Field>
          <Field label="Booking link" htmlFor="s-book" hint="Cal.com or Calendly link."><Text id="s-book" value={s.contact.bookingUrl} onChange={(v) => contact("bookingUrl", v)} /></Field>
          <Field label="Location" htmlFor="s-loc"><Text id="s-loc" value={s.contact.location} onChange={(v) => contact("location", v)} /></Field>
          <Field label="Languages" htmlFor="s-lang"><Text id="s-lang" value={s.contact.languages} onChange={(v) => contact("languages", v)} /></Field>
        </div>
      </Section>

      <Section title="Social links">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="LinkedIn" htmlFor="s-li"><Text id="s-li" value={s.social.linkedin} onChange={(v) => social("linkedin", v)} /></Field>
          <Field label="GitHub" htmlFor="s-gh"><Text id="s-gh" value={s.social.github} onChange={(v) => social("github", v)} /></Field>
          <Field label="Instagram" htmlFor="s-ig"><Text id="s-ig" value={s.social.instagram} onChange={(v) => social("instagram", v)} /></Field>
        </div>
      </Section>

      <Section title="Journey timeline">
        <Repeater
          items={s.journey}
          onChange={(v) => onChange({ ...s, journey: v })}
          make={() => ({ when: "", title: "", text: "" })}
          addLabel="Add milestone"
          render={(j, update, i) => (
            <>
              <div className="grid gap-2 sm:grid-cols-[120px_1fr]">
                <Text id={`s-j-w-${i}`} value={j.when} placeholder="2023" onChange={(v) => update({ ...j, when: v })} aria-label="When" />
                <Text id={`s-j-t-${i}`} value={j.title} placeholder="Title" onChange={(v) => update({ ...j, title: v })} aria-label="Title" />
              </div>
              <Text id={`s-j-x-${i}`} value={j.text} placeholder="One or two sentences" onChange={(v) => update({ ...j, text: v })} aria-label="Text" />
            </>
          )}
        />
      </Section>
    </div>
  );
};

export default SettingsEditor;

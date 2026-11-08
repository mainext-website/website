import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { CATEGORY_LABELS, STATUS_LABELS, assetUrl, type Project, type TileSize } from "@/lib/content";
import { processImage, slugify } from "@/lib/imageTools";
import { Area, Field, Repeater, Section, Select, Text, Toggle } from "./fields";

/** Images added in this session. `committed` = already published, kept only for previews. */
export type PendingUploads = Record<string, { base64: string; previewUrl: string; committed?: boolean }>;

const SIZE_LABELS: Record<TileSize, string> = {
  normal: "Normal (1 box)",
  wide: "Wide (2 boxes across)",
  large: "Large (2×2, use for your best project)",
};

interface Props {
  draft: Project;
  setDraft: (p: Project) => void;
  isNew: boolean;
  takenSlugs: string[];
  pending: PendingUploads;
  addPending: (path: string, data: { base64: string; previewUrl: string }) => void;
}

const imgSrc = (src: string, pending: PendingUploads) => pending[src]?.previewUrl ?? assetUrl(src);

const ImageSlot = ({ src, pending, onPick, onClear, busy, label }: { src: string; pending: PendingUploads; onPick: () => void; onClear: () => void; busy: boolean; label: string }) => (
  <div className="flex items-center gap-4">
    <div className="grid h-24 w-36 shrink-0 place-items-center overflow-hidden rounded-lg border border-dashed border-border bg-background">
      {src ? <img src={imgSrc(src, pending)} alt="" className="h-full w-full object-cover object-top" /> : <span className="text-xs text-muted-foreground">No image</span>}
    </div>
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={onPick} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:border-primary disabled:opacity-50">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />} {src ? "Replace" : label}
      </button>
      {src && (
        <button type="button" onClick={onClear} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
          <Trash2 className="h-4 w-4" /> Remove
        </button>
      )}
    </div>
  </div>
);

const ProjectEditor = ({ draft, setDraft, isNew, takenSlugs, pending, addPending }: Props) => {
  const set = <K extends keyof Project>(k: K, v: Project[K]) => setDraft({ ...draft, [k]: v });
  const fileRef = useRef<HTMLInputElement>(null);
  const target = useRef<"cover" | number | "new-gallery">("cover");
  const [busy, setBusy] = useState(false);
  const [imgError, setImgError] = useState("");
  const slugTaken = isNew && draft.slug && takenSlugs.includes(draft.slug);

  const pick = (t: typeof target.current) => {
    if (!draft.slug) {
      setImgError("Add a title first. Images are stored in a folder named after the project.");
      return;
    }
    target.current = t;
    fileRef.current?.click();
  };

  const onFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    setImgError("");
    try {
      let next = { ...draft, gallery: [...draft.gallery] };
      for (const file of Array.from(files)) {
        const img = await processImage(file);
        const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
        const path = `/uploads/projects/${draft.slug}/${base}-${Date.now().toString(36)}.${img.ext}`;
        addPending(path, { base64: img.base64, previewUrl: img.previewUrl });
        const t = target.current;
        if (t === "cover") next = { ...next, cover: path };
        else if (t === "new-gallery") next.gallery.push({ src: path, caption: "" });
        else next.gallery[t] = { ...next.gallery[t], src: path };
      }
      setDraft(next);
    } catch (e) {
      setImgError(e instanceof Error ? e.message : "Couldn't add that image.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-5">
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />

      <Section title="1 · Basics" desc="Shown on the project card and the top of the case-study page.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Project title *" htmlFor="f-title">
            <Text id="f-title" value={draft.title} placeholder="Eclipse Invoice Manager"
              onChange={(v) => setDraft({ ...draft, title: v, slug: isNew ? slugify(v) : draft.slug })} />
          </Field>
          <Field label="Page address" htmlFor="f-slug" hint={slugTaken ? "Another project already uses this address." : `mainext.in/work/${draft.slug || "…"}`}>
            <Text id="f-slug" value={draft.slug} disabled={!isNew} onChange={(v) => set("slug", slugify(v))} />
          </Field>
          <Field label="Client" htmlFor="f-client" hint='Use "Own product" for your own apps.'>
            <Text id="f-client" value={draft.client} placeholder="Eclipse Innerwear" onChange={(v) => set("client", v)} />
          </Field>
          <Field label="Industry" htmlFor="f-industry">
            <Text id="f-industry" value={draft.industry} placeholder="Textile distribution" onChange={(v) => set("industry", v)} />
          </Field>
          <Field label="Category" htmlFor="f-cat" hint="Used for the filters and the placeholder screen.">
            <Select id="f-cat" value={draft.category} onChange={(v) => set("category", v)} options={CATEGORY_LABELS} />
          </Field>
          <Field label="Status" htmlFor="f-status">
            <Select id="f-status" value={draft.status} onChange={(v) => set("status", v)} options={STATUS_LABELS} />
          </Field>
          <Field label="Year" htmlFor="f-year">
            <Text id="f-year" value={draft.year} placeholder="2025" onChange={(v) => set("year", v)} />
          </Field>
          <Field label="How long it took" htmlFor="f-dur">
            <Text id="f-dur" value={draft.duration} placeholder="4 weeks" onChange={(v) => set("duration", v)} />
          </Field>
        </div>
        <Field label="One-line summary *" htmlFor="f-sum" hint="One sentence. Shown on the card.">
          <Text id="f-sum" value={draft.summary} placeholder="Invoice and billing system for a textile brand dispatching to many stores." onChange={(v) => set("summary", v)} />
        </Field>
      </Section>

      <Section title="2 · The story" desc="Write it the way you'd explain it to the next client.">
        <Field label="The problem" htmlFor="f-prob" hint="What was hard or slow before? Use the client's words.">
          <Area id="f-prob" value={draft.problem} onChange={(v) => set("problem", v)} placeholder="Invoices were typed by hand in Excel for every dispatch…" />
        </Field>
        <Field label="What you built" htmlFor="f-sol">
          <Area id="f-sol" value={draft.solution} onChange={(v) => set("solution", v)} placeholder="A guided invoice flow with saved products, GST rules and printable invoices." />
        </Field>
        <Field label="How AI helped (optional)" htmlFor="f-ai">
          <Area id="f-ai" rows={2} value={draft.aiNote} onChange={(v) => set("aiNote", v)} placeholder="AI drafted the invoice templates and GST test cases." />
        </Field>
      </Section>

      <Section title="3 · Features" desc="3 to 5 is ideal.">
        <Repeater
          items={draft.features}
          onChange={(v) => set("features", v)}
          make={() => ({ title: "", description: "" })}
          addLabel="Add feature"
          render={(f, update, i) => (
            <>
              <Text id={`f-feat-t-${i}`} value={f.title} placeholder="Feature name" onChange={(v) => update({ ...f, title: v })} aria-label="Feature name" />
              <Text id={`f-feat-d-${i}`} value={f.description} placeholder="One line about it" onChange={(v) => update({ ...f, description: v })} aria-label="Feature description" />
            </>
          )}
        />
      </Section>

      <Section title="4 · Results & tech" desc="Only real results. If there's no number, say what changed.">
        <Repeater
          items={draft.results}
          onChange={(v) => set("results", v)}
          make={() => ""}
          addLabel="Add result"
          render={(r, update, i) => <Text id={`f-res-${i}`} value={r} placeholder="Still in daily use since 2023" onChange={update} aria-label="Result" />}
        />
        <Field label="Tech stack" htmlFor="f-stack" hint="Separate with commas.">
          <Text id="f-stack" value={draft.stack.join(", ")} placeholder="React, Node.js, MySQL"
            onChange={(v) => set("stack", v.split(",").map((s) => s.trim()).filter(Boolean))} />
        </Field>
      </Section>

      <Section title="5 · Images" desc="Screenshots are compressed automatically. Blur client data before uploading. No image = a drawn placeholder screen.">
        {imgError && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{imgError}</p>}
        <Field label="Cover image (main screenshot)">
          <ImageSlot src={draft.cover} pending={pending} busy={busy} label="Upload cover" onPick={() => pick("cover")} onClear={() => set("cover", "")} />
        </Field>
        <Field label="Gallery (more screens)">
          <Repeater
            items={draft.gallery}
            onChange={(v) => set("gallery", v)}
            make={() => ({ src: "", caption: "" })}
            addLabel="Add empty slot"
            render={(g, update, i) => (
              <>
                <ImageSlot src={g.src} pending={pending} busy={busy} label="Upload" onPick={() => pick(i)} onClear={() => update({ ...g, src: "" })} />
                <Text id={`f-cap-${i}`} value={g.caption} placeholder="Caption (optional)" onChange={(v) => update({ ...g, caption: v })} aria-label="Caption" />
              </>
            )}
          />
          <button type="button" onClick={() => pick("new-gallery")} disabled={busy} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm hover:bg-secondary/70">
            <ImagePlus className="h-4 w-4" /> Upload several screenshots
          </button>
        </Field>
      </Section>

      <Section title="6 · Client quote (optional)">
        <Toggle id="f-has-t" checked={!!draft.testimonial} label="This project has a client quote"
          onChange={(v) => set("testimonial", v ? { quote: "", name: "", role: "" } : null)} />
        {draft.testimonial && (
          <div className="space-y-3">
            <Area id="f-t-q" value={draft.testimonial.quote} placeholder="What the client said" onChange={(v) => set("testimonial", { ...draft.testimonial!, quote: v })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Text id="f-t-n" value={draft.testimonial.name} placeholder="Name" onChange={(v) => set("testimonial", { ...draft.testimonial!, name: v })} aria-label="Name" />
              <Text id="f-t-r" value={draft.testimonial.role} placeholder="Role, Company" onChange={(v) => set("testimonial", { ...draft.testimonial!, role: v })} aria-label="Role" />
            </div>
          </div>
        )}
      </Section>

      <Section title="7 · Display">
        <div className="grid gap-3 sm:grid-cols-2">
          <Toggle id="f-pub" checked={draft.published} onChange={(v) => set("published", v)} label="Published" hint="Off = hidden from the site, kept as a draft." />
          <Toggle id="f-feat" checked={draft.featured} onChange={(v) => set("featured", v)} label="Show on homepage" hint="Off = only on the All work page." />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Card size on homepage" htmlFor="f-size">
            <Select id="f-size" value={draft.size} onChange={(v) => set("size", v)} options={SIZE_LABELS} />
          </Field>
          <Field label="Order" htmlFor="f-order" hint="Lower number shows first.">
            <Text id="f-order" type="number" value={String(draft.order)} onChange={(v) => set("order", Number(v) || 0)} />
          </Field>
        </div>
        <Field label="Live link (optional)" htmlFor="f-live" hint="Leave empty for private or internal software.">
          <Text id="f-live" value={draft.liveUrl} placeholder="https://…" onChange={(v) => set("liveUrl", v.trim())} />
        </Field>
      </Section>
    </div>
  );
};

export default ProjectEditor;

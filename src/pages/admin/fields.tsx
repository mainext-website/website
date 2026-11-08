import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary";

export const Field = ({ label, hint, htmlFor, children, className }: { label: string; hint?: string; htmlFor?: string; children: ReactNode; className?: string }) => (
  <div className={cn("space-y-1.5", className)}>
    <label htmlFor={htmlFor} className="block text-sm font-medium">{label}</label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export const Text = ({ id, value, onChange, placeholder, ...rest }: { id: string; value: string; onChange: (v: string) => void; placeholder?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) => (
  <input id={id} className={inputCls} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} {...rest} />
);

export const Area = ({ id, value, onChange, placeholder, rows = 3 }: { id: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) => (
  <textarea id={id} rows={rows} className={inputCls} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
);

export const Select = <T extends string>({ id, value, onChange, options }: { id: string; value: T; onChange: (v: T) => void; options: Record<T, string> }) => (
  <select id={id} className={inputCls} value={value} onChange={(e) => onChange(e.target.value as T)}>
    {(Object.keys(options) as T[]).map((k) => (
      <option key={k} value={k}>{options[k]}</option>
    ))}
  </select>
);

export const Toggle = ({ id, checked, onChange, label, hint }: { id: string; checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) => (
  <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3">
    <input id={id} type="checkbox" className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <span>
      <span className="block text-sm font-medium">{label}</span>
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
    </span>
  </label>
);

export const Section = ({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) => (
  <section className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
    <div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
    </div>
    {children}
  </section>
);

/** Generic add / remove / reorder list. */
export function Repeater<T>({
  items,
  onChange,
  render,
  make,
  addLabel,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  render: (item: T, update: (v: T) => void, index: number) => ReactNode;
  make: () => T;
  addLabel: string;
}) {
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 rounded-xl border border-border bg-background/50 p-3">
          <div className="min-w-0 flex-1 space-y-2">{render(item, (v) => onChange(items.map((x, k) => (k === i ? v : x))), i)}</div>
          <div className="flex flex-col gap-1">
            <button type="button" aria-label="Move up" onClick={() => move(i, -1)} className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-secondary"><ArrowUp className="h-4 w-4" /></button>
            <button type="button" aria-label="Move down" onClick={() => move(i, 1)} className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-secondary"><ArrowDown className="h-4 w-4" /></button>
            <button type="button" aria-label="Remove" onClick={() => onChange(items.filter((_, k) => k !== i))} className="grid h-8 w-8 place-items-center rounded-md text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, make()])} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary">
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}

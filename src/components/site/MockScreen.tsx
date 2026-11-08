import type { ProjectCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * A drawn "app screen" used when a project has no uploaded screenshot yet.
 * Each category gets its own believable UI so the grid never looks empty.
 */
const Bar = ({ w, className }: { w: string; className?: string }) => (
  <div className={cn("h-2 rounded-full bg-foreground/10", className)} style={{ width: w }} />
);

const Invoice = ({ title }: { title: string }) => (
  <div className="flex h-full flex-col gap-2 p-3 text-[10px]">
    <div className="flex justify-between font-mono text-muted-foreground">
      <span className="font-semibold text-foreground">{title}</span>
      <span>INV-0042</span>
    </div>
    <div className="grid grid-cols-[1fr_32px_56px] border-b border-dashed border-border pb-1 font-mono text-[9px] text-muted-foreground">
      <span>ITEM</span><span>QTY</span><span className="text-right">AMOUNT</span>
    </div>
    {[["Item A", "120", "₹14,400"], ["Item B", "80", "₹9,600"], ["Item C", "45", "₹11,250"], ["GST 5%", "", "₹1,763"]].map(([a, b, c]) => (
      <div key={a} className="grid grid-cols-[1fr_32px_56px] border-b border-dashed border-border pb-1 tabular-nums">
        <span>{a}</span><span>{b}</span><span className="text-right">{c}</span>
      </div>
    ))}
    <div className="mt-auto flex justify-between font-bold"><span>Total</span><span className="text-primary">₹37,013</span></div>
  </div>
);

const Dashboard = ({ title }: { title: string }) => (
  <div className="flex h-full flex-col gap-2 p-3 text-[10px]">
    <div className="flex justify-between font-mono text-muted-foreground">
      <span className="font-semibold text-foreground">{title}</span>
      <span>Today</span>
    </div>
    <div className="grid grid-cols-3 gap-1.5">
      {[["Sales", "₹2.4L"], ["Orders", "186"], ["Low stock", "7"]].map(([k, v]) => (
        <div key={k} className="rounded-md border border-border bg-background/60 p-1.5">
          <div className="text-[8px] text-muted-foreground">{k}</div>
          <div className="font-display text-xs font-bold">{v}</div>
        </div>
      ))}
    </div>
    <div className="mt-auto flex h-[45%] items-end gap-1 border-b border-border">
      {[40, 62, 48, 80, 66, 92, 74].map((h, i) => (
        <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-accent/25 to-accent" style={{ height: `${h}%` }} />
      ))}
    </div>
  </div>
);

const Website = ({ title }: { title: string }) => (
  <div className="flex h-full flex-col text-[10px]">
    <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
      <span className="font-display font-bold">{title}</span>
      <div className="flex gap-1.5"><Bar w="18px" /><Bar w="18px" /><Bar w="18px" /></div>
    </div>
    <div className="flex flex-1 flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-accent/20 to-primary/10 p-3 text-center">
      <Bar w="60%" className="h-3 bg-foreground/25" />
      <Bar w="40%" />
      <div className="mt-1 rounded-full bg-primary px-2 py-0.5 text-[8px] font-bold text-primary-foreground">Enquire on WhatsApp</div>
    </div>
    <div className="grid grid-cols-3 gap-1.5 p-2">
      {[0, 1, 2].map((i) => <div key={i} className="h-6 rounded bg-foreground/5" />)}
    </div>
  </div>
);

const Phone = ({ title }: { title: string }) => (
  <div className="flex h-full items-center justify-center p-3">
    <div className="flex h-full max-h-[220px] w-[44%] min-w-[80px] flex-col gap-1.5 rounded-[14px] border-2 border-foreground/15 bg-background/70 p-2 text-[9px]">
      <div className="mx-auto h-1 w-6 rounded-full bg-foreground/20" />
      <span className="font-display font-bold">{title}</span>
      <div className="h-10 rounded-md bg-gradient-to-br from-primary/40 to-accent/30" />
      <Bar w="80%" /><Bar w="60%" />
      <div className="mt-auto grid grid-cols-3 gap-1">{[0, 1, 2].map((i) => <div key={i} className="h-3 rounded bg-foreground/10" />)}</div>
    </div>
  </div>
);

const Automation = ({ title }: { title: string }) => (
  <div className="flex h-full flex-col gap-1 p-3 font-mono text-[9px]">
    <span className="font-semibold text-foreground">{title}</span>
    {["→ new order received", "✓ invoice generated", "✓ sent on WhatsApp", "✓ stock updated", "→ daily report 9:00"].map((l) => (
      <div key={l} className={l.startsWith("✓") ? "text-accent" : "text-muted-foreground"}>{l}</div>
    ))}
  </div>
);

interface MockScreenProps {
  category: ProjectCategory;
  title: string;
  className?: string;
}

const MockScreen = ({ category, title, className }: MockScreenProps) => {
  const short = title.length > 22 ? title.slice(0, 20) + "…" : title;
  const body =
    category === "billing" ? <Invoice title={short} /> :
    category === "erp" ? <Dashboard title={short} /> :
    category === "website" ? <Website title={short} /> :
    category === "app" ? <Phone title={short} /> :
    <Automation title={short} />;
  return (
    <div className={cn("h-full w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground", className)} aria-hidden="true">
      {body}
    </div>
  );
};

export default MockScreen;

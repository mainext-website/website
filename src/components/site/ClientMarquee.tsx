import { clientNames } from "@/lib/content";

const ClientMarquee = () => {
  if (clientNames.length === 0) return null;
  const row = [...clientNames, ...clientNames, ...clientNames];
  return (
    <section aria-label="Clients" className="border-y border-border py-6">
      <div className="container-x flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <p className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">Trusted by</p>
        <div className="marquee mask-fade-x min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track flex w-max gap-12">
            {[row, row].map((r, k) => (
              <div key={k} className="flex gap-12" aria-hidden={k === 1}>
                {r.map((c, i) => (
                  <span key={`${c}-${i}`} className="whitespace-nowrap font-display text-lg font-bold text-muted-foreground/80">
                    {c}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;

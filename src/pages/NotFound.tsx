import { Link } from "react-router-dom";
import SiteLayout from "@/components/site/SiteLayout";
import { useMeta } from "@/lib/useMeta";

const NotFound = () => {
  useMeta("Page not found · Mainext");
  return (
    <SiteLayout>
      <section className="container-x flex min-h-[70vh] flex-col items-start justify-center gap-6 pt-24">
        <p className="eyebrow">404</p>
        <h1 className="font-display text-5xl font-extrabold">This page doesn't exist.</h1>
        <p className="max-w-md text-muted-foreground">The link may be old. Everything I've built is on the work page.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">Go home</Link>
          <Link to="/work" className="btn-ghost">See all work</Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;

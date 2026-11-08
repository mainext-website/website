import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/content";
import ProjectVisual from "./ProjectVisual";
import Reveal from "./Reveal";

const ProductSpotlight = () => {
  const product = projects.find((p) => p.status === "own-product");
  if (!product) return null;
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="container-x">
        <div className="panel grid-bg relative grid items-center gap-10 overflow-hidden p-6 sm:p-12 lg:grid-cols-2">
          <div className="glow-bg pointer-events-none absolute inset-0" />
          <Reveal className="relative">
            <p className="eyebrow">My own product</p>
            <h2 className="section-title mt-3">{product.title}</h2>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">{product.summary}</p>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Building and running my own app keeps me sharp on everything a client product needs: design, releases,
              support and growth.
            </p>
            <Link to={`/work/${product.slug}`} className="btn-primary mt-8">
              See {product.title} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="relative h-[300px] sm:h-[360px]">
            <ProjectVisual project={product} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ProductSpotlight;

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { products } from "@/db/schema";

type Product = typeof products.$inferSelect;

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="container-site py-24 sm:py-32">
      <RevealOnScroll className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="section-eyebrow">Fresh off the workbench</p>
          <h2 className="mt-4 font-serif text-[clamp(1.9rem,4vw,2.9rem)] italic leading-tight text-charcoal">
            A few current favorites
          </h2>
        </div>
        <Link href="/shop" className="link-underline hidden items-center gap-1.5 text-sm font-semibold text-charcoal sm:inline-flex">
          Explore More <ArrowRight size={15} />
        </Link>
      </RevealOnScroll>

      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => (
          <RevealOnScroll key={product.id} delay={Math.min(i, 4) * 0.08}>
            <ProductCard product={product} />
          </RevealOnScroll>
        ))}
      </div>

      <div className="mt-12 flex justify-center sm:hidden">
        <Link href="/shop" className="btn-secondary">
          Explore More
        </Link>
      </div>
    </section>
  );
}

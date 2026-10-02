import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllCategoriesWithCounts } from "@/lib/data";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse our handmade collections — candles, leather goods, laser engraving, acrylic, and custom creations.",
};

export default async function CollectionsPage() {
  const categories = await getAllCategoriesWithCounts();

  return (
    <div className="pb-24 pt-32 sm:pt-36">
      <div className="container-site mb-16 max-w-2xl">
        <p className="section-eyebrow">Collections</p>
        <h1 className="mt-4 font-serif text-[clamp(2.1rem,4.4vw,3.2rem)] italic leading-tight text-charcoal">
          Different crafts, one creative home
        </h1>
        <p className="mt-4 text-charcoal-soft">
          Each collection has its own personality, but they all share the
          same hands and the same care. Step into whichever one calls to you.
        </p>
      </div>

      <div className="flex flex-col">
        {categories.map((cat, i) => (
          <RevealOnScroll key={cat.id}>
            <Link
              href={`/shop?category=${cat.slug}`}
              className="group relative grid min-h-[340px] items-center overflow-hidden border-t border-sand-dark first:border-t-0 sm:min-h-[420px] lg:grid-cols-2"
            >
              <div
                className={`relative order-2 h-[260px] overflow-hidden sm:h-[420px] ${
                  i % 2 === 0 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {cat.heroImage && (
                  <Image
                    src={cat.heroImage}
                    alt={cat.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <div
                className={`relative order-1 flex flex-col justify-center px-6 py-10 sm:px-14 sm:py-14 ${
                  i % 2 === 0 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <span className="text-xs uppercase tracking-[0.2em] text-terracotta-dark">
                  {cat.productCount} pieces
                </span>
                <h2 className="mt-3 flex items-center gap-3 font-serif text-3xl italic text-charcoal sm:text-4xl">
                  {cat.name}
                  <ArrowRight size={24} className="transition-transform duration-500 group-hover:translate-x-2" />
                </h2>
                <p className="mt-3 max-w-md text-charcoal-soft">{cat.description}</p>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}

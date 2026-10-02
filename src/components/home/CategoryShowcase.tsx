"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { categories } from "@/db/schema";

type Category = typeof categories.$inferSelect & { productCount?: number };

export default function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="container-site">
        <RevealOnScroll className="max-w-xl">
          <p className="section-eyebrow">Our creative worlds</p>
          <h2 className="mt-4 font-serif text-[clamp(1.9rem,4vw,2.9rem)] italic leading-tight text-charcoal">
            Five crafts, one treasury
          </h2>
          <p className="mt-4 text-base text-charcoal-soft">
            Every category feels a little different — step into whichever one
            calls to you.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <RevealOnScroll
              key={cat.id}
              delay={i * 0.08}
              className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className={`group relative block overflow-hidden rounded-[1.75rem] bg-charcoal ${
                  i === 0 ? "aspect-[16/10]" : "aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]"
                }`}
              >
                {cat.heroImage && (
                  <Image
                    src={cat.heroImage}
                    alt={cat.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 sm:p-7">
                  <span className="text-xs uppercase tracking-[0.2em] text-cream/70">
                    {cat.productCount ?? 0} pieces
                  </span>
                  <div className="flex items-center gap-2 transition-transform duration-500 group-hover:translate-x-1.5">
                    <h3 className="font-serif text-2xl italic text-cream sm:text-3xl">{cat.name}</h3>
                    <ArrowRight
                      size={20}
                      className="mt-1 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>
                  <p className="mt-1 max-w-xs text-sm text-cream/75 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {cat.tagline}
                  </p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Star } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { testimonials } from "@/db/schema";

type Testimonial = typeof testimonials.$inferSelect;

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="container-site py-24 sm:py-32">
      <RevealOnScroll className="mx-auto max-w-xl text-center">
        <p className="section-eyebrow">Kind words</p>
        <h2 className="mt-4 font-serif text-[clamp(1.9rem,4vw,2.9rem)] italic leading-tight text-charcoal">
          From our craft-show family
        </h2>
      </RevealOnScroll>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((t, i) => (
          <RevealOnScroll key={t.id} delay={i * 0.08}>
            <figure className="h-full rounded-2xl border border-sand-dark bg-white/60 p-7 sm:p-8">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: t.rating ?? 5 }).map((_, idx) => (
                  <Star key={idx} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-4 font-serif text-lg italic leading-relaxed text-charcoal">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-charcoal-soft">
                {t.name} <span className="font-normal text-taupe">— {t.location}</span>
              </figcaption>
            </figure>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

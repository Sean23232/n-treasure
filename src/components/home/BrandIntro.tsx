import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function BrandIntro() {
  return (
    <section className="container-site grid gap-10 py-24 sm:py-32 lg:grid-cols-2 lg:items-center lg:gap-16">
      <RevealOnScroll direction="right" className="relative order-2 aspect-[4/5] overflow-hidden rounded-[2rem] lg:order-1">
        <Image
          src="/images/brand-intro.jpg"
          alt="Hands arranging a small collection of handmade candles and leather keepsakes"
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-cover"
        />
      </RevealOnScroll>
      <div className="order-1 lg:order-2">
        <RevealOnScroll>
          <p className="section-eyebrow">One roof, many crafts</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="mt-4 text-balance font-serif text-[clamp(1.9rem,4vw,3rem)] italic leading-tight text-charcoal">
            A little bit of this. A little bit of that.
            <br className="hidden sm:block" /> All made with care.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-soft">
            Necessary Treasures started the way most good things do — a little
            curiosity, a lot of trial and error, and a shared love of making
            things with our hands. What began as candles on a kitchen table
            grew into leather goods, laser engraving, and acrylic pieces, all
            brought together under one roof. Different materials, same hands,
            same care.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.3}>
          <a href="/our-story" className="link-underline mt-6 inline-block text-sm font-semibold text-terracotta-dark">
            Read our full story →
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

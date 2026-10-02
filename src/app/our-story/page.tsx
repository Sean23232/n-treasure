import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meet the husband-and-wife team behind Necessary Treasures and learn how candles, leather, engraving, and acrylic crafts came together under one roof.",
};

const TIMELINE = [
  {
    year: "2016",
    title: "A kitchen table and a soy wax kit",
    text: "It started small — a beginner's candle kit, a few jars, and a lot of trial and error on a Tuesday night.",
  },
  {
    year: "2018",
    title: "Our first craft show",
    text: "We nervously set up a six-foot table at a local fall market. We sold out of candles by 2pm and came home already planning the next one.",
  },
  {
    year: "2020",
    title: "Leather joined the table",
    text: "One of us picked up a leather stitching kit during a slow season, and it turned into its own full line within a year.",
  },
  {
    year: "2022",
    title: "A laser cutter changed everything",
    text: "Suddenly we could personalize almost anything — signs, cutting boards, ornaments, and gifts people couldn't find anywhere else.",
  },
  {
    year: "Today",
    title: "Necessary Treasures",
    text: "Candles, leather, engraving, acrylic, and custom work, all under one name — because to us, it was always the same business: making things for people, by hand.",
  },
];

export default function OurStoryPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-36">
      <div className="container-site mb-20 grid items-center gap-12 lg:grid-cols-2">
        <RevealOnScroll>
          <p className="section-eyebrow">Our Story</p>
          <h1 className="mt-4 text-balance font-serif text-[clamp(2.1rem,4.6vw,3.4rem)] italic leading-tight text-charcoal">
            Two makers. One table. A lot of necessary treasures.
          </h1>
          <p className="mt-5 max-w-lg leading-relaxed text-charcoal-soft">
            We&rsquo;re a husband-and-wife team who fell into handmade crafting
            almost by accident and never looked back. What started as a single
            candle hobby slowly grew into a small collection of crafts we
            both love — and a lot of weekends spent at local craft shows
            meeting people who felt more like neighbors than customers.
          </p>
        </RevealOnScroll>
        <RevealOnScroll direction="left" className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/brand-intro.jpg"
            alt="A close up of handmade candles and leather keepsakes being arranged by hand"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </RevealOnScroll>
      </div>

      <section className="bg-charcoal py-24 text-cream">
        <div className="container-site max-w-3xl text-center">
          <RevealOnScroll>
            <p className="font-serif text-[clamp(1.6rem,3.6vw,2.4rem)] italic leading-snug text-balance">
              &ldquo;We never set out to build a brand. We just kept making
              things we loved, for people who seemed to love them too.&rdquo;
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="container-site py-24">
        <RevealOnScroll className="mx-auto mb-14 max-w-xl text-center">
          <p className="section-eyebrow">How we got here</p>
          <h2 className="mt-4 font-serif text-[clamp(1.9rem,4vw,2.9rem)] italic leading-tight text-charcoal">
            A timeline of necessary treasures
          </h2>
        </RevealOnScroll>

        <div className="mx-auto max-w-2xl">
          {TIMELINE.map((item, i) => (
            <RevealOnScroll key={item.year} delay={i * 0.06} className="relative flex gap-6 pb-12 last:pb-0">
              <div className="flex flex-col items-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta/10 font-serif text-sm italic text-terracotta-dark">
                  {item.year}
                </span>
                {i < TIMELINE.length - 1 && <span className="mt-2 w-px flex-1 bg-sand-dark" />}
              </div>
              <div className="pb-2">
                <h3 className="font-serif text-xl italic text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{item.text}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="container-site grid gap-6 pb-10 sm:grid-cols-3">
        {["/images/craftsmanship.jpg", "/images/category-leather.jpg", "/images/category-laser.jpg"].map((src) => (
          <RevealOnScroll key={src} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={src} alt="Behind the scenes at the Necessary Treasures studio" fill sizes="33vw" className="object-cover" />
          </RevealOnScroll>
        ))}
      </section>

      <section className="container-site mt-20 flex flex-col items-center gap-5 rounded-[2rem] bg-ivory px-6 py-16 text-center">
        <h2 className="font-serif text-2xl italic text-charcoal sm:text-3xl">
          Come say hello at the next show, or right here online.
        </h2>
        <p className="max-w-md text-charcoal-soft">
          We still love meeting people in person — but we&rsquo;re so glad you
          found us here too.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="btn-primary">Explore the Shop</Link>
          <Link href="/contact" className="btn-secondary">Say Hello</Link>
        </div>
      </section>
    </div>
  );
}

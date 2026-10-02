import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Craftsmanship() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-cream sm:py-36">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <div>
          <RevealOnScroll>
            <p className="section-eyebrow text-terracotta-light">Made with care</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="mt-4 text-balance font-serif text-[clamp(2rem,4.4vw,3.2rem)] italic leading-tight">
              Made by hand. Made with care. Made to become someone&rsquo;s
              favorite thing.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/75">
              Every piece that leaves our studio is touched by hand more than
              once — measured, cut, poured, stitched, sanded, or engraved by
              one of us personally. We keep batches small on purpose. It means
              occasional waitlists, but it also means the quality never slips.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3} className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {[
              ["100%", "Hand-finished"],
              ["5", "Craft disciplines"],
              ["1000+", "Treasures made"],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-serif text-3xl italic text-terracotta-light">{stat}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-cream/60">{label}</p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
        <RevealOnScroll direction="left" className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/craftsmanship.jpg"
            alt="Artisan hands finishing a handmade wood and leather piece in the workshop"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}

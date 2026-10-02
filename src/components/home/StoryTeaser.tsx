import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function StoryTeaser() {
  return (
    <section className="container-site py-24 sm:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <RevealOnScroll className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/category-custom.jpg"
            alt="The Necessary Treasures crafting desk mid-project"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </RevealOnScroll>
        <div>
          <RevealOnScroll>
            <p className="section-eyebrow">Our Story</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="mt-4 text-balance font-serif text-[clamp(1.9rem,4vw,2.9rem)] italic leading-tight text-charcoal">
              Two people, a folding table, and a lot of craft shows
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-charcoal-soft">
              Necessary Treasures began the way most handmade businesses do —
              nights at the kitchen table, weekends at craft fairs, and a lot
              of conversations with people who became more like friends than
              customers. This website is our way of bringing that same warmth
              online.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <Link href="/our-story" className="btn-secondary mt-8 w-fit">
              Meet the Makers <ArrowRight size={16} />
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function CustomOrdersCta() {
  return (
    <section className="container-site py-24 sm:py-32">
      <RevealOnScroll className="relative overflow-hidden rounded-[2rem] bg-sage/90">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-16 sm:px-14 sm:py-20">
            <p className="section-eyebrow text-cream/80">Have an idea?</p>
            <h2 className="mt-4 text-balance font-serif text-[clamp(1.9rem,4vw,2.8rem)] italic leading-tight text-cream">
              Let&rsquo;s make something that doesn&rsquo;t exist yet.
            </h2>
            <p className="mt-5 max-w-md text-cream/85">
              From engraved gifts to one-of-a-kind keepsakes, our custom
              process is simple: tell us your idea, and we&rsquo;ll take it
              from there.
            </p>
            <Link href="/custom-orders" className="btn-light mt-8 w-fit !border-cream">
              Start a Custom Order <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative min-h-[280px]">
            <Image
              src="/images/category-custom.jpg"
              alt="A crafting desk mid-sketch for a custom handmade order"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

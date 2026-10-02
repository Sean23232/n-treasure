import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { galleryImages } from "@/db/schema";

type GalleryImage = typeof galleryImages.$inferSelect;

export default function GalleryPreview({ images }: { images: GalleryImage[] }) {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="container-site">
        <RevealOnScroll className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="section-eyebrow">From the studio</p>
            <h2 className="mt-4 font-serif text-[clamp(1.9rem,4vw,2.9rem)] italic leading-tight text-charcoal">
              A peek behind the treasures
            </h2>
          </div>
          <Link href="/gallery" className="link-underline hidden items-center gap-1.5 text-sm font-semibold text-charcoal sm:inline-flex">
            View Full Gallery <ArrowRight size={15} />
          </Link>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {images.slice(0, 8).map((img, i) => (
            <RevealOnScroll
              key={img.id}
              delay={(i % 4) * 0.08}
              className={i === 0 || i === 5 ? "col-span-2 row-span-2 sm:col-span-2" : ""}
            >
              <Link
                href="/gallery"
                className={`group relative block overflow-hidden rounded-xl bg-sand ${
                  i === 0 || i === 5 ? "aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={img.imageUrl}
                  alt={img.caption || "Necessary Treasures handmade piece"}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/gallery" className="btn-secondary">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { getCategories, getGalleryImages } from "@/lib/data";
import GalleryGrid from "@/components/GalleryGrid";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of our handmade candles, leather goods, laser engravings, and acrylic creations — then shop the pieces you love.",
};

export default async function GalleryPage() {
  const [images, categories] = await Promise.all([getGalleryImages(), getCategories()]);

  return (
    <div className="container-site pb-24 pt-32 sm:pt-36">
      <RevealOnScroll className="mb-12 max-w-2xl">
        <p className="section-eyebrow">Gallery</p>
        <h1 className="mt-4 font-serif text-[clamp(2.1rem,4.4vw,3.2rem)] italic leading-tight text-charcoal">
          A peek behind the treasures
        </h1>
        <p className="mt-4 text-charcoal-soft">
          See something you love? Click through to shop it, or browse by
          craft to find your next favorite piece.
        </p>
      </RevealOnScroll>

      <GalleryGrid images={images} categories={categories} />
    </div>
  );
}

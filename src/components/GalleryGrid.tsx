"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { categories, galleryImages } from "@/db/schema";

type Category = typeof categories.$inferSelect;
type GalleryImage = typeof galleryImages.$inferSelect;

export default function GalleryGrid({
  images,
  categories,
}: {
  images: GalleryImage[];
  categories: Category[];
}) {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (activeFilter ? images.filter((img) => img.categoryId === activeFilter) : images),
    [images, activeFilter],
  );

  const activeImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;
  const activeCategory = activeImage
    ? categories.find((c) => c.id === activeImage.categoryId)
    : null;

  const next = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  const prev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2.5">
        <button
          onClick={() => setActiveFilter(null)}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            activeFilter === null ? "border-charcoal bg-charcoal text-cream" : "border-sand-dark text-charcoal-soft hover:border-charcoal"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              activeFilter === cat.id ? "border-charcoal bg-charcoal text-cream" : "border-sand-dark text-charcoal-soft hover:border-charcoal"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {filtered.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setLightboxIndex(i)}
            className="group relative block w-full overflow-hidden rounded-xl bg-sand"
          >
            <Image
              src={img.imageUrl}
              alt={img.caption || "Necessary Treasures handmade piece"}
              width={500}
              height={i % 3 === 0 ? 650 : 500}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-left text-xs text-cream">{img.caption}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-charcoal/92 p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              aria-label="Close"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-5 top-5 rounded-full bg-cream/10 p-2.5 text-cream hover:bg-cream/20"
            >
              <X size={20} />
            </button>
            <button
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-2.5 text-cream hover:bg-cream/20 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-2.5 text-cream hover:bg-cream/20 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative flex max-h-full max-w-3xl flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[70vh] w-full overflow-hidden rounded-2xl">
                <Image
                  src={activeImage.imageUrl}
                  alt={activeImage.caption || ""}
                  width={900}
                  height={900}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                {activeImage.caption && <p className="text-cream/90">{activeImage.caption}</p>}
                {activeCategory && (
                  <Link
                    href={`/shop?category=${activeCategory.slug}`}
                    className="btn-light"
                  >
                    Shop {activeCategory.name} <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

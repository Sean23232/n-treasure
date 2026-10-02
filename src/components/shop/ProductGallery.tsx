"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const pics = images.length ? images : ["/images/hero.jpg"];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-sand">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative h-full w-full"
          >
            <Image src={pics[active]} alt={name} fill priority sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
      {pics.length > 1 && (
        <div className="mt-4 flex gap-3">
          {pics.map((pic, i) => (
            <button
              key={pic + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors ${
                active === i ? "border-terracotta" : "border-transparent"
              }`}
            >
              <Image src={pic} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

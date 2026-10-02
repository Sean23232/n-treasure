"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.14, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/hero.jpg"
          alt="A warm, styled flatlay of handmade candles, leather goods, and crafted keepsakes made by Necessary Treasures"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-charcoal/10" />
      </motion.div>

      <motion.div
        className="container-site relative z-10 pb-20 pt-40 sm:pb-28"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="section-eyebrow text-terracotta-light">
          Handmade by a husband &amp; wife studio
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-5 max-w-3xl font-serif text-[clamp(2.6rem,6.2vw,5rem)] italic leading-[1.04] text-cream text-balance"
        >
          Made by hand.
          <br />
          Made to mean something.
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-lg text-lg leading-relaxed text-cream/85">
          Thoughtfully crafted candles, leather goods, engravings, and little
          treasures made with care — plus custom pieces made just for you.
        </motion.p>
        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/shop" className="btn-primary">
            Explore the Collection <ArrowRight size={16} />
          </Link>
          <Link href="/custom-orders" className="btn-light">
            Start a Custom Order
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-7 right-7 hidden flex-col items-center gap-2 text-cream/70 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-cream/50" />
      </motion.div>
    </section>
  );
}

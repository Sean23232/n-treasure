"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import type { products } from "@/db/schema";

type Product = typeof products.$inferSelect;

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const images = (product.images as string[]) ?? [];
  const primary = images[0] ?? "/images/hero.jpg";
  const secondary = images[1];
  const soldOut = !product.isAvailable || product.inventory === 0;

  return (
    <div className="group relative flex flex-col">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
        <Image
          src={primary}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            secondary ? "group-hover:opacity-0" : ""
          }`}
        />
        {secondary && (
          <Image
            src={secondary}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
        )}
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-charcoal/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
            Sold Out
          </span>
        )}
        {!soldOut && product.inventory !== null && product.inventory <= 3 && (
          <span className="absolute left-3 top-3 rounded-full bg-terracotta/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
            Only {product.inventory} left
          </span>
        )}
        <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-cream opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={16} className="text-charcoal" />
        </span>
      </Link>

      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/shop/${product.slug}`}>
            <h3 className="truncate font-serif text-[1.05rem] italic text-charcoal">{product.name}</h3>
          </Link>
          {product.shortDescription && (
            <p className="mt-0.5 line-clamp-1 text-[0.82rem] text-charcoal-soft">{product.shortDescription}</p>
          )}
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-sm font-semibold text-charcoal">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-taupe line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>
        <button
          type="button"
          disabled={soldOut}
          aria-label={`Add ${product.name} to cart`}
          onClick={() =>
            addItem({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: parseFloat(product.price),
              image: primary,
            })
          }
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-charcoal text-charcoal transition-colors hover:bg-charcoal hover:text-cream disabled:cursor-not-allowed disabled:border-taupe disabled:text-taupe disabled:hover:bg-transparent"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

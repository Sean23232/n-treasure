"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { categories } from "@/db/schema";

type Category = typeof categories.$inferSelect;

export default function ShopFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") ?? "";
  const activeSort = searchParams.get("sort") ?? "newest";
  const activeAvailability = searchParams.get("availability") ?? "";
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", search);
  };

  const hasFilters = activeCategory || activeAvailability || searchParams.get("search");

  return (
    <div className="mb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={onSearchSubmit} className="flex w-full max-w-sm items-center gap-2 rounded-full border border-sand-dark bg-white px-4 py-2.5">
          <Search size={16} className="text-taupe" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-taupe"
          />
        </form>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full border border-sand-dark bg-white px-4 py-2.5 text-sm font-medium sm:hidden"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>

          <select
            value={activeSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="hidden rounded-full border border-sand-dark bg-white px-4 py-2.5 text-sm outline-none sm:block"
            aria-label="Sort products"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
        </div>
      </div>

      <div className={`${open ? "flex" : "hidden"} mt-4 flex-wrap items-center gap-2.5 sm:flex`}>
        <button
          type="button"
          onClick={() => updateParam("category", "")}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            !activeCategory ? "border-charcoal bg-charcoal text-cream" : "border-sand-dark text-charcoal-soft hover:border-charcoal"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => updateParam("category", cat.slug)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              activeCategory === cat.slug
                ? "border-charcoal bg-charcoal text-cream"
                : "border-sand-dark text-charcoal-soft hover:border-charcoal"
            }`}
          >
            {cat.name}
          </button>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-sand-dark sm:block" />
        <button
          type="button"
          onClick={() => updateParam("availability", activeAvailability === "in-stock" ? "" : "in-stock")}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            activeAvailability === "in-stock"
              ? "border-charcoal bg-charcoal text-cream"
              : "border-sand-dark text-charcoal-soft hover:border-charcoal"
          }`}
        >
          In Stock Only
        </button>

        <select
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="rounded-full border border-sand-dark bg-white px-4 py-1.5 text-sm outline-none sm:hidden"
          aria-label="Sort products"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
        </select>

        {hasFilters && (
          <button
            type="button"
            onClick={() => router.push(pathname)}
            className="flex items-center gap-1 text-sm font-medium text-terracotta-dark"
          >
            <X size={14} /> Clear
          </button>
        )}
      </div>
    </div>
  );
}

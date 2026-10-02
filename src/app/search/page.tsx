import type { Metadata } from "next";
import { searchSite } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const term = q?.trim() ?? "";
  const results = term ? await searchSite(term) : [];

  return (
    <div className="container-site min-h-[60vh] pb-24 pt-32 sm:pt-36">
      <p className="section-eyebrow">Search</p>
      <h1 className="mt-4 font-serif text-[clamp(1.9rem,4vw,2.8rem)] italic leading-tight text-charcoal">
        {term ? `Results for “${term}”` : "Search our treasures"}
      </h1>

      {term && (
        <p className="mt-3 text-charcoal-soft">
          {results.length} {results.length === 1 ? "result" : "results"} found
        </p>
      )}

      {term && results.length === 0 && (
        <p className="mt-10 text-charcoal-soft">
          Nothing matched that search — try a category name like
          &ldquo;candles&rdquo; or &ldquo;leather&rdquo;.
        </p>
      )}

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { getCategories, getShopProducts } from "@/lib/data";
import ShopFilters from "@/components/shop/ShopFilters";
import ProductCard from "@/components/ProductCard";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Shop All Handmade Goods",
  description:
    "Browse handmade candles, leather goods, laser engravings, acrylic pieces, and custom creations from Necessary Treasures.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const search = typeof sp.search === "string" ? sp.search : undefined;
  const sort = typeof sp.sort === "string" ? sp.sort : undefined;
  const availability = typeof sp.availability === "string" ? sp.availability : undefined;

  const [categories, products] = await Promise.all([
    getCategories(),
    getShopProducts({ category, search, sort, availability }),
  ]);

  return (
    <div className="container-site pb-24 pt-32 sm:pt-36">
      <div className="mb-10 max-w-2xl">
        <p className="section-eyebrow">The Shop</p>
        <h1 className="mt-4 font-serif text-[clamp(2.1rem,4.4vw,3.2rem)] italic leading-tight text-charcoal">
          Come explore what we&rsquo;ve been making
        </h1>
        <p className="mt-4 text-charcoal-soft">
          Every piece is made in small batches by hand — once it&rsquo;s gone,
          it may not come back the same way twice.
        </p>
      </div>

      <ShopFilters categories={categories} />

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <p className="font-serif text-2xl italic text-charcoal">Nothing here just yet.</p>
          <p className="text-charcoal-soft">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product, i) => (
            <RevealOnScroll key={product.id} delay={Math.min(i % 8, 6) * 0.05} amount={0.05}>
              <ProductCard product={product} />
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProductBySlug, getRelatedProducts } from "@/lib/data";
import { formatPrice, truncate } from "@/lib/utils";
import ProductGallery from "@/components/shop/ProductGallery";
import AddToCartPanel from "@/components/shop/AddToCartPanel";
import ProductCard from "@/components/ProductCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { ShieldCheck, Sparkles, Truck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.shortDescription || truncate(product.description || "", 155),
    openGraph: {
      title: product.name,
      description: product.shortDescription ?? "",
      images: (product.images as string[])?.slice(0, 1),
    },
    alternates: { canonical: `/shop/${product.slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [categories, related] = await Promise.all([
    getCategories(),
    getRelatedProducts(product.categoryId, product.id),
  ]);
  const category = categories.find((c) => c.id === product.categoryId);
  const images = (product.images as string[]) ?? [];

  return (
    <div className="container-site pb-24 pt-32 sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.shortDescription,
            image: images,
            sku: product.sku,
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: product.price,
              availability: product.isAvailable
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-charcoal-soft">
        <NextLink href="/shop" className="hover:text-terracotta">Shop</NextLink>
        <span>/</span>
        {category && (
          <>
            <NextLink href={`/shop?category=${category.slug}`} className="hover:text-terracotta">
              {category.name}
            </NextLink>
            <span>/</span>
          </>
        )}
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={images} name={product.name} />

        <div>
          {category && (
            <NextLink href={`/shop?category=${category.slug}`} className="section-eyebrow">
              {category.name}
            </NextLink>
          )}
          <h1 className="mt-3 font-serif text-[clamp(1.8rem,4vw,2.6rem)] italic leading-tight text-charcoal">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-semibold text-charcoal">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-base text-taupe line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            {product.isCustomizable && (
              <span className="rounded-full bg-sage/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-dark">
                Customizable
              </span>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-charcoal-soft">{product.description}</p>

          {!product.isAvailable || product.inventory === 0 ? (
            <p className="mt-4 text-sm font-semibold text-terracotta-dark">Currently sold out — join the waitlist via our contact page.</p>
          ) : (
            product.inventory !== null &&
            product.inventory <= 5 && (
              <p className="mt-4 text-sm font-semibold text-terracotta-dark">
                Only {product.inventory} left in this batch
              </p>
            )
          )}

          <AddToCartPanel
            productId={product.id}
            slug={product.slug}
            name={product.name}
            price={parseFloat(product.price)}
            image={images[0] ?? "/images/hero.jpg"}
            isAvailable={product.isAvailable}
            inventory={product.inventory}
            isCustomizable={product.isCustomizable}
          />

          <div className="mt-10 grid gap-4 border-y border-sand py-7 sm:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <Sparkles size={18} className="mt-0.5 shrink-0 text-terracotta" />
              <p className="text-xs leading-snug text-charcoal-soft">Hand-finished in small batches</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Truck size={18} className="mt-0.5 shrink-0 text-terracotta" />
              <p className="text-xs leading-snug text-charcoal-soft">Ships within 3–5 business days</p>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-terracotta" />
              <p className="text-xs leading-snug text-charcoal-soft">Secure checkout, easy returns</p>
            </div>
          </div>

          {(product.materials || product.careInstructions) && (
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              {product.materials && (
                <div>
                  <h2 className="text-sm font-semibold text-charcoal">Materials &amp; Details</h2>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{product.materials}</p>
                </div>
              )}
              {product.careInstructions && (
                <div>
                  <h2 className="text-sm font-semibold text-charcoal">Care Instructions</h2>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{product.careInstructions}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="mt-20 rounded-[2rem] bg-ivory px-6 py-10 sm:px-10">
        <h2 className="font-serif text-2xl italic text-charcoal">Made with care</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-soft">
          This piece was shaped by hand in our home studio. We keep our
          batches small so each item gets real attention before it reaches
          you — it&rsquo;s slower, but it&rsquo;s how we like to work. If this
          item has a custom option and you&rsquo;d like something slightly
          different, visit our{" "}
          <NextLink href="/custom-orders" className="link-underline text-terracotta-dark">
            Custom Orders
          </NextLink>{" "}
          page and tell us about it.
        </p>
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl italic text-charcoal">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4">
            {related.map((p) => (
              <RevealOnScroll key={p.id}>
                <ProductCard product={p} />
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

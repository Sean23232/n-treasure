import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import ProductRowActions from "@/components/admin/ProductRowActions";

export default async function AdminProductsPage() {
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      price: products.price,
      inventory: products.inventory,
      isAvailable: products.isAvailable,
      isFeatured: products.isFeatured,
      status: products.status,
      images: products.images,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(desc(products.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl italic text-charcoal">Products</h1>
          <p className="mt-2 text-charcoal-soft">{rows.length} products in your catalog.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-sand-dark bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-sand-dark bg-ivory/60 text-xs uppercase tracking-wide text-charcoal-soft">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Inventory</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {rows.map((p) => {
              const image = (p.images as string[])?.[0];
              return (
                <tr key={p.id}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-sand">
                        {image && <Image src={image} alt={p.name} fill className="object-cover" />}
                      </div>
                      <div>
                        <p className="font-medium text-charcoal">{p.name}</p>
                        {p.isFeatured && <span className="text-xs text-terracotta-dark">Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-charcoal-soft">{p.categoryName ?? "—"}</td>
                  <td className="px-5 py-3 text-charcoal">{formatPrice(p.price)}</td>
                  <td className="px-5 py-3 text-charcoal-soft">{p.inventory}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        p.status === "published" && p.isAvailable
                          ? "bg-sage/20 text-sage-dark"
                          : "bg-sand text-charcoal-soft"
                      }`}
                    >
                      {p.status === "draft" ? "Draft" : p.isAvailable ? "Live" : "Sold Out"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <ProductRowActions id={p.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

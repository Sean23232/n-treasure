export const dynamic = 'force-dynamic'


import { notFound } from "next/navigation";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCategories } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product] = await db.select().from(products).where(eq(products.id, Number(id))).limit(1);
  if (!product) notFound();

  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-serif text-3xl italic text-charcoal">Edit Product</h1>
      <p className="mt-2 text-charcoal-soft">{product.name}</p>
      <div className="mt-8">
        <ProductForm categories={categories} product={product} />
      </div>
    </div>
  );
}

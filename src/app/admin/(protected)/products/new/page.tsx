export const dynamic = 'force-dynamic'


import { getCategories } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-serif text-3xl italic text-charcoal">Add Product</h1>
      <p className="mt-2 text-charcoal-soft">Fill in the details below — you can edit this anytime.</p>
      <div className="mt-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}

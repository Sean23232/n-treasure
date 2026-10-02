"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Trash2, UploadCloud } from "lucide-react";
import type { categories, products } from "@/db/schema";

type Category = typeof categories.$inferSelect;
type Product = typeof products.$inferSelect;

export default function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<{
    name: string;
    categoryId: number | null;
    shortDescription: string;
    description: string;
    materials: string;
    careInstructions: string;
    price: string;
    compareAtPrice: string | null;
    sku: string;
    inventory: number;
    images: string[];
    isAvailable: boolean;
    isFeatured: boolean;
    isCustomizable: boolean;
    status: string;
  }>({
    name: product?.name ?? "",
    categoryId: product?.categoryId ?? (categories[0]?.id ?? null),
    shortDescription: product?.shortDescription ?? "",
    description: product?.description ?? "",
    materials: product?.materials ?? "",
    careInstructions: product?.careInstructions ?? "",
    price: product?.price ?? "",
    compareAtPrice: product?.compareAtPrice ?? "",
    sku: product?.sku ?? "",
    inventory: product?.inventory ?? 0,
    images: (product?.images as string[]) ?? [],
    isAvailable: product?.isAvailable ?? true,
    isFeatured: product?.isFeatured ?? false,
    isCustomizable: product?.isCustomizable ?? false,
    status: product?.status ?? "published",
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(
        Array.from(fileList).map(async (file) => {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("folder", "products");
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          return data.url as string;
        }),
      );
      update("images", [...form.images, ...urls]);
    } catch {
      setError("Image upload failed. Please try a smaller image.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url: string) => update("images", form.images.filter((i) => i !== url));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload = { ...form, inventory: Number(form.inventory) };
      const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const method = product ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Could not save product. Please check required fields.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="flex flex-col gap-6">
        <section className="rounded-2xl border border-sand-dark bg-white p-6">
          <h2 className="font-serif text-lg italic text-charcoal">Basics</h2>
          <div className="mt-4 grid gap-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">Product Name *</span>
              <input required className="field" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">Short Description</span>
              <input className="field" value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} maxLength={280} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">Full Description</span>
              <textarea rows={5} className="field" value={form.description} onChange={(e) => update("description", e.target.value)} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-charcoal">Materials</span>
                <textarea rows={2} className="field" value={form.materials} onChange={(e) => update("materials", e.target.value)} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-charcoal">Care Instructions</span>
                <textarea rows={2} className="field" value={form.careInstructions} onChange={(e) => update("careInstructions", e.target.value)} />
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-sand-dark bg-white p-6">
          <h2 className="font-serif text-lg italic text-charcoal">Images</h2>
          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sand-dark bg-cream px-6 py-10 text-center transition-colors hover:border-terracotta">
            <UploadCloud size={22} className="text-taupe" />
            <span className="text-sm text-charcoal-soft">
              {uploading ? "Uploading…" : "Drag & drop images or click to upload"}
            </span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => onFiles(e.target.files)} />
          </label>
          {form.images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {form.images.map((img) => (
                <div key={img} className="group relative h-20 w-20 overflow-hidden rounded-lg bg-sand">
                  <Image src={img} alt="" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="absolute inset-0 flex items-center justify-center bg-charcoal/60 text-cream opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="flex flex-col gap-6">
        <section className="rounded-2xl border border-sand-dark bg-white p-6">
          <h2 className="font-serif text-lg italic text-charcoal">Pricing &amp; Inventory</h2>
          <div className="mt-4 grid gap-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">Price (USD) *</span>
              <input required type="number" step="0.01" min="0" className="field" value={form.price} onChange={(e) => update("price", e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">Compare-at Price</span>
              <input type="number" step="0.01" min="0" className="field" value={form.compareAtPrice ?? ""} onChange={(e) => update("compareAtPrice", e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">SKU</span>
              <input className="field" value={form.sku ?? ""} onChange={(e) => update("sku", e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">Inventory</span>
              <input type="number" min="0" className="field" value={form.inventory} onChange={(e) => update("inventory", Number(e.target.value))} />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-sand-dark bg-white p-6">
          <h2 className="font-serif text-lg italic text-charcoal">Organization</h2>
          <div className="mt-4 grid gap-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">Category</span>
              <select
                className="field"
                value={form.categoryId ?? ""}
                onChange={(e) => update("categoryId", e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">None</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">Status</span>
              <select className="field" value={form.status} onChange={(e) => update("status", e.target.value as "published" | "draft")}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </label>
            <label className="flex items-center gap-2.5 text-sm text-charcoal">
              <input type="checkbox" checked={form.isAvailable} onChange={(e) => update("isAvailable", e.target.checked)} className="h-4 w-4 accent-terracotta" />
              Available for purchase
            </label>
            <label className="flex items-center gap-2.5 text-sm text-charcoal">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} className="h-4 w-4 accent-terracotta" />
              Feature on homepage
            </label>
            <label className="flex items-center gap-2.5 text-sm text-charcoal">
              <input type="checkbox" checked={form.isCustomizable} onChange={(e) => update("isCustomizable", e.target.checked)} className="h-4 w-4 accent-terracotta" />
              Offers customization
            </label>
          </div>
        </section>

        {error && <p className="text-sm font-medium text-terracotta-dark">{error}</p>}

        <button type="submit" disabled={submitting || uploading} className="btn-primary w-full justify-center">
          {submitting ? <Loader2 size={16} className="animate-spin" /> : product ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Trash2, UploadCloud } from "lucide-react";
import type { categories, galleryImages } from "@/db/schema";

type Category = typeof categories.$inferSelect;
type GalleryImage = typeof galleryImages.$inferSelect;

export default function GalleryManager({
  images,
  categories,
}: {
  images: GalleryImage[];
  categories: Category[];
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");

  const onFile = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", fileList[0]);
      fd.append("folder", "gallery");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error();

      await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: data.url,
          caption,
          categoryId: categoryId ? Number(categoryId) : null,
        }),
      });
      setCaption("");
      router.refresh();
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm("Remove this image from the gallery?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div>
      <div className="rounded-2xl border border-sand-dark bg-white p-6">
        <h2 className="font-serif text-lg italic text-charcoal">Add Image</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input placeholder="Caption (optional)" className="field" value={caption} onChange={(e) => setCaption(e.target.value)} />
          <select className="field" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sand-dark bg-cream px-6 py-8 text-center transition-colors hover:border-terracotta">
          {uploading ? <Loader2 size={20} className="animate-spin text-taupe" /> : <UploadCloud size={20} className="text-taupe" />}
          <span className="text-sm text-charcoal-soft">{uploading ? "Uploading…" : "Click to upload an image"}</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files)} disabled={uploading} />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl bg-sand">
            <Image src={img.imageUrl} alt={img.caption || ""} fill className="object-cover" />
            <button
              onClick={() => onDelete(img.id)}
              className="absolute inset-0 flex items-center justify-center bg-charcoal/60 text-cream opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Delete image"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

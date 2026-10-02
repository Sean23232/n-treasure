export const dynamic = 'force-dynamic'


import { getCategories, getGalleryImages } from "@/lib/data";
import GalleryManager from "@/components/admin/GalleryManager";

export default async function AdminGalleryPage() {
  const [images, categories] = await Promise.all([getGalleryImages(), getCategories()]);

  return (
    <div>
      <h1 className="font-serif text-3xl italic text-charcoal">Gallery</h1>
      <p className="mt-2 text-charcoal-soft">Upload photos of your work for the public gallery page.</p>
      <div className="mt-8">
        <GalleryManager images={images} categories={categories} />
      </div>
    </div>
  );
}

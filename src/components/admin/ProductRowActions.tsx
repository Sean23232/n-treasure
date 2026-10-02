"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductRowActions({ id }: { id: number }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const onDelete = async () => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(true);
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin/products/${id}/edit`}
        className="rounded-lg p-2 text-charcoal-soft hover:bg-sand hover:text-charcoal"
        aria-label="Edit product"
      >
        <Pencil size={15} />
      </Link>
      <button
        onClick={onDelete}
        disabled={deleting}
        className="rounded-lg p-2 text-charcoal-soft hover:bg-terracotta/10 hover:text-terracotta-dark"
        aria-label="Delete product"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function AddToCartPanel({
  productId,
  slug,
  name,
  price,
  image,
  isAvailable,
  inventory,
  isCustomizable,
}: {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  isAvailable: boolean;
  inventory: number | null;
  isCustomizable: boolean;
}) {
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);
  const soldOut = !isAvailable || inventory === 0;

  const handleAdd = () => {
    addItem({ productId, slug, name, price, image, customNote: note || undefined }, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addItem({ productId, slug, name, price, image, customNote: note || undefined }, quantity);
    router.push("/checkout");
  };

  return (
    <div className="mt-8">
      {isCustomizable && (
        <div className="mb-6">
          <label htmlFor="custom-note" className="mb-2 block text-sm font-semibold text-charcoal">
            Personalization details (optional)
          </label>
          <textarea
            id="custom-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Names, dates, colors, or anything we should know…"
            className="w-full rounded-xl border border-sand-dark bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3 rounded-full border border-sand-dark px-3 py-2">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-1 text-charcoal hover:text-terracotta"
          >
            <Minus size={15} />
          </button>
          <span className="w-5 text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="p-1 text-charcoal hover:text-terracotta"
          >
            <Plus size={15} />
          </button>
        </div>

        <button
          type="button"
          disabled={soldOut}
          onClick={handleAdd}
          className="btn-primary flex-1 sm:flex-none disabled:cursor-not-allowed disabled:bg-taupe disabled:shadow-none disabled:hover:translate-y-0"
        >
          {added ? (
            <>
              <Check size={16} /> Added to Cart
            </>
          ) : soldOut ? (
            "Sold Out"
          ) : (
            "Add to Cart"
          )}
        </button>

        {!soldOut && (
          <button type="button" onClick={handleBuyNow} className="btn-secondary flex-1 sm:flex-none">
            Buy Now
          </button>
        )}
      </div>
      {added && (
        <button onClick={openCart} className="mt-3 text-sm font-medium text-terracotta-dark underline">
          View cart
        </button>
      )}
    </div>
  );
}

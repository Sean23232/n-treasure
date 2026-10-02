"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <div className="container-site min-h-[60vh] pb-24 pt-32 sm:pt-36">
      <h1 className="font-serif text-[clamp(2.1rem,4.4vw,3rem)] italic leading-tight text-charcoal">Your Cart</h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-2xl italic text-charcoal">Your cart is quietly empty.</p>
          <p className="text-charcoal-soft">Go find a little treasure worth keeping.</p>
          <Link href="/shop" className="btn-primary mt-2">Explore the Shop</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <ul className="flex flex-col divide-y divide-sand">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-5 py-6">
                <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-sand">
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/shop/${item.slug}`} className="font-serif text-lg italic text-charcoal hover:text-terracotta">
                        {item.name}
                      </Link>
                      {item.customNote && <p className="mt-1 text-sm italic text-charcoal-soft">“{item.customNote}”</p>}
                    </div>
                    <button aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.productId)} className="text-taupe hover:text-terracotta">
                      <X size={17} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3 rounded-full border border-sand-dark px-3 py-1.5">
                      <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1 text-charcoal hover:text-terracotta">
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-sm">{item.quantity}</span>
                      <button aria-label="Increase quantity" onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1 text-charcoal hover:text-terracotta">
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-semibold text-charcoal">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit rounded-2xl border border-sand-dark bg-white/60 p-7">
            <h2 className="font-serif text-xl italic text-charcoal">Order Summary</h2>
            <div className="mt-5 flex items-center justify-between text-sm text-charcoal-soft">
              <span>Subtotal</span>
              <span className="font-semibold text-charcoal">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-charcoal-soft">
              Free shipping on orders $75+. Final shipping shown at checkout.
            </p>
            <Link href="/checkout" className="btn-primary mt-6 w-full">Proceed to Checkout</Link>
            <Link href="/shop" className="mt-4 block text-center text-sm font-medium text-charcoal-soft hover:text-terracotta">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

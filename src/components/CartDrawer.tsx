"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] bg-charcoal/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
        >
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            className="ml-auto flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-sand px-6 py-5">
              <h2 className="flex items-center gap-2 font-serif text-xl italic text-charcoal">
                <ShoppingBag size={19} /> Your Cart
              </h2>
              <button aria-label="Close cart" onClick={closeCart} className="rounded-full p-2 hover:bg-black/5">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <p className="font-serif text-2xl italic text-charcoal">Your cart is quietly empty.</p>
                <p className="text-sm text-charcoal-soft">
                  Go find a little treasure worth keeping.
                </p>
                <Link href="/shop" onClick={closeCart} className="btn-primary mt-2">
                  Explore the Shop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="flex flex-col gap-5">
                    {items.map((item) => (
                      <li key={item.productId} className="flex gap-4">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-sand">
                          {item.image && (
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/shop/${item.slug}`}
                              onClick={closeCart}
                              className="text-sm font-semibold text-charcoal hover:text-terracotta"
                            >
                              {item.name}
                            </Link>
                            <button
                              aria-label={`Remove ${item.name}`}
                              onClick={() => removeItem(item.productId)}
                              className="text-taupe hover:text-terracotta"
                            >
                              <X size={15} />
                            </button>
                          </div>
                          {item.customNote && (
                            <p className="mt-0.5 text-xs italic text-charcoal-soft">“{item.customNote}”</p>
                          )}
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 rounded-full border border-sand-dark px-2 py-1">
                              <button
                                aria-label="Decrease quantity"
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="p-0.5 text-charcoal hover:text-terracotta"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-4 text-center text-sm">{item.quantity}</span>
                              <button
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="p-0.5 text-charcoal hover:text-terracotta"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="text-sm font-semibold text-charcoal">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-sand px-6 py-6">
                  <div className="flex items-center justify-between text-sm text-charcoal-soft">
                    <span>Subtotal</span>
                    <span className="text-base font-semibold text-charcoal">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-charcoal-soft">Shipping &amp; totals calculated at checkout.</p>
                  <Link href="/checkout" onClick={closeCart} className="btn-primary mt-4 w-full">
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="mt-3 block text-center text-sm font-medium text-charcoal-soft hover:text-terracotta"
                  >
                    View full cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

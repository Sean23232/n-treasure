"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });

  const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 7.5;
  const total = subtotal + shipping;

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            image: i.image,
            price: i.price,
            quantity: i.quantity,
            customNote: i.customNote ?? "",
          })),
        }),
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      clearCart();
      router.push(`/checkout/confirmation/${data.orderNumber}`);
    } catch {
      setError("We couldn't place your order. Please check your details and try again.");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-site flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-32 text-center">
        <p className="font-serif text-2xl italic text-charcoal">Your cart is empty.</p>
        <Link href="/shop" className="btn-primary">Explore the Shop</Link>
      </div>
    );
  }

  return (
    <div className="container-site pb-24 pt-32 sm:pt-36">
      <h1 className="font-serif text-[clamp(2.1rem,4.4vw,3rem)] italic leading-tight text-charcoal">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="mb-4 font-serif text-xl italic text-charcoal">Contact Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full Name" className="field" value={form.customerName} onChange={(e) => update("customerName", e.target.value)} />
              <input required type="email" placeholder="Email" className="field" value={form.email} onChange={(e) => update("email", e.target.value)} />
              <input placeholder="Phone" className="field sm:col-span-2" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl italic text-charcoal">Shipping Address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Street Address" className="field sm:col-span-2" value={form.address} onChange={(e) => update("address", e.target.value)} />
              <input required placeholder="City" className="field" value={form.city} onChange={(e) => update("city", e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="State" className="field" value={form.state} onChange={(e) => update("state", e.target.value)} />
                <input required placeholder="ZIP" className="field" value={form.zip} onChange={(e) => update("zip", e.target.value)} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl italic text-charcoal">Order Notes (optional)</h2>
            <textarea rows={3} placeholder="Anything we should know about your order?" className="field" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
          </section>

          <div className="rounded-2xl bg-ivory p-5 text-sm text-charcoal-soft">
            <p className="flex items-center gap-2 font-semibold text-charcoal">
              <Lock size={15} /> How payment works
            </p>
            <p className="mt-2 leading-relaxed">
              We&rsquo;ll confirm your order right away and follow up by email
              with a secure payment link to complete your purchase — just
              like we would at a craft show, but a little more official.
            </p>
          </div>

          {error && <p className="text-sm font-medium text-terracotta-dark">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-fit">
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Placing Order…
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </div>

        <aside className="h-fit rounded-2xl border border-sand-dark bg-white/60 p-7">
          <h2 className="font-serif text-xl italic text-charcoal">Order Summary</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                </div>
                <div className="flex flex-1 items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-charcoal">{item.name}</p>
                    <p className="text-xs text-charcoal-soft">Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-charcoal">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-sand pt-5 text-sm">
            <div className="flex justify-between text-charcoal-soft">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-charcoal-soft">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-sand pt-2 text-base font-semibold text-charcoal">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

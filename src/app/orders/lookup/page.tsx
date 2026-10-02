"use client";

import Image from "next/image";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type OrderResult = {
  order: {
    orderNumber: string;
    customerName: string;
    status: string;
    total: string;
    createdAt: string;
  };
  items: Array<{
    id: number;
    productName: string;
    productImage: string;
    unitPrice: string;
    quantity: number;
  }>;
};

const STATUS_LABEL: Record<string, string> = {
  awaiting_payment: "Awaiting Payment",
  paid: "Paid",
  processing: "In Progress",
  shipped: "Shipped",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function OrderLookupPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<OrderResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResult(null);
    try {
      const res = await fetch(`/api/orders/lookup?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResult(data);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container-site min-h-[60vh] pb-24 pt-32 sm:pt-36">
      <div className="mx-auto max-w-lg text-center">
        <p className="section-eyebrow">Track an Order</p>
        <h1 className="mt-4 font-serif text-[clamp(1.9rem,4vw,2.8rem)] italic leading-tight text-charcoal">
          Check on your treasure
        </h1>
        <p className="mt-4 text-charcoal-soft">
          Enter your order number and the email you used at checkout.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mx-auto mt-10 flex max-w-lg flex-col gap-4 sm:flex-row">
        <input
          required
          placeholder="Order number (e.g. NT-240101-1234)"
          className="field"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={status === "loading"} className="btn-primary shrink-0">
          {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          Look Up
        </button>
      </form>

      {status === "error" && (
        <p className="mx-auto mt-6 max-w-lg text-center text-sm font-medium text-terracotta-dark">
          We couldn&rsquo;t find a matching order. Double check your order number and email.
        </p>
      )}

      {result && (
        <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-sand-dark bg-white/60 p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-serif text-lg italic text-charcoal">#{result.order.orderNumber}</p>
              <p className="text-sm text-charcoal-soft">{result.order.customerName}</p>
            </div>
            <span className="rounded-full bg-sage/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-dark">
              {STATUS_LABEL[result.order.status] ?? result.order.status}
            </span>
          </div>
          <ul className="mt-5 flex flex-col gap-4 border-t border-sand pt-5">
            {result.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                  {item.productImage && <Image src={item.productImage} alt={item.productName} fill className="object-cover" />}
                </div>
                <div className="flex flex-1 justify-between text-sm">
                  <span className="text-charcoal">{item.productName} × {item.quantity}</span>
                  <span className="font-semibold text-charcoal">{formatPrice(parseFloat(item.unitPrice) * item.quantity)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex justify-between border-t border-sand pt-4 text-base font-semibold text-charcoal">
            <span>Total</span>
            <span>{formatPrice(result.order.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

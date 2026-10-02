import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

export const metadata = { title: "Order Confirmed" };

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  if (!order) notFound();

  return (
    <div className="container-site flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-32 text-center sm:pt-36">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20 text-sage-dark">
        <CheckCircle2 size={32} />
      </div>
      <h1 className="mt-7 font-serif text-[clamp(2rem,4.4vw,2.8rem)] italic leading-tight text-charcoal">
        Thank you, {order.customerName.split(" ")[0]}.
      </h1>
      <p className="mt-4 max-w-md text-charcoal-soft">
        Your order <span className="font-semibold text-charcoal">#{order.orderNumber}</span> has
        been received. We&rsquo;ll send a confirmation and a secure payment
        link to <span className="font-medium text-charcoal">{order.email}</span> shortly.
      </p>
      <div className="mt-8 w-full max-w-sm rounded-2xl border border-sand-dark bg-white/60 p-6 text-left text-sm">
        <div className="flex justify-between text-charcoal-soft">
          <span>Subtotal</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="mt-2 flex justify-between text-charcoal-soft">
          <span>Shipping</span>
          <span>{parseFloat(order.shipping ?? "0") === 0 ? "Free" : formatPrice(order.shipping ?? "0")}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-sand pt-2 text-base font-semibold text-charcoal">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
        <Link href="/orders/lookup" className="btn-secondary">Track This Order</Link>
      </div>
    </div>
  );
}

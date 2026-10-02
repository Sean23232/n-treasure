export const dynamic = 'force-dynamic'


import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import StatusSelect from "@/components/admin/StatusSelect";

const STATUS_OPTIONS = [
  { value: "awaiting_payment", label: "Awaiting Payment" },
  { value: "paid", label: "Paid" },
  { value: "processing", label: "In Progress" },
  { value: "shipped", label: "Shipped" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.id, Number(id))).limit(1);
  if (!order) notFound();
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl italic text-charcoal">Order #{order.orderNumber}</h1>
          <p className="mt-2 text-charcoal-soft">Placed {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <StatusSelect id={order.id} endpoint="/api/admin/orders" value={order.status} options={STATUS_OPTIONS} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-sand-dark bg-white p-6">
          <h2 className="font-serif text-lg italic text-charcoal">Items</h2>
          <ul className="mt-4 flex flex-col divide-y divide-sand">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 py-4">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                  {item.productImage && <Image src={item.productImage} alt={item.productName} fill className="object-cover" />}
                </div>
                <div className="flex flex-1 items-start justify-between">
                  <div>
                    <p className="font-medium text-charcoal">{item.productName}</p>
                    <p className="text-sm text-charcoal-soft">Qty {item.quantity}</p>
                    {item.customNote && <p className="mt-1 text-xs italic text-charcoal-soft">“{item.customNote}”</p>}
                  </div>
                  <span className="font-semibold text-charcoal">{formatPrice(parseFloat(item.unitPrice) * item.quantity)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1.5 border-t border-sand pt-4 text-sm">
            <div className="flex justify-between text-charcoal-soft"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            <div className="flex justify-between text-charcoal-soft"><span>Shipping</span><span>{formatPrice(order.shipping ?? "0")}</span></div>
            <div className="flex justify-between text-base font-semibold text-charcoal"><span>Total</span><span>{formatPrice(order.total)}</span></div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-sand-dark bg-white p-6">
            <h2 className="font-serif text-lg italic text-charcoal">Customer</h2>
            <div className="mt-3 space-y-1 text-sm text-charcoal-soft">
              <p className="font-medium text-charcoal">{order.customerName}</p>
              <p>{order.email}</p>
              {order.phone && <p>{order.phone}</p>}
            </div>
          </div>
          <div className="rounded-2xl border border-sand-dark bg-white p-6">
            <h2 className="font-serif text-lg italic text-charcoal">Shipping Address</h2>
            <div className="mt-3 space-y-1 text-sm text-charcoal-soft">
              <p>{order.address}</p>
              <p>{order.city}, {order.state} {order.zip}</p>
            </div>
          </div>
          {order.notes && (
            <div className="rounded-2xl border border-sand-dark bg-white p-6">
              <h2 className="font-serif text-lg italic text-charcoal">Notes</h2>
              <p className="mt-3 text-sm text-charcoal-soft">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

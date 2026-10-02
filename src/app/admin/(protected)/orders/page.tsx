import Link from "next/link";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";
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

export default async function AdminOrdersPage() {
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));

  return (
    <div>
      <h1 className="font-serif text-3xl italic text-charcoal">Orders</h1>
      <p className="mt-2 text-charcoal-soft">{rows.length} orders placed.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-sand-dark bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-sand-dark bg-ivory/60 text-xs uppercase tracking-wide text-charcoal-soft">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {rows.map((o) => (
              <tr key={o.id}>
                <td className="px-5 py-3">
                  <Link href={`/admin/orders/${o.id}`} className="font-medium text-charcoal hover:text-terracotta">
                    #{o.orderNumber}
                  </Link>
                </td>
                <td className="px-5 py-3 text-charcoal-soft">{o.customerName}</td>
                <td className="px-5 py-3 text-charcoal-soft">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-3 text-charcoal">{formatPrice(o.total)}</td>
                <td className="px-5 py-3">
                  <StatusSelect id={o.id} endpoint="/api/admin/orders" value={o.status} options={STATUS_OPTIONS} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-8 text-center text-charcoal-soft">No orders yet.</p>}
      </div>
    </div>
  );
}

import Link from "next/link";
import { db } from "@/db";
import { products, orders, customOrderRequests } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboard() {
  const [productCount] = await db.select({ count: sql<number>`count(*)`.mapWith(Number) }).from(products);
  const [orderStats] = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number), revenue: sql<string>`coalesce(sum(${orders.total}), 0)` })
    .from(orders);
  const [newRequestsCount] = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(customOrderRequests)
    .where(eq(customOrderRequests.status, "new"));
  const [lowStockCount] = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(products)
    .where(sql`${products.inventory} <= 3 and ${products.isAvailable} = true`);

  const recentOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(5);
  const recentRequests = await db
    .select()
    .from(customOrderRequests)
    .orderBy(desc(customOrderRequests.createdAt))
    .limit(5);

  const stats = [
    { label: "Total Products", value: productCount.count },
    { label: "Orders Placed", value: orderStats.count },
    { label: "Revenue", value: formatPrice(orderStats.revenue) },
    { label: "New Custom Requests", value: newRequestsCount.count },
    { label: "Low Stock Items", value: lowStockCount.count },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl italic text-charcoal">Welcome back</h1>
      <p className="mt-2 text-charcoal-soft">Here&rsquo;s what&rsquo;s happening with Necessary Treasures.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-sand-dark bg-white p-5">
            <p className="text-2xl font-semibold text-charcoal">{s.value}</p>
            <p className="mt-1 text-xs text-charcoal-soft">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-sand-dark bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl italic text-charcoal">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-medium text-terracotta-dark">View all</Link>
          </div>
          <ul className="mt-4 flex flex-col divide-y divide-sand">
            {recentOrders.length === 0 && <p className="py-4 text-sm text-charcoal-soft">No orders yet.</p>}
            {recentOrders.map((o) => (
              <li key={o.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <Link href={`/admin/orders/${o.id}`} className="font-medium text-charcoal hover:text-terracotta">#{o.orderNumber}</Link>
                  <p className="text-xs text-charcoal-soft">{o.customerName}</p>
                </div>
                <span className="font-semibold text-charcoal">{formatPrice(o.total)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-sand-dark bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl italic text-charcoal">Recent Custom Requests</h2>
            <Link href="/admin/custom-orders" className="text-sm font-medium text-terracotta-dark">View all</Link>
          </div>
          <ul className="mt-4 flex flex-col divide-y divide-sand">
            {recentRequests.length === 0 && <p className="py-4 text-sm text-charcoal-soft">No requests yet.</p>}
            {recentRequests.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <Link href={`/admin/custom-orders/${r.id}`} className="font-medium text-charcoal hover:text-terracotta">{r.name}</Link>
                  <p className="text-xs text-charcoal-soft">{r.category || "General"}</p>
                </div>
                <span className="rounded-full bg-sand px-2.5 py-1 text-xs font-medium capitalize text-charcoal-soft">{r.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

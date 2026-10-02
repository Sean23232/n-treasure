import Link from "next/link";
import { db } from "@/db";
import { customOrderRequests } from "@/db/schema";
import { desc } from "drizzle-orm";
import StatusSelect from "@/components/admin/StatusSelect";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In Review" },
  { value: "responded", label: "Responded" },
  { value: "archived", label: "Archived" },
];

export default async function AdminCustomOrdersPage() {
  const rows = await db.select().from(customOrderRequests).orderBy(desc(customOrderRequests.createdAt));

  return (
    <div>
      <h1 className="font-serif text-3xl italic text-charcoal">Custom Order Requests</h1>
      <p className="mt-2 text-charcoal-soft">{rows.length} inquiries received.</p>

      <div className="mt-8 flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl border border-sand-dark bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Link href={`/admin/custom-orders/${r.id}`} className="font-serif text-lg italic text-charcoal hover:text-terracotta">
                  {r.projectTitle || "Untitled Request"}
                </Link>
                <p className="mt-1 text-sm text-charcoal-soft">{r.name} · {r.email} · {r.category}</p>
              </div>
              <StatusSelect id={r.id} endpoint="/api/admin/custom-orders" value={r.status} options={STATUS_OPTIONS} />
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-charcoal-soft">{r.description}</p>
            <p className="mt-2 text-xs text-taupe">{new Date(r.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="rounded-2xl border border-sand-dark bg-white p-10 text-center text-charcoal-soft">
            No custom order requests yet.
          </div>
        )}
      </div>
    </div>
  );
}

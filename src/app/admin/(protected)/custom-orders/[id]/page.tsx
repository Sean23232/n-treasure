import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { customOrderRequests } from "@/db/schema";
import { eq } from "drizzle-orm";
import StatusSelect from "@/components/admin/StatusSelect";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In Review" },
  { value: "responded", label: "Responded" },
  { value: "archived", label: "Archived" },
];

export default async function AdminCustomOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [r] = await db.select().from(customOrderRequests).where(eq(customOrderRequests.id, Number(id))).limit(1);
  if (!r) notFound();
  const fileUrls = (r.fileUrls as string[]) ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl italic text-charcoal">{r.projectTitle || "Untitled Request"}</h1>
          <p className="mt-2 text-charcoal-soft">Submitted {new Date(r.createdAt).toLocaleString()}</p>
        </div>
        <StatusSelect id={r.id} endpoint="/api/admin/custom-orders" value={r.status} options={STATUS_OPTIONS} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-sand-dark bg-white p-6">
          <h2 className="font-serif text-lg italic text-charcoal">Project Details</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal-soft">Category</dt>
              <dd className="mt-1 text-charcoal">{r.category || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal-soft">Quantity</dt>
              <dd className="mt-1 text-charcoal">{r.quantity || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal-soft">Deadline</dt>
              <dd className="mt-1 text-charcoal">{r.deadline || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal-soft">Budget</dt>
              <dd className="mt-1 text-charcoal">{r.budgetRange || "—"}</dd>
            </div>
          </dl>
          <div className="mt-5">
            <h3 className="text-xs uppercase tracking-wide text-charcoal-soft">Description</h3>
            <p className="mt-2 whitespace-pre-line text-charcoal-soft">{r.description}</p>
          </div>
          {r.additionalNotes && (
            <div className="mt-5">
              <h3 className="text-xs uppercase tracking-wide text-charcoal-soft">Additional Notes</h3>
              <p className="mt-2 whitespace-pre-line text-charcoal-soft">{r.additionalNotes}</p>
            </div>
          )}
          {fileUrls.length > 0 && (
            <div className="mt-5">
              <h3 className="text-xs uppercase tracking-wide text-charcoal-soft">Attachments</h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {fileUrls.map((url) => (
                  <a key={url} href={url} target="_blank" rel="noreferrer" className="relative h-20 w-20 overflow-hidden rounded-lg bg-sand">
                    <Image src={url} alt="Attachment" fill className="object-cover" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-sand-dark bg-white p-6">
          <h2 className="font-serif text-lg italic text-charcoal">Contact</h2>
          <div className="mt-3 space-y-1 text-sm text-charcoal-soft">
            <p className="font-medium text-charcoal">{r.name}</p>
            <p>{r.email}</p>
            {r.phone && <p>{r.phone}</p>}
          </div>
          <a href={`mailto:${r.email}`} className="btn-primary mt-5 w-full justify-center">Reply by Email</a>
        </div>
      </div>
    </div>
  );
}

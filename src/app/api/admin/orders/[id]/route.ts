import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-api";
import { eq } from "drizzle-orm";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const { status } = await req.json();

  const [row] = await db
    .update(orders)
    .set({ status })
    .where(eq(orders.id, Number(id)))
    .returning();

  return NextResponse.json({ ok: true, order: row });
}

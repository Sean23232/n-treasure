import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { galleryImages } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-api";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await db.delete(galleryImages).where(eq(galleryImages.id, Number(id)));
  return NextResponse.json({ ok: true });
}

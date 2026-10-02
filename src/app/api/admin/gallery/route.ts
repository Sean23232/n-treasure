import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { galleryImages } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-api";
import { z } from "zod";

const schema = z.object({
  imageUrl: z.string().min(1),
  caption: z.string().optional().default(""),
  categoryId: z.number().nullable(),
});

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const body = await req.json();
  const data = schema.parse(body);
  const [row] = await db.insert(galleryImages).values(data).returning();
  return NextResponse.json({ ok: true, image: row });
}

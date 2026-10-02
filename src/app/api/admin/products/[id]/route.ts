import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-api";
import { eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  categoryId: z.number().nullable(),
  shortDescription: z.string().optional().default(""),
  description: z.string().optional().default(""),
  materials: z.string().optional().default(""),
  careInstructions: z.string().optional().default(""),
  price: z.string().min(1),
  compareAtPrice: z.string().optional().nullable(),
  sku: z.string().optional().default(""),
  inventory: z.number().default(0),
  images: z.array(z.string()).default([]),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isCustomizable: z.boolean().default(false),
  status: z.enum(["published", "draft"]).default("published"),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const [row] = await db
      .update(products)
      .set({ ...data, compareAtPrice: data.compareAtPrice || null, updatedAt: new Date() })
      .where(eq(products.id, Number(id)))
      .returning();

    return NextResponse.json({ ok: true, product: row });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not update product" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await db.delete(products).where(eq(products.id, Number(id)));
  return NextResponse.json({ ok: true });
}

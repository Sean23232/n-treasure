import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-api";
import { slugify } from "@/lib/utils";
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

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json();
    const data = schema.parse(body);
    let slug = slugify(data.name);

    const existing = await db.select().from(products).where(eq(products.slug, slug));
    if (existing.length > 0) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    const [row] = await db
      .insert(products)
      .values({
        ...data,
        slug,
        compareAtPrice: data.compareAtPrice || null,
      })
      .returning();

    return NextResponse.json({ ok: true, product: row });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not create product" }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { customOrderRequests } from "@/db/schema";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  category: z.string().optional().default(""),
  projectTitle: z.string().optional().default(""),
  description: z.string().min(1),
  quantity: z.string().optional().default(""),
  deadline: z.string().optional().default(""),
  budgetRange: z.string().optional().default(""),
  fileUrls: z.array(z.string()).optional().default([]),
  additionalNotes: z.string().optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const [row] = await db.insert(customOrderRequests).values(data).returning();

    return NextResponse.json({ ok: true, id: row.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not submit request" }, { status: 400 });
  }
}

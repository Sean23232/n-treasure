import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { and, eq, ilike } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const orderNumber = req.nextUrl.searchParams.get("orderNumber")?.trim();
  const email = req.nextUrl.searchParams.get("email")?.trim();

  if (!orderNumber || !email) {
    return NextResponse.json({ error: "Order number and email are required" }, { status: 400 });
  }

  const [order] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.orderNumber, orderNumber.toUpperCase()), ilike(orders.email, email)))
    .limit(1);

  if (!order) {
    return NextResponse.json({ error: "We couldn't find a matching order." }, { status: 404 });
  }

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return NextResponse.json({ order, items });
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { generateOrderNumber } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

const itemSchema = z.object({
  productId: z.number(),
  name: z.string(),
  image: z.string().optional().default(""),
  price: z.number(),
  quantity: z.number().min(1),
  customNote: z.string().optional().default(""),
});

const schema = z.object({
  customerName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  address: z.string().optional().default(""),
  city: z.string().optional().default(""),
  state: z.string().optional().default(""),
  zip: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  items: z.array(itemSchema).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const subtotal = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 7.5;
    const total = subtotal + shipping;
    const orderNumber = generateOrderNumber();

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        notes: data.notes,
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        total: total.toFixed(2),
      })
      .returning();

    await db.insert(orderItems).values(
      data.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        productName: item.name,
        productImage: item.image,
        unitPrice: item.price.toFixed(2),
        quantity: item.quantity,
        customNote: item.customNote,
      })),
    );

    for (const item of data.items) {
      await db
        .update(products)
        .set({ inventory: sql`greatest(${products.inventory} - ${item.quantity}, 0)` })
        .where(eq(products.id, item.productId));
    }

    return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not place order" }, { status: 400 });
  }
}

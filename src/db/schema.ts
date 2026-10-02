import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  numeric,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  tagline: varchar("tagline", { length: 200 }).default(""),
  description: text("description").default(""),
  heroImage: text("hero_image").default(""),
  accentColor: varchar("accent_color", { length: 40 }).default("#C97C5D"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  shortDescription: varchar("short_description", { length: 280 }).default(""),
  description: text("description").default(""),
  materials: text("materials").default(""),
  careInstructions: text("care_instructions").default(""),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric("compare_at_price", { precision: 10, scale: 2 }),
  sku: varchar("sku", { length: 60 }).default(""),
  inventory: integer("inventory").default(0),
  images: jsonb("images").$type<string[]>().default([]),
  isAvailable: boolean("is_available").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isCustomizable: boolean("is_customizable").default(false).notNull(),
  status: varchar("status", { length: 20 }).default("published").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 30 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 60 }).default(""),
  address: text("address").default(""),
  city: varchar("city", { length: 120 }).default(""),
  state: varchar("state", { length: 120 }).default(""),
  zip: varchar("zip", { length: 20 }).default(""),
  notes: text("notes").default(""),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  shipping: numeric("shipping", { precision: 10, scale: 2 }).default("0"),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 30 }).default("awaiting_payment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => orders.id, { onDelete: "cascade" })
    .notNull(),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "set null",
  }),
  productName: varchar("product_name", { length: 180 }).notNull(),
  productImage: text("product_image").default(""),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
  customNote: text("custom_note").default(""),
});

export const customOrderRequests = pgTable("custom_order_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 60 }).default(""),
  category: varchar("category", { length: 120 }).default(""),
  projectTitle: varchar("project_title", { length: 200 }).default(""),
  description: text("description").notNull(),
  quantity: varchar("quantity", { length: 60 }).default(""),
  deadline: varchar("deadline", { length: 60 }).default(""),
  budgetRange: varchar("budget_range", { length: 60 }).default(""),
  fileUrls: jsonb("file_urls").$type<string[]>().default([]),
  additionalNotes: text("additional_notes").default(""),
  status: varchar("status", { length: 30 }).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  location: varchar("location", { length: 160 }).default(""),
  quote: text("quote").notNull(),
  rating: integer("rating").default(5),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: varchar("caption", { length: 220 }).default(""),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "set null",
  }),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

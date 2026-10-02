import { db } from "@/db";
import {
  categories,
  products,
  galleryImages,
  testimonials,
} from "@/db/schema";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";

export async function getCategories() {
  return db.select().from(categories).orderBy(categories.sortOrder);
}

export async function getCategoryBySlug(slug: string) {
  const rows = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getFeaturedProducts(limit = 8) {
  return db
    .select()
    .from(products)
    .where(and(eq(products.isFeatured, true), eq(products.status, "published")))
    .orderBy(desc(products.createdAt))
    .limit(limit);
}

export type ShopFilters = {
  category?: string;
  search?: string;
  sort?: string;
  availability?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function getShopProducts(filters: ShopFilters) {
  const conditions = [eq(products.status, "published")];

  if (filters.category) {
    const cat = await getCategoryBySlug(filters.category);
    if (cat) conditions.push(eq(products.categoryId, cat.id));
    else conditions.push(sql`false`);
  }

  if (filters.search) {
    const term = `%${filters.search}%`;
    conditions.push(
      sql`(${ilike(products.name, term)} or ${ilike(products.shortDescription, term)} or ${ilike(products.description, term)})`,
    );
  }

  if (filters.availability === "in-stock") {
    conditions.push(eq(products.isAvailable, true));
  }

  let orderBy = desc(products.createdAt);
  if (filters.sort === "price-asc") orderBy = sql`${products.price} asc` as never;
  if (filters.sort === "price-desc") orderBy = sql`${products.price} desc` as never;
  if (filters.sort === "name-asc") orderBy = sql`${products.name} asc` as never;

  const rows = await db
    .select()
    .from(products)
    .where(and(...conditions))
    .orderBy(orderBy);

  let filtered = rows;
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => parseFloat(p.price) >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => parseFloat(p.price) <= filters.maxPrice!);
  }

  return filtered;
}

export async function getProductBySlug(slug: string) {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getRelatedProducts(categoryId: number | null, excludeId: number, limit = 4) {
  if (!categoryId) return [];
  return db
    .select()
    .from(products)
    .where(
      and(
        eq(products.categoryId, categoryId),
        eq(products.status, "published"),
        sql`${products.id} != ${excludeId}`,
      ),
    )
    .limit(limit);
}

export async function searchSite(term: string) {
  const like = `%${term}%`;
  return db
    .select()
    .from(products)
    .where(
      and(
        eq(products.status, "published"),
        or(
          ilike(products.name, like),
          ilike(products.shortDescription, like),
          ilike(products.description, like),
        ),
      ),
    )
    .limit(24);
}

export async function getGalleryImages(categorySlug?: string) {
  if (categorySlug) {
    const cat = await getCategoryBySlug(categorySlug);
    if (!cat) return [];
    return db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.categoryId, cat.id))
      .orderBy(galleryImages.sortOrder);
  }
  return db.select().from(galleryImages).orderBy(galleryImages.sortOrder);
}

export async function getTestimonials() {
  return db.select().from(testimonials).orderBy(testimonials.sortOrder);
}

export async function getAllCategoriesWithCounts() {
  const cats = await getCategories();
  const counts = await db
    .select({
      categoryId: products.categoryId,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(products)
    .where(eq(products.status, "published"))
    .groupBy(products.categoryId);

  return cats.map((c) => ({
    ...c,
    productCount: counts.find((x) => x.categoryId === c.id)?.count ?? 0,
  }));
}

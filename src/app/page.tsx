import {
  getAllCategoriesWithCounts,
  getFeaturedProducts,
  getGalleryImages,
  getTestimonials,
} from "@/lib/data";
import Hero from "@/components/home/Hero";
import BrandIntro from "@/components/home/BrandIntro";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Craftsmanship from "@/components/home/Craftsmanship";
import CustomOrdersCta from "@/components/home/CustomOrdersCta";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import StoryTeaser from "@/components/home/StoryTeaser";
import NewsletterSection from "@/components/home/NewsletterSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, featured, gallery, testimonials] = await Promise.all([
    getAllCategoriesWithCounts(),
    getFeaturedProducts(8),
    getGalleryImages(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <BrandIntro />
      <CategoryShowcase categories={categories} />
      <FeaturedProducts products={featured} />
      <Craftsmanship />
      <CustomOrdersCta />
      <GalleryPreview images={gallery} />
      <Testimonials items={testimonials} />
      <StoryTeaser />
      <NewsletterSection />
    </>
  );
}

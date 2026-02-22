import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import NewsletterSection from '@/components/home/NewsletterSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
  });

  const featuredProducts = await prisma.product.findMany({
    where: { featured: true, active: true },
    include: {
      category: true,
      images: { orderBy: { order: 'asc' } },
      variants: true,
    },
    take: 8,
  });

  return (
    <>
      <div className="logo-watermark" />
      <HeroSection />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <BrandStory />
      <NewsletterSection />
    </>
  );
}

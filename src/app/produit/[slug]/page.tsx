import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetailsClient from '@/components/products/ProductDetailsClient';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
    params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = params;

    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
            images: { orderBy: { order: 'asc' } },
            variants: true,
        },
    });

    if (!product) {
        notFound();
    }

    const relatedProducts = await prisma.product.findMany({
        where: {
            categoryId: product.categoryId,
            id: { not: product.id },
            active: true,
        },
        include: {
            category: true,
            images: { orderBy: { order: 'asc' } },
        },
        take: 4,
    });

    return (
        <div className="pt-24 lg:pt-32 pb-20">
            <div className="logo-watermark" />
            <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
        </div>
    );
}

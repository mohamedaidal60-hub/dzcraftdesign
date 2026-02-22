import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import ProductCard from '@/components/products/ProductCard';

export const dynamic = 'force-dynamic';

interface CollectionPageProps {
    params: { slug: string };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { slug } = params;

    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            products: {
                where: { active: true },
                include: {
                    images: { orderBy: { order: 'asc' } },
                },
            },
        },
    });

    if (!category) {
        notFound();
    }

    return (
        <div className="pt-24 lg:pt-32 min-h-screen pb-20">
            <div className="logo-watermark" />

            {/* Category Banner */}
            <div className="relative h-[250px] md:h-[400px] flex items-center justify-center text-center overflow-hidden bg-[#1A1A1A]">
                {category.image ? (
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover opacity-60"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#006233]/20" />
                )}
                <div className="relative z-10 px-4">
                    <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.5em] mb-4 block animate-fade-in">Collection</span>
                    <h1 className="font-display text-4xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up uppercase italic tracking-wider">
                        {category.name}
                    </h1>
                    <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-lg animate-fade-in font-light">
                        {category.description || `Découvrez notre sélection exclusive ${category.name} fabriquée en Algérie.`}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                {/* Filters bar placeholder */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-8 mb-12">
                    <p className="text-sm text-gray-500 font-medium">
                        Affichage de <span className="text-[#1A1A1A] font-bold">{category.products.length}</span> modèle{category.products.length > 1 ? 's' : ''}
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Trier par :</span>
                        <select className="bg-transparent text-sm font-semibold border-none focus:ring-0 cursor-pointer">
                            <option>Nouveautés</option>
                            <option>Prix croissant</option>
                            <option>Prix décroissant</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {category.products.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-gray-400 text-lg">Aucun produit n&apos;est disponible dans cette catégorie pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {category.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

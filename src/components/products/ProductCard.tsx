'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice: number | null;
    images: { url: string; alt: string | null }[];
}

export default function ProductCard({ product }: { product: any }) {
    const { addItem } = useCartStore();

    return (
        <div className="product-card group bg-white p-2">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Link href={`/produit/${product.slug}`}>
                    <Image
                        src={product.images[0]?.url || '/images/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </Link>

                {product.comparePrice && (
                    <div className="absolute top-4 left-4 badge-promo z-10">
                        PROMO
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                    <button
                        onClick={() => addItem({
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0]?.url || '',
                            quantity: 1,
                            slug: product.slug
                        })}
                        className="flex-1 bg-[#1A1A1A] text-white py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#006233] transition-colors"
                    >
                        <ShoppingBag size={14} /> + Panier
                    </button>
                    <Link
                        href={`/produit/${product.slug}`}
                        className="w-12 bg-white text-[#1A1A1A] py-3 text-xs font-bold flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors"
                        aria-label="Voir le produit"
                    >
                        <Eye size={14} />
                    </Link>
                </div>
            </div>

            <div className="pt-6 pb-4 px-2">
                <Link href={`/produit/${product.slug}`} className="block font-semibold text-sm text-[#1A1A1A] hover:text-[#006233] mb-2 leading-tight uppercase tracking-tight">
                    {product.name}
                </Link>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-[#006233]">{product.price.toLocaleString('fr-FR')} DA</span>
                    {product.comparePrice && (
                        <span className="text-xs text-gray-400 line-through">{product.comparePrice.toLocaleString('fr-FR')} DA</span>
                    )}
                </div>
            </div>
        </div>
    );
}

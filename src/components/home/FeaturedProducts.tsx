'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice: number | null;
    images: { url: string; alt: string | null }[];
    category: { name: string };
}

export default function FeaturedProducts({ products }: { products: any[] }) {
    const { addItem } = useCartStore();

    return (
        <section className="py-24 bg-[#FAF7F2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="text-left">
                        <h2 className="font-display text-4xl font-bold text-[#1A1A1A] mb-2">Les Incontournables</h2>
                        <p className="text-[#006233] font-semibold tracking-widest uppercase text-xs">Best-sellers DZCRAFTDESIGN</p>
                    </div>
                    <Link href="/collection" className="text-sm font-bold text-[#1A1A1A] hover:text-[#006233] transition-colors uppercase border-b-2 border-[#1A1A1A] pb-1">
                        Voir tout le shop
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="product-card group bg-white p-2">
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
                                        -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                                    </div>
                                )}

                                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-[#D21034]">
                                    <Heart size={18} />
                                </button>

                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <button
                                        onClick={() => addItem({
                                            productId: product.id,
                                            name: product.name,
                                            price: product.price,
                                            image: product.images[0]?.url || '',
                                            quantity: 1,
                                            slug: product.slug
                                        })}
                                        className="w-full bg-[#1A1A1A] text-white py-3 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#006233] transition-colors"
                                    >
                                        <ShoppingBag size={16} /> Panier Rapide
                                    </button>
                                </div>
                            </div>

                            <div className="pt-6 pb-4 px-2 text-center">
                                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-1">{product.category.name}</p>
                                <Link href={`/produit/${product.slug}`} className="block font-semibold text-lg text-[#1A1A1A] hover:text-[#006233] mb-2 leading-tight">
                                    {product.name}
                                </Link>
                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-lg font-bold text-[#006233]">{product.price.toLocaleString('fr-FR')} DA</span>
                                    {product.comparePrice && (
                                        <span className="text-sm text-gray-400 line-through">{product.comparePrice.toLocaleString('fr-FR')} DA</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ChevronRight, Truck, ShieldCheck, RefreshCcw, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import ProductCard from './ProductCard';

export default function ProductDetailsClient({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCartStore();

    const sizes = product.variants.filter((v: any) => v.type === 'size');
    const colors = product.variants.filter((v: any) => v.type === 'color');

    const handleAddToCart = () => {
        if (sizes.length > 0 && !selectedSize) {
            alert('Veuillez sélectionner une taille');
            return;
        }
        if (colors.length > 0 && !selectedColor) {
            alert('Veuillez sélectionner une couleur');
            return;
        }

        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]?.url || '',
            size: selectedSize,
            color: selectedColor,
            quantity,
            slug: product.slug,
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                <Link href="/" className="hover:text-[#1A1A1A]">Accueil</Link>
                <ChevronRight size={12} />
                <Link href={`/collection/${product.category.slug}`} className="hover:text-[#1A1A1A]">{product.category.name}</Link>
                <ChevronRight size={12} />
                <span className="text-[#1A1A1A]">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Images Column */}
                <div className="space-y-4">
                    <div className="relative aspect-[3/4] bg-white overflow-hidden shadow-sm">
                        <Image
                            src={product.images[selectedImage]?.url || '/images/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-contain"
                            priority
                        />
                        {product.comparePrice && (
                            <div className="absolute top-6 left-6 badge-promo">PROMOTION</div>
                        )}
                    </div>

                    {product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img: any, idx: number) => (
                                <button
                                    key={img.id}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`relative aspect-square bg-gray-100 border-2 transition-all ${selectedImage === idx ? 'border-[#006233]' : 'border-transparent'
                                        }`}
                                >
                                    <Image src={img.url} alt={product.name} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Column */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <p className="text-[#006233] text-sm font-bold uppercase tracking-[0.2em] mb-2">{product.category.name}</p>
                        <h1 className="font-display text-4xl font-bold text-[#1A1A1A] mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-[#1A1A1A]">{product.price.toLocaleString('fr-FR')} DA</span>
                            {product.comparePrice && (
                                <span className="text-xl text-gray-400 line-through font-light">{product.comparePrice.toLocaleString('fr-FR')} DA</span>
                            )}
                        </div>

                        <div className="flex items-center gap-1 mb-8">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={16} className="fill-[#C9A84C] text-[#C9A84C]" />
                            ))}
                            <span className="text-xs text-gray-500 font-bold ml-2">4.9/5 (12 avis)</span>
                        </div>
                    </div>

                    <div className="space-y-8 mb-10">
                        {/* Sizes */}
                        {sizes.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Sélectionner une Taille</h3>
                                    <button className="text-xs font-bold text-[#006233] underline">Guide des tailles</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((v: any) => (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedSize(v.value)}
                                            className={`size-btn ${selectedSize === v.value ? 'selected' : ''}`}
                                        >
                                            {v.value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Colors */}
                        {colors.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A] mb-4">Couleur : <span className="text-gray-500">{selectedColor || 'Choisir'}</span></h3>
                                <div className="flex flex-wrap gap-3">
                                    {colors.map((v: any) => (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedColor(v.value)}
                                            className={`px-4 py-2 border-2 text-sm font-semibold transition-all ${selectedColor === v.value ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {v.value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity and Share */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-btn border-r-0">-</button>
                                <div className="w-12 h-[36px] flex items-center justify-center border-y-2 border-gray-200 font-bold text-sm bg-white">{quantity}</div>
                                <button onClick={() => setQuantity(quantity + 1)} className="qty-btn border-l-0">+</button>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleAddToCart}
                        id="add-to-cart-big"
                        className="btn-primary w-full py-5 text-base flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
                    >
                        <ShoppingBag size={20} /> Ajouter au Panier
                    </button>

                    {/* Trust badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 py-8 border-y border-gray-100">
                        <div className="flex items-center gap-3">
                            <Truck size={20} className="text-[#006233]" />
                            <div className="leading-tight">
                                <p className="text-xs font-bold uppercase tracking-tighter">Livraison Rapide</p>
                                <p className="text-[10px] text-gray-500 italic">48h en Algérie</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={20} className="text-[#006233]" />
                            <div className="leading-tight">
                                <p className="text-xs font-bold uppercase tracking-tighter">Qualité Premium</p>
                                <p className="text-[10px] text-gray-500 italic">Coton 100% DZ</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <RefreshCcw size={20} className="text-[#006233]" />
                            <div className="leading-tight">
                                <p className="text-xs font-bold uppercase tracking-tighter">Retours Gratuits</p>
                                <p className="text-[10px] text-gray-500 italic">Sous 14 jours</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-12 prose prose-sm max-w-none text-gray-600">
                        <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-4">Description du produit</h3>
                        <p className="leading-relaxed mb-4">{product.description}</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Matière : 100% Coton premium algérien</li>
                            <li>Coupe : Moderne Confort</li>
                            <li>Sérigraphie de haute qualité faite à Alger</li>
                            <li>Entretien : Lavage à 30°C recommandé</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-32">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="font-display text-3xl font-bold">Vous aimerez aussi</h2>
                        <Link href={`/collection/${product.category.slug}`} className="text-xs font-bold uppercase border-b-2 border-[#1A1A1A] pb-1">Voir toute la collection</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p: any) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

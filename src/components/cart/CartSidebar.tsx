'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartSidebar() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCartStore();
    const cartTotal = total();

    // Prevent body scroll when cart open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 cart-overlay"
                onClick={closeCart}
                id="cart-overlay"
            />

            {/* Sidebar */}
            <div
                id="cart-sidebar"
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col animate-slide-in-right shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={20} className="text-[#006233]" />
                        <h2 className="font-display text-xl font-bold">Mon Panier</h2>
                        {items.length > 0 && (
                            <span className="text-sm text-gray-500">({items.length} article{items.length > 1 ? 's' : ''})</span>
                        )}
                    </div>
                    <button
                        id="cart-close-btn"
                        onClick={closeCart}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Fermer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                            <ShoppingBag size={64} className="text-gray-200" />
                            <div>
                                <p className="font-display text-xl font-bold text-gray-400">Votre panier est vide</p>
                                <p className="text-gray-400 text-sm mt-1">Découvrez nos collections algériennes</p>
                            </div>
                            <button
                                onClick={closeCart}
                                className="btn-primary mt-2"
                            >
                                Voir les collections
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 bg-[#FAF7F2] rounded-lg">
                                    <div className="relative w-20 h-24 shrink-0 bg-gray-100 rounded overflow-hidden">
                                        <Image
                                            src={item.image || '/images/placeholder-product.jpg'}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            href={`/produit/${item.slug}`}
                                            className="font-semibold text-sm text-[#1A1A1A] hover:text-[#006233] transition-colors line-clamp-2"
                                            onClick={closeCart}
                                        >
                                            {item.name}
                                        </Link>
                                        <div className="flex items-center gap-2 mt-1">
                                            {item.size && (
                                                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border">
                                                    {item.size}
                                                </span>
                                            )}
                                            {item.color && (
                                                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border">
                                                    {item.color}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    id={`cart-qty-minus-${item.id}`}
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="qty-btn"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                                <button
                                                    id={`cart-qty-plus-${item.id}`}
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="qty-btn"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <span className="font-bold text-[#006233]">
                                                {(item.price * item.quantity).toLocaleString('fr-FR')} DA
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        id={`cart-remove-${item.id}`}
                                        onClick={() => removeItem(item.id)}
                                        className="self-start p-1 text-gray-400 hover:text-[#D21034] transition-colors"
                                        aria-label="Supprimer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-gray-100 px-6 py-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Sous-total</span>
                            <span className="font-bold text-lg text-[#1A1A1A]">
                                {cartTotal.toLocaleString('fr-FR')} DA
                            </span>
                        </div>
                        <p className="text-xs text-gray-400">Livraison calculée à l&apos;étape suivante</p>
                        <Link
                            href="/checkout"
                            id="cart-checkout-btn"
                            className="btn-primary w-full flex items-center justify-center gap-2"
                            onClick={closeCart}
                        >
                            Commander <ArrowRight size={16} />
                        </Link>
                        <button
                            onClick={closeCart}
                            className="w-full text-center text-sm text-gray-500 hover:text-[#1A1A1A] transition-colors py-1"
                        >
                            Continuer mes achats
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

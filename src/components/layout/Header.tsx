'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, ChevronDown, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const collections = [
    { name: 'Adulte', href: '/collection/adulte', description: 'T-shirts, hoodies, polos' },
    { name: 'Enfant', href: '/collection/enfant', description: 'Collections 2-14 ans' },
    { name: 'Bébé', href: '/collection/bebe', description: 'Douceur 0-18 mois' },
    { name: 'Accessoires', href: '/collection/accessoires', description: 'Sacs, casquettes, écharpes' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { count, toggleCart } = useCartStore();
    const cartCount = count();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'
                }`}
        >
            {/* Top banner */}
            <div className="bg-[#006233] text-white text-xs text-center py-2 px-4 font-medium tracking-wider">
                🇩🇿 MADE IN ALGERIA — Livraison vers toute l&apos;Europe | Salon de l&apos;Algérie à Lyon
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                            <Image
                                src="/logo.png"
                                alt="DZCRAFTDESIGN"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-display text-lg lg:text-xl font-bold text-[#1A1A1A] tracking-widest hidden sm:block">
                            DZCRAFTDESIGN
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {/* Collections dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <button
                                id="nav-collection-btn"
                                className="flex items-center gap-1 text-sm font-semibold text-[#1A1A1A] hover:text-[#006233] transition-colors uppercase tracking-wider"
                            >
                                Collection <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-2xl border-t-2 border-[#006233] z-50 animate-fade-in">
                                    <div className="p-4">
                                        {collections.map((col) => (
                                            <Link
                                                key={col.href}
                                                href={col.href}
                                                className="flex flex-col px-4 py-3 hover:bg-[#FAF7F2] transition-colors group"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <span className="font-semibold text-sm text-[#1A1A1A] group-hover:text-[#006233] uppercase tracking-wide">{col.name}</span>
                                                <span className="text-xs text-gray-500 mt-0.5">{col.description}</span>
                                            </Link>
                                        ))}
                                        <div className="border-t border-gray-100 mt-2 pt-2">
                                            <Link
                                                href="/collection"
                                                className="flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#006233] hover:bg-[#006233] hover:text-white transition-colors uppercase tracking-wider"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Voir tout →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link href="/qui-suis-je" className="text-sm font-semibold text-[#1A1A1A] hover:text-[#006233] transition-colors uppercase tracking-wider">
                            Qui suis-je
                        </Link>
                        <Link href="/le-saviez-vous" className="text-sm font-semibold text-[#1A1A1A] hover:text-[#006233] transition-colors uppercase tracking-wider">
                            Le saviez-vous
                        </Link>
                    </nav>

                    {/* Right icons */}
                    <div className="flex items-center gap-4">
                        <button
                            id="header-search-btn"
                            className="hidden lg:flex text-[#1A1A1A] hover:text-[#006233] transition-colors"
                            aria-label="Recherche"
                        >
                            <Search size={20} />
                        </button>

                        <button
                            id="header-cart-btn"
                            onClick={toggleCart}
                            className="relative text-[#1A1A1A] hover:text-[#006233] transition-colors"
                            aria-label="Panier"
                        >
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#D21034] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-fade-in">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile menu button */}
                        <button
                            id="header-mobile-menu-btn"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden text-[#1A1A1A]"
                            aria-label="Menu"
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="space-y-1">
                            <div className="pb-2 mb-2 border-b border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 pb-2">Collection</p>
                                {collections.map((col) => (
                                    <Link
                                        key={col.href}
                                        href={col.href}
                                        className="flex items-center justify-between px-4 py-3 hover:bg-[#FAF7F2] transition-colors"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className="font-semibold text-sm text-[#1A1A1A] uppercase tracking-wide">{col.name}</span>
                                        <ChevronDown size={14} className="-rotate-90 text-gray-400" />
                                    </Link>
                                ))}
                            </div>
                            <Link href="/qui-suis-je" className="flex px-4 py-3 font-semibold text-sm text-[#1A1A1A] hover:bg-[#FAF7F2] uppercase tracking-wide" onClick={() => setMenuOpen(false)}>
                                Qui suis-je
                            </Link>
                            <Link href="/le-saviez-vous" className="flex px-4 py-3 font-semibold text-sm text-[#1A1A1A] hover:bg-[#FAF7F2] uppercase tracking-wide" onClick={() => setMenuOpen(false)}>
                                Le saviez-vous
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

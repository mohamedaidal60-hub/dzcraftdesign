'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative h-[90vh] flex items-center overflow-hidden hero-gradient text-white">
            {/* Background patterns/effects */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 bg-[#D21034] text-xs font-bold uppercase tracking-widest mb-6 border-l-4 border-white">
                            Nouvelle Collection 2026
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
                            L&apos;Algérie se porte avec <span className="text-[#C9A84C]">Fierté</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light">
                            Des créations authentiques, dessinées et fabriquées exclusivement en Algérie pour valoriser notre textile et notre savoir-faire unique.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/collection/adulte"
                                className="btn-primary flex items-center justify-center gap-2 group"
                                id="hero-shop-now"
                            >
                                Découvrir la collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/qui-suis-je"
                                className="px-8 py-3.5 border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all flex items-center justify-center font-semibold text-sm uppercase tracking-wider"
                            >
                                Notre Histoire
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Side image/graphics placeholder or decorative element */}
            <div className="hidden lg:block absolute right-[-10%] top-1/2 -translate-y-1/2 w-1/2 h-[120%] opacity-40">
                <div className="w-full h-full bg-[url('/logo.png')] bg-no-repeat bg-contain bg-center contrast-125 brightness-200"></div>
            </div>
        </section>
    );
}

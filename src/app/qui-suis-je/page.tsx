import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const content = await prisma.aboutContent.findFirst();

    return (
        <div className="pt-24 lg:pt-32 pb-20">
            <div className="logo-watermark" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] mb-12 transition-colors">
                    <ArrowLeft size={14} /> Retour à l&apos;accueil
                </Link>

                <div className="text-center mb-16">
                    <span className="text-[#006233] text-xs font-bold uppercase tracking-[0.5em] mb-4 block">L&apos;histoire DZCRAFTDESIGN</span>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-8 italic">
                        {content?.title || "DZCRAFTDESIGN — Fièrement Algérien"}
                    </h1>
                    <div className="divider-dz"></div>
                </div>

                {content?.image && (
                    <div className="relative h-[400px] mb-16 rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={content.image}
                            alt="DZCRAFTDESIGN"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-light">
                    {content?.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-6 whitespace-pre-wrap">
                            {paragraph.startsWith('**') ? (
                                <span className="font-bold text-[#1A1A1A] block text-xl mt-12 mb-4 font-display italic">
                                    {paragraph.replace(/\*\*/g, '')}
                                </span>
                            ) : paragraph}
                        </p>
                    )) || (
                            <p>Chargement du contenu...</p>
                        )}

                    <div className="mt-20 p-8 bg-[#006233]/5 border-l-4 border-[#006233] rounded-r-xl">
                        <p className="font-display text-2xl font-bold text-[#1A1A1A] mb-4 italic">
                            &quot;Porter du DZCRAFTDESIGN, c&apos;est affirmer son attachement à l&apos;Algérie avec style et authenticité.&quot;
                        </p>
                        <p className="text-[#006233] font-bold uppercase tracking-widest text-xs">- Le Fondateur</p>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <h3 className="font-display text-2xl font-bold mb-8">Ma première collection est disponible !</h3>
                    <Link href="/collection/adulte" className="btn-primary inline-block">
                        Découvrir les modèles
                    </Link>
                </div>
            </div>
        </div>
    );
}

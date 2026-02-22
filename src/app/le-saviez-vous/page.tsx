import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
    const posts = await prisma.historyPost.findMany({
        where: { published: true },
        orderBy: { order: 'asc' },
    });

    return (
        <div className="pt-24 lg:pt-32 pb-20">
            <div className="logo-watermark" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="text-[#006233] text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Patrimoine & Culture</span>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-8 italic">Le saviez-vous ?</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        L&apos;Algérie possède une richesse culturelle et historique infinie qui inspire chacune de nos créations.
                        Découvrez les histoires derrière nos modèles.
                    </p>
                    <div className="divider-dz"></div>
                </div>

                <div className="space-y-32">
                    {posts.map((post, idx) => (
                        <div
                            key={post.id}
                            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 animate-fade-in`}
                        >
                            <div className="lg:w-1/2 relative">
                                <div className={`relative z-10 rounded-3xl overflow-hidden shadow-2xl ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
                                    <Image
                                        src={post.image || '/images/placeholder-history.jpg'}
                                        alt={post.title}
                                        width={600}
                                        height={450}
                                        className="object-cover w-full h-full aspect-video lg:aspect-square"
                                    />
                                </div>
                                {/* Decorative gold frame */}
                                <div className={`absolute -inset-4 border-2 border-[#C9A84C] rounded-3xl z-0 ${idx % 2 === 0 ? 'rotate-2' : '-rotate-2'} opacity-30`}></div>
                            </div>

                            <div className="lg:w-1/2">
                                <span className="text-[#006233] font-bold text-3xl opacity-20 font-display mb-4 block italic">0{idx + 1}</span>
                                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 leading-tight italic">{post.title}</h2>
                                <div className="prose prose-lg text-gray-600 leading-relaxed mb-8">
                                    {post.content.split('\n').map((para, pIdx) => (
                                        <p key={pIdx} className="mb-4">{para}</p>
                                    ))}
                                </div>
                                {/* CTA to product category if applicable or just decorative icon */}
                                <div className="flex items-center gap-4 text-[#006233]">
                                    <div className="w-12 h-[1px] bg-[#006233]"></div>
                                    <span className="text-xs uppercase font-bold tracking-[0.3em]">Héritage Algérien</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-40 text-center py-20 bg-[#006233] text-white rounded-3xl relative overflow-hidden">
                    {/* bg logo effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10 bg-[url('/logo.png')] bg-contain bg-no-repeat pointer-events-none"></div>

                    <div className="relative z-10 px-4">
                        <h3 className="font-display text-3xl md:text-4xl font-bold mb-8 italic uppercase tracking-wider">Portez une partie de notre histoire</h3>
                        <Link href="/collection" className="bg-white text-[#1A1A1A] px-10 py-4 font-bold uppercase tracking-widest hover:bg-[#C9A84C] hover:text-white transition-all shadow-xl inline-block">
                            Voir le Shop
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

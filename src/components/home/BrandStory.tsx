import Link from 'next/link';
import Image from 'next/image';

export default function BrandStory() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl skew-y-1">
                            <Image
                                src="/images/about/brand-story.jpg"
                                alt="Artisanat Algérien"
                                width={600}
                                height={700}
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#006233] rounded-full z-0 opacity-10"></div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#C9A84C] rounded-full z-0 opacity-5"></div>
                        <div className="absolute bottom-10 -left-10 bg-white p-6 shadow-xl z-20 max-w-[200px] border-l-4 border-[#D21034]">
                            <p className="font-display text-2xl font-bold text-[#1A1A1A]">100%</p>
                            <p className="text-xs uppercase tracking-widest font-bold text-gray-500">Fabriqué en Algérie</p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <span className="text-[#006233] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Notre Mission</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-8 leading-tight">
                            Valoriser le patrimoine textile de la <span className="text-[#D21034]">Terre d&apos;Algérie</span>
                        </h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed mb-10 text-lg">
                            <p>
                                DZCRAFTDESIGN n&apos;est pas juste une marque de vêtements. C&apos;est un pont entre notre héritage millénaire et la modernité. Chaque pièce est pensée pour refléter l&apos;élégance algerienne.
                            </p>
                            <p>
                                En choisissant de fabriquer exclusivement en Algérie, nous soutenons les artisans locaux, les imprimeurs et tout l&apos;écosystème de la tech algérienne. C&apos;est notre engagement pour un avenir de fierté et de développement.
                            </p>
                        </div>
                        <Link href="/qui-suis-je" className="btn-secondary">
                            Découvrir mon parcours
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

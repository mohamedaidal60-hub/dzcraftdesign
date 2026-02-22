import Link from 'next/link';
import Image from 'next/image';

interface Category {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
    return (
        <section className="py-20 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl font-bold text-[#1A1A1A] mb-4">Nos Univers</h2>
                    <div className="divider-dz"></div>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Trouvez la pièce parfaite parmi nos différentes gammes fabriquées avec soin en Algérie.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <Link
                            key={cat.id}
                            href={`/collection/${cat.slug}`}
                            className={`group relative overflow-hidden h-[450px] shadow-lg ${idx % 2 === 0 ? 'mt-0' : 'md:mt-8'}`}
                            id={`cat-card-${cat.slug}`}
                        >
                            <Image
                                src={cat.image || `/images/cat-${cat.slug}.jpg`}
                                alt={cat.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                                <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2 block">Explorer</span>
                                <h3 className="text-white font-display text-3xl font-bold italic mb-2 tracking-wide uppercase">{cat.name}</h3>
                                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                                    {cat.description || `Découvrez notre collection ${cat.name} exclusive.`}
                                </p>
                                <div className="w-10 h-1 bg-white mt-4 origin-left transition-all duration-500 group-hover:w-full"></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

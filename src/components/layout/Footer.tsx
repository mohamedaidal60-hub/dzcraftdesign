import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#1A1A1A] text-white mt-20">
            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10 bg-white rounded p-1">
                                <Image src="/logo.png" alt="DZCRAFTDESIGN" fill className="object-contain p-1" />
                            </div>
                            <span className="font-display text-lg font-bold tracking-widest">DZCRAFTDESIGN</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Mode algérienne premium. Chaque pièce raconte l&apos;histoire d&apos;une culture riche et d&apos;un savoir-faire unique.
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                            <span className="text-xs bg-[#006233] text-white px-2 py-1 font-semibold tracking-wider">🇩🇿 MADE IN ALGERIA</span>
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            <a href="#" id="footer-instagram" aria-label="Instagram" className="text-gray-400 hover:text-[#C9A84C] transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" id="footer-facebook" aria-label="Facebook" className="text-gray-400 hover:text-[#C9A84C] transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="mailto:contact@dzcraftdesign.com" id="footer-email" aria-label="Email" className="text-gray-400 hover:text-[#C9A84C] transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Collections */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-[#C9A84C] mb-4">Collections</h3>
                        <ul className="space-y-2">
                            {[
                                { label: 'Adulte', href: '/collection/adulte' },
                                { label: 'Enfant', href: '/collection/enfant' },
                                { label: 'Bébé', href: '/collection/bebe' },
                                { label: 'Accessoires', href: '/collection/accessoires' },
                                { label: 'Nouveautés', href: '/collection' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Informations */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-[#C9A84C] mb-4">Informations</h3>
                        <ul className="space-y-2">
                            {[
                                { label: 'Qui suis-je', href: '/qui-suis-je' },
                                { label: 'Le saviez-vous', href: '/le-saviez-vous' },
                                { label: 'Livraison', href: '/livraison' },
                                { label: 'Retours', href: '/retours' },
                                { label: 'Contact', href: '/contact' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-[#C9A84C] mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-gray-400 text-sm">
                                <MapPin size={14} className="mt-0.5 shrink-0 text-[#006233]" />
                                <span>Salon de l&apos;Algérie<br />Lyon, France 🇫🇷</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Mail size={14} className="shrink-0 text-[#006233]" />
                                <a href="mailto:contact@dzcraftdesign.com" className="hover:text-white transition-colors">
                                    contact@dzcraftdesign.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Phone size={14} className="shrink-0 text-[#006233]" />
                                <span>+33 (0) X XX XX XX XX</span>
                            </li>
                        </ul>

                        <div className="mt-6 p-3 bg-[#006233]/20 border border-[#006233]/30">
                            <p className="text-xs text-gray-300 text-center">
                                Salon de l&apos;Algérie · Lyon
                            </p>
                            <p className="text-xs text-[#C9A84C] text-center font-semibold mt-1">
                                Première collection 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                        <p className="text-gray-500 text-xs">
                            © 2026 DZCRAFTDESIGN — Tous droits réservés
                        </p>
                        <p className="text-gray-500 text-xs">
                            Fait avec ❤️ pour l&apos;Algérie
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

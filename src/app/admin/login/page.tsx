'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Phone, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                phone,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Identifiants invalides');
                setLoading(false);
            } else {
                router.push('/admin/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('Une erreur est survenue');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#006233] opacity-5 -mr-16 -mt-16 rounded-full"></div>

                <div className="text-center mb-10">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <h1 className="font-display text-2xl font-bold text-[#1A1A1A]">Espace Admin</h1>
                    <p className="text-gray-400 text-sm mt-2">DZCRAFTDESIGN — Gestion Boutique</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold mb-6 animate-fade-in border border-red-100 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">Numéro de téléphone</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-[#006233] focus:bg-white transition-all outline-none"
                                placeholder="Votre numéro"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">Mot de passe</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-12 text-sm focus:border-[#006233] focus:bg-white transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary rounded-2xl flex items-center justify-center gap-2 h-14"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            'Se connecter'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        DZCRAFTDESIGN © 2026<br />Sécurisé par AidalTech — Algérie
                    </p>
                </div>
            </div>
        </div>
    );
}

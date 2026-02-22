import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    BarChart3,
    Package,
    ShoppingBag,
    Users,
    Settings,
    LayoutDashboard,
    LogOut,
    ExternalLink,
    History,
    FileText
} from "lucide-react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // If we are on the login page, don't show the sidebar
    // (In App Router, layouts apply to all children, so we handle this implicitly or explicitly)

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex">
            {session && (
                <aside className="hidden lg:flex flex-col w-64 admin-sidebar fixed h-full z-20">
                    <div className="p-8">
                        <Link href="/" className="flex items-center gap-3 mb-10">
                            <div className="w-8 h-8 bg-white rounded p-1">
                                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="font-display font-bold text-white tracking-widest text-sm uppercase">DZ Admin</span>
                        </Link>

                        <nav className="space-y-2">
                            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#006233] text-white font-semibold text-sm transition-all">
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                            <Link href="/admin/produits" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 font-medium text-sm transition-all">
                                <Package size={18} /> Produits
                            </Link>
                            <Link href="/admin/commandes" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 font-medium text-sm transition-all">
                                <ShoppingBag size={18} /> Commandes
                            </Link>
                            <Link href="/admin/contenu" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 font-medium text-sm transition-all">
                                <FileText size={18} /> Contenu
                            </Link>
                            <Link href="/admin/histoire" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 font-medium text-sm transition-all">
                                <History size={18} /> Histoire DZ
                            </Link>
                        </nav>
                    </div>

                    <div className="mt-auto p-8 space-y-4">
                        <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-all">
                            <ExternalLink size={18} /> Voir le site
                        </Link>
                        <AdminLogoutButton />
                    </div>
                </aside>
            )}

            <main className={`flex-1 ${session ? 'lg:ml-64' : ''}`}>
                {children}
            </main>
        </div>
    );
}

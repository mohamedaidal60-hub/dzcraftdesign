import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShoppingBag, Package, BarChart3, Users, Clock, AlertTriangle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const session = await auth();

    if (!session) {
        redirect("/admin/login");
    }

    // Fetch quick stats
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    const orderCount = await prisma.order.count();
    const pendingOrders = await prisma.order.findMany({
        where: { status: 'pending' },
        orderBy: { createdAt: 'desc' },
        take: 5,
    });

    const stats = [
        { label: "Produits", value: productCount, icon: Package, color: "bg-blue-500" },
        { label: "Catégories", value: categoryCount, icon: BarChart3, color: "bg-purple-500" },
        { label: "Commandes totales", value: orderCount, icon: ShoppingBag, color: "bg-green-500" },
        { label: "Clients", value: "84", icon: Users, color: "bg-orange-500" },
    ];

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                    <p className="text-gray-500 text-sm">Bienvenue, {session.user?.name}</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/admin/produits/nouveau" className="bg-[#006233] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004d27] transition-all">
                        + Nouveau Produit
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900">Commandes Récentes</h2>
                        <Link href="/admin/commandes" className="text-xs font-bold text-[#006233] uppercase">Tout voir</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pendingOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-gray-400">Aucune commande en attente</td>
                                    </tr>
                                ) : (
                                    pendingOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-all cursor-pointer">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-900 text-sm">{order.customerName}</p>
                                                <p className="text-xs text-gray-400">{order.customerPhone}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-orange-100">
                                                    En attente
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-sm">{order.total.toLocaleString()} DA</td>
                                            <td className="px-6 py-4 text-xs text-gray-400 flex items-center gap-1">
                                                <Clock size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Alerts / Stock */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <AlertTriangle className="text-orange-500" size={18} /> Alertes Stock
                    </h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <p className="text-sm font-bold text-orange-700">Stock Faible</p>
                            <p className="text-xs text-orange-600 mt-1">T-shirt Alger Skyline (M) - 2 restants</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                            <p className="text-sm font-bold text-red-700">Rupture</p>
                            <p className="text-xs text-red-600 mt-1">Hoodie Casbah Alger (L)</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Actions rapides</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-all">
                                <p className="text-xs font-bold text-gray-700">Exporter</p>
                            </button>
                            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-all">
                                <p className="text-xs font-bold text-gray-700">Paramètres</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

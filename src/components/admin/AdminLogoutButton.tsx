'use client';

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 text-sm font-semibold transition-all"
        >
            <LogOut size={18} /> Déconnexion
        </button>
    );
}

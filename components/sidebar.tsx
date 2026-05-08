"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    CreditCard, 
    ClipboardList, 
    Activity, 
    BarChart3, 
    Package, 
    Settings, 
    LogOut,
    PackageSearch
} from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";

export function Sidebar() {
    const { role } = useAuth();

    const links = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["Admin", "Staff", "Therapist"] },
        { href: "/patients", label: "Patients", icon: Users, roles: ["Admin", "Staff", "Therapist"] },
        { href: "/appointments", label: "Calendar", icon: Calendar, roles: ["Admin", "Staff"] },
        { href: "/financials", label: "Financial Intel", icon: BarChart3, roles: ["Admin", "Accountant"] },
        { href: "/packages", label: "Packages", icon: Package, roles: ["Admin"] },
        { href: "/attendance", label: "Attendance", icon: Activity, roles: ["Admin", "Staff"] },
        { href: "/inventory", label: "Inventory", icon: PackageSearch, roles: ["Admin"] },
        { href: "/staff", label: "Staff Intelligence", icon: ClipboardList, roles: ["Admin"] },
    ];

    const filteredLinks = links.filter(link => role && link.roles.includes(role));

    return (
        <aside className="w-64 border-r bg-slate-50 min-h-screen flex flex-col">
            <div className="p-6 border-b bg-white">
                <h2 className="font-black text-xl tracking-tighter text-primary">MUSCULARBOX ERP</h2>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {filteredLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                            "hover:bg-primary/10 hover:text-primary text-slate-600"
                        )}
                    >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t">
                <button 
                    onClick={() => auth.signOut()}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

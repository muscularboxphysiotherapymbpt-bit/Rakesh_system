"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    Activity, 
    BarChart3, 
    Package, 
    LogOut,
    PackageSearch,
    ClipboardList,
    ShieldCheck,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";

export function Sidebar() {
    const { role, user } = useAuth();
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["Admin", "Staff", "Therapist"] },
        { href: "/patients", label: "Patients", icon: Users, roles: ["Admin", "Staff", "Therapist"] },
        { href: "/financials", label: "Financial Intel", icon: BarChart3, roles: ["Admin", "Accountant"] },
        { href: "/packages", label: "Packages", icon: Package, roles: ["Admin"] },
        { href: "/attendance", label: "Attendance", icon: Activity, roles: ["Admin", "Staff"] },
        { href: "/inventory", label: "Inventory", icon: PackageSearch, roles: ["Admin"] },
        { href: "/staff", label: "Staff Intel", icon: ClipboardList, roles: ["Admin"] },
    ];

    const filteredLinks = links.filter(link => role && link.roles.includes(role));

    return (
        <aside className="w-72 bg-white border-r border-slate-100 min-h-screen flex flex-col shadow-2xl shadow-slate-200/50 sticky top-0 h-screen overflow-y-auto">
            {/* Logo Section */}
            <div className="p-8 pb-10">
                <div className="flex flex-col items-start gap-4">
                    <img src="/download.jpg" alt="Muscularbox Logo" className="h-16 w-auto object-contain" />
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-tight">Command Center v1.1</span>
                    </div>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 space-y-1.5">
                <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-4">Core Platform</p>
                {filteredLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-4 px-5 py-4 rounded-2xl text-[13px] font-black transition-all duration-300 group",
                                isActive 
                                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 translate-x-1" 
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <link.icon className={cn(
                                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                                isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-900"
                            )} />
                            <span className="uppercase tracking-tight">{link.label}</span>
                            {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Profile & Logout Section */}
            <div className="p-6 mt-8 space-y-4">
                <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{role} Verified</p>
                        <p className="text-xs font-black text-slate-900 truncate">{user?.email?.split('@')[0]}</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => auth.signOut()}
                    className="flex w-full items-center gap-4 px-6 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                >
                    <LogOut className="h-4 w-4" />
                    Terminate Session
                </button>
            </div>
        </aside>
    );
}

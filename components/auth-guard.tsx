"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user && pathname !== "/login") {
            router.push("/login");
        }
        if (!loading && user && pathname === "/login") {
            router.push("/");
        }
    }, [user, loading, pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-900 animate-spin flex items-center justify-center">
                        <div className="h-6 w-6 bg-primary rounded-lg"></div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading System...</p>
                </div>
            </div>
        );
    }

    // Don't show anything until redirect happens
    if (!user && pathname !== "/login") return null;

    return <>{children}</>;
}

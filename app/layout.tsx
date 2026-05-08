"use client";

import { Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { Sidebar } from "@/components/sidebar";
import { AuthGuard } from "@/components/auth-guard";
import { usePathname } from "next/navigation";
import { ShieldCheck, Zap } from "lucide-react";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased bg-slate-50`}>
        <AuthProvider>
          <AuthGuard>
            <div className="flex min-h-screen bg-[#F8FAFC]">
              <SidebarContainer />
              <div className="flex-1 flex flex-col">
                <HeaderContainer />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
              </div>
            </div>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}

function SidebarContainer() {
    const pathname = usePathname();
    const { user } = useAuth();
    if (pathname === "/login" || !user) return null;
    return <Sidebar />;
}

function HeaderContainer() {
    const pathname = usePathname();
    const { user } = useAuth();
    if (pathname === "/login" || !user) return null;
    
    return (
        <header className="sticky top-0 bg-white/70 backdrop-blur-3xl z-40 border-b border-slate-100">
            <div className="container mx-auto flex h-24 items-center justify-between px-10">
                <div className="flex items-center gap-5">
                    <img src="/logo.jpg" alt="MB" className="h-12 w-auto object-contain" />
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                                Muscularbox Neural Sync: Active
                            </span>
                        </div>
                        <h2 className="text-sm font-black uppercase tracking-tighter text-slate-900">
                            Enterprise Clinical Portal
                        </h2>
                    </div>
                </div>
                <nav className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase">Secure Environment</span>
                    </div>
                    <Button asChild className="rounded-2xl font-black text-[10px] h-14 px-10 shadow-2xl shadow-slate-900/20 bg-slate-900 hover:bg-black transition-all text-white uppercase tracking-[0.1em] active:scale-95">
                        <Link href="/patients/new">Register Patient</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
}

"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { Sidebar } from "@/components/sidebar";
import { AuthGuard } from "@/components/auth-guard";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthGuard>
            <div className="flex min-h-screen bg-slate-50/50">
              <SidebarContainer />
              <div className="flex-1 flex flex-col">
                <HeaderContainer />
                <main className="flex-1 overflow-y-auto bg-slate-50/50">
                  <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-6 max-w-7xl">
                    {children}
                  </div>
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
        <header className="border-b sticky top-0 bg-white/80 backdrop-blur-2xl z-50 shadow-sm border-slate-100">
            <div className="container mx-auto flex h-20 items-center justify-between px-6 sm:px-10">
                <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        System Active: Cloud Mode
                    </span>
                </div>
                <nav className="flex items-center gap-4">
                    <Button asChild size="sm" className="rounded-2xl font-black text-[10px] h-11 px-8 shadow-xl bg-slate-900 hover:bg-black transition-all text-white uppercase tracking-widest active:scale-95">
                        <Link href="/patients/new">New Clinical Entry</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
}

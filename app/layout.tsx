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
        <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
            <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-6">
                <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-lg sm:text-xl font-black text-primary tracking-tighter uppercase">
                        Command Center
                    </span>
                </div>
                <nav className="flex items-center gap-1.5 sm:gap-3">
                    <Button asChild size="sm" className="rounded-xl font-black text-[10px] sm:text-xs h-8 sm:h-9 px-4 sm:px-6 shadow-md bg-slate-900 hover:bg-black transition-all text-white">
                        <Link href="/patients/new">NEW PATIENT</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
}

import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { AuthGuard } from "@/components/auth-guard";
import { LayoutShell } from "@/components/layout-shell";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Muscularbox ERP | Command Center",
  description: "Enterprise Physiotherapy Management System",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

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
            <LayoutShell>
                {children}
            </LayoutShell>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}

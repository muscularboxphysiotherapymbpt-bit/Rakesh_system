"use client";

import { useAuth } from "@/context/auth-context";
import { useERPData } from "@/hooks/use-erp-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Users, 
    Calendar, 
    Package, 
    TrendingUp, 
    Activity, 
    ArrowUpRight,
    Loader2,
    ShieldCheck,
    Zap,
    History,
    RefreshCcw,
    Globe
} from "lucide-react";
import { RevenueChart } from "@/components/financial-charts";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const { user, role } = useAuth();
    const { data: stats, loading, error } = useERPData("getDashboardStats");

    if (loading) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-6 animate-pulse">
                    <div className="h-20 w-20 rounded-[2rem] bg-slate-900 flex items-center justify-center shadow-2xl">
                        <Zap className="h-10 w-10 text-primary animate-bounce" />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Muscularbox Neural Sync</p>
                        <p className="text-xs font-bold text-slate-300 mt-2 italic">Securing Clinical Data Feed...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12 max-w-7xl mx-auto pb-20">
            {/* Ultra-Premium Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] -mr-48 -mt-48" />
                
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-slate-900 text-primary border-none rounded-xl px-4 py-1.5 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck className="h-3 w-3" />
                            {role} VERIFIED ACCESS
                        </Badge>
                        <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Cloud Connection</span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 uppercase leading-none">Command Center</h1>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2 italic">
                        <Globe className="h-4 w-4 text-slate-300" />
                        Authenticated: {user?.email}
                    </p>
                </div>

                <div className="relative z-10 flex gap-4">
                    <Button asChild className="h-16 px-10 rounded-2xl bg-primary hover:bg-emerald-400 text-slate-900 font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95">
                        <Link href="/patients/new" className="flex items-center gap-3">
                            <RefreshCcw className="h-5 w-5" />
                            New Registration
                        </Link>
                    </Button>
                </div>
            </div>

            {/* High-Density Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "Total Patients", value: stats?.totalPatients || 0, icon: Users, color: "bg-blue-500", trend: "+12% this month" },
                    { label: "Clinical Sessions", value: stats?.todayAppointments || 0, icon: Calendar, color: "bg-purple-500", trend: "8 Pending Today" },
                    { label: "Package Assets", value: stats?.activePackages || 0, icon: Package, color: "bg-amber-500", trend: "₹1.2L Unrealized" },
                    { label: "Revenue Flux", value: stats?.revenue ? `₹${stats.revenue}` : "---", icon: TrendingUp, color: "bg-emerald-500", trend: "Real-time Feed" },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl shadow-slate-100 rounded-[2.5rem] bg-white group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <CardContent className="p-10">
                            <div className="flex justify-between items-start mb-10">
                                <div className={`p-4 ${stat.color} rounded-2xl shadow-lg shadow-inherit transition-transform group-hover:scale-110`}>
                                    <stat.icon className="h-7 w-7 text-white" />
                                </div>
                                <ArrowUpRight className="h-5 w-5 text-slate-200 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-4 flex items-center gap-1.5">
                                    <Activity className="h-3 w-3" />
                                    {stat.trend}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Performance & Intelligence Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-100 rounded-[3rem] bg-white overflow-hidden">
                    <CardHeader className="px-12 py-10 border-b bg-slate-50/50 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black uppercase tracking-tighter">Business Intelligence</CardTitle>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Live Revenue Stream Analysis</p>
                            </div>
                        </div>
                        <Badge variant="outline" className="rounded-xl font-black border-slate-200 px-4 py-2 text-[10px] uppercase tracking-widest">Cloud Engine: Active</Badge>
                    </CardHeader>
                    <CardContent className="p-12">
                        <div className="h-[350px] w-full">
                            <RevenueChart />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <Card className="border-none shadow-2xl shadow-slate-900/30 rounded-[3rem] bg-slate-900 text-white p-12 relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[100px] -mr-40 -mt-40" />
                        
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <History className="h-5 w-5 text-primary" />
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Staff Intelligence Feed</h3>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { action: "Patient Registration", time: "2m ago", user: "Admin" },
                                        { action: "Payment Processed", time: "15m ago", user: "Accountant" },
                                        { action: "Package Depletion", time: "1h ago", user: "Therapist" },
                                    ].map((log, i) => (
                                        <div key={i} className="flex gap-4 p-5 bg-slate-800/40 rounded-3xl border border-slate-800 transition-hover hover:bg-slate-800/60 cursor-default">
                                            <div className="h-10 w-10 rounded-xl bg-slate-700 flex items-center justify-center font-black text-[10px]">
                                                {log.user[0]}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-tight">{log.action}</p>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{log.time} • By {log.user}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button variant="outline" className="mt-12 rounded-2xl border-slate-700 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] h-16 w-full">
                                View All Audit Logs
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

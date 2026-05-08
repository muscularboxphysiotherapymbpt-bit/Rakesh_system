"use client";

import { useAuth } from "@/context/auth-context";
import { useERPData } from "@/hooks/use-erp-data";
import { Card, CardContent } from "@/components/ui/card";
import { 
    Users, 
    Package, 
    TrendingUp, 
    Activity, 
    ArrowUpRight,
    Zap,
    History,
    RefreshCcw,
    LayoutGrid,
    BarChart3
} from "lucide-react";
import { RevenueChart } from "@/components/financial-charts";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const { user, role } = useAuth();
    const { data: stats, loading } = useERPData("getDashboardStats");

    if (loading) {
        return (
            <div className="h-[70vh] flex flex-col items-center justify-center gap-8 animate-pulse">
                <img src="/logo.png" alt="Loading..." className="h-20 w-auto opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Neural Sync In Progress</p>
            </div>
        );
    }

    return (
        <div className="p-10 lg:p-16 space-y-16 max-w-[1600px] mx-auto">
            {/* Main Operational Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                
                {/* Stats Section */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "Clinical Database", value: stats?.totalPatients || 0, icon: Users, color: "text-blue-500", detail: "Active Medical Records" },
                        { label: "Package Inventory", value: stats?.activePackages || 0, icon: Package, color: "text-amber-500", detail: "Current Patient Assets" },
                        { label: "Revenue Stream", value: stats?.revenue ? `₹${stats.revenue}` : "---", icon: TrendingUp, color: "text-emerald-500", detail: "Live Financial Feed" },
                    ].map((stat, i) => (
                        <Card key={i} className="border-none shadow-2xl shadow-slate-200/40 rounded-[3rem] bg-white group hover:shadow-slate-300 transition-all duration-500 hover:-translate-y-2">
                            <CardContent className="p-12">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="p-5 bg-slate-50 rounded-2xl group-hover:bg-slate-900 transition-colors duration-500">
                                        <stat.icon className={`h-8 w-8 ${stat.color} group-hover:text-primary`} />
                                    </div>
                                    <Badge className="bg-slate-50 text-slate-400 border-none font-black text-[9px] uppercase tracking-widest px-3 py-1">Synced</Badge>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</h3>
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-4">{stat.detail}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Integrated Analytics Card */}
                    <Card className="md:col-span-3 border-none shadow-2xl shadow-slate-200/40 rounded-[3rem] bg-white overflow-hidden">
                        <div className="p-12 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="h-14 w-14 rounded-[1.5rem] bg-slate-900 flex items-center justify-center">
                                    <BarChart3 className="h-7 w-7 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 leading-none">Financial Performance</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Real-time Revenue Fluctuations</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Update Latency</p>
                                    <p className="text-xs font-black text-emerald-500">42ms</p>
                                </div>
                                <RefreshCcw className="h-5 w-5 text-slate-200 animate-spin-slow" />
                            </div>
                        </div>
                        <div className="p-12 h-[450px]">
                            <RevenueChart />
                        </div>
                    </Card>
                </div>

                {/* Audit & Intelligence Sidebar */}
                <div className="space-y-10">
                    <Card className="border-none shadow-2xl shadow-slate-900/20 rounded-[3rem] bg-slate-900 text-white p-12 h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
                        
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="space-y-12">
                                <div className="flex items-center gap-4">
                                    <History className="h-6 w-6 text-primary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest">Master Audit Trail</h3>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        { action: "Registration", user: "Admin", time: "2m" },
                                        { action: "Billing Sync", user: "Accountant", time: "15m" },
                                        { action: "Assessment", user: "Therapist", time: "1h" },
                                    ].map((log, i) => (
                                        <div key={i} className="flex items-center gap-5 group cursor-default">
                                            <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-[10px] text-slate-500 border border-white/5 transition-all group-hover:border-primary/50 group-hover:text-primary">
                                                {log.user[0]}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-tight">{log.action}</p>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{log.time} ago • {log.user}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-12 space-y-6">
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <LayoutGrid className="h-4 w-4 text-primary" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Cloud Density</p>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-2/3 bg-primary rounded-full" />
                                    </div>
                                </div>
                                <Button className="w-full h-20 rounded-[2rem] bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-xl shadow-white/5">
                                    System Console
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}

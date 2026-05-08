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
    ShieldCheck
} from "lucide-react";
import { RevenueChart } from "@/components/financial-charts";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
    const { user, role } = useAuth();
    const { data: stats, loading, error } = useERPData("getDashboardStats");

    if (loading) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing with Muscularbox Cloud...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Command Center</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-slate-900 text-primary border-none rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-widest">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            {role} ACCESS
                        </Badge>
                        <p className="text-slate-400 font-bold text-sm">Welcome back, {user?.email?.split('@')[0]}</p>
                    </div>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">System Status</p>
                    <p className="text-xs font-black text-green-500 uppercase tracking-tighter">Operational • Latency: 42ms</p>
                </div>
            </div>

            {/* Real-time Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Patients", value: stats?.totalPatients || 0, icon: Users, color: "text-blue-500" },
                    { label: "Sessions Today", value: stats?.todayAppointments || 0, icon: Calendar, color: "text-purple-500" },
                    { label: "Active Packages", value: stats?.activePackages || 0, icon: Package, color: "text-amber-500" },
                    { label: "Total Revenue", value: stats?.revenue ? `₹${stats.revenue}` : "---", icon: TrendingUp, color: "text-green-500" },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm rounded-3xl bg-white group hover:shadow-xl transition-all">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 bg-slate-50 rounded-2xl group-hover:bg-slate-900 transition-colors`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color} group-hover:text-white transition-colors`} />
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-slate-200 group-hover:text-primary transition-colors" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-10 py-8 border-b bg-slate-50/50 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Business Intelligence
                        </CardTitle>
                        <Badge variant="outline" className="rounded-lg font-bold border-slate-200 px-3 py-1">LIVE CLOUD FEED</Badge>
                    </CardHeader>
                    <CardContent className="p-10">
                        <RevenueChart />
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-slate-900 text-white p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">AI Recovery Prediction</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-primary text-xs italic">
                                    65%
                                </div>
                                <div>
                                    <p className="text-sm font-black">Average Recovery Rate</p>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Optimized for Physiotherapy</p>
                                </div>
                            </div>
                            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Smart Insight</p>
                                <p className="text-xs font-bold leading-relaxed">
                                    Patient retention is up by 12%. Post-surgical packages are your highest revenue drivers this week.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart, VisitsChart } from "@/components/financial-charts";
import { 
    TrendingUp, 
    Users, 
    CreditCard, 
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Clock
} from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Revenue", value: "₹2,45,000", change: "+12.5%", trending: "up", icon: CreditCard },
        { label: "Active Patients", value: "1,240", change: "+4.2%", trending: "up", icon: Users },
        { label: "Daily Visits", value: "48", change: "-2.1%", trending: "down", icon: Activity },
        { label: "Growth Rate", value: "18.2%", change: "+5.4%", trending: "up", icon: TrendingUp },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Financial Intelligence</h1>
                <p className="text-slate-500 font-medium">Real-time business analytics and growth monitoring.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-slate-50 rounded-xl">
                                    <stat.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className={`flex items-center text-xs font-bold ${stat.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                    {stat.change}
                                    {stat.trending === 'up' ? <ArrowUpRight className="h-3 w-3 ml-1" /> : <ArrowDownRight className="h-3 w-3 ml-1" />}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-8 pt-8 pb-0">
                        <CardTitle className="text-lg font-black flex items-center gap-2 uppercase tracking-tighter">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Revenue Trend
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <RevenueChart />
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-8 pt-8 pb-0">
                        <CardTitle className="text-lg font-black flex items-center gap-2 uppercase tracking-tighter">
                            <Activity className="h-5 w-5 text-primary" />
                            Visit Analytics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <VisitsChart />
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-8 py-6 border-b bg-slate-50/50">
                        <CardTitle className="text-lg font-black uppercase tracking-tighter">Package Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {[
                                { name: "Post-Surgical Rehab (10+1)", sales: 42, revenue: "₹84,000", status: "Hot" },
                                { name: "Sports Recovery Package", sales: 28, revenue: "₹56,000", status: "Steady" },
                                { name: "Geriatric Mobility", sales: 15, revenue: "₹30,000", status: "Rising" },
                            ].map((pkg, i) => (
                                <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary text-xs">
                                            #{i + 1}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{pkg.name}</p>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{pkg.sales} Units Sold</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-slate-900">{pkg.revenue}</p>
                                        <p className="text-[10px] font-black uppercase text-green-500 tracking-widest">{pkg.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-8 py-6 border-b bg-slate-50/50">
                        <CardTitle className="text-lg font-black uppercase tracking-tighter">Staff Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {[
                                { user: "Dr. Rakesh", action: "Marked Attendance", target: "Patient #0024", time: "2 mins ago" },
                                { user: "Staff Arun", action: "Recorded Payment", target: "₹5,000", time: "15 mins ago" },
                                { user: "Dr. Rakesh", action: "Updated Treatment", target: "Patient #0018", time: "45 mins ago" },
                                { user: "Staff Arun", action: "Booked Appointment", target: "Tomorrow, 10 AM", time: "1 hour ago" },
                            ].map((log, i) => (
                                <div key={i} className="px-6 py-4 flex items-start gap-4">
                                    <div className="p-2 bg-slate-100 rounded-lg mt-1">
                                        <Clock className="h-3 w-3 text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-900">
                                            <span className="text-primary">{log.user}</span> {log.action}
                                        </p>
                                        <p className="text-[10px] font-medium text-slate-400 mt-0.5">{log.target} • {log.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

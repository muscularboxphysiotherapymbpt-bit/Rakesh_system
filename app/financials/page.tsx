"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    CreditCard, 
    ArrowUpRight, 
    ArrowDownRight, 
    TrendingUp, 
    DollarSign, 
    PieChart, 
    Download,
    Calendar,
    Filter,
    FileText
} from "lucide-react";
import { RevenueChart } from "@/components/financial-charts";
import { Badge } from "@/components/ui/badge";
import { InvoiceGenerator } from "@/components/invoice-generator";

export default function FinancialIntelPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Financial Intelligence Deep-Dive</h1>
                    <p className="text-slate-500 font-medium">Advanced business tracking and revenue growth analytics.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl font-black px-6 gap-2 border-slate-200">
                        <Calendar className="h-4 w-4" />
                        LAST 30 DAYS
                    </Button>
                    <Button className="rounded-2xl font-black px-6 gap-2 bg-slate-900 hover:bg-black shadow-lg">
                        <Download className="h-4 w-4" />
                        EXPORT AUDIT
                    </Button>
                </div>
            </div>

            {/* Top Level Intelligence */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-none shadow-sm rounded-3xl bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <DollarSign className="h-24 w-24" />
                    </div>
                    <CardContent className="p-10 relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Monthly Revenue</p>
                        <h3 className="text-5xl font-black mb-4 tracking-tighter">₹2.45L</h3>
                        <div className="flex items-center gap-2 text-green-400 font-black text-sm">
                            <ArrowUpRight className="h-4 w-4" />
                            +18.4% VS LAST MONTH
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardContent className="p-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Outstanding Balances</p>
                        <h3 className="text-5xl font-black mb-4 tracking-tighter text-red-500">₹42.8K</h3>
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                            12 PATIENTS WITH DUES
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardContent className="p-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Collection Rate</p>
                        <h3 className="text-5xl font-black mb-4 tracking-tighter text-slate-900">92.4%</h3>
                        <div className="flex items-center gap-2 text-green-500 font-black text-sm">
                            <TrendingUp className="h-4 w-4" />
                            +2.1% IMPROVEMENT
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Growth Analytics */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-10 pt-10 pb-0 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-primary" />
                            Revenue Streams
                        </CardTitle>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="text-[10px] font-black text-slate-400 uppercase">Packages</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-slate-200"></div>
                                <span className="text-[10px] font-black text-slate-400 uppercase">Visits</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10">
                        <RevenueChart />
                    </CardContent>
                </Card>

                {/* Outstanding Payment Monitoring */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-10 py-8 border-b bg-slate-50/50">
                        <CardTitle className="text-lg font-black uppercase tracking-tighter">Outstanding Ledger</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {[
                                { name: "Rohan Sharma", due: "₹2,500", days: 12, risk: "Low" },
                                { name: "Priya Patel", due: "₹8,400", days: 45, risk: "High" },
                                { name: "Amit Kumar", due: "₹1,200", days: 5, risk: "Low" },
                                { name: "Sunita Verma", due: "₹5,000", days: 22, risk: "Medium" },
                            ].map((p, i) => (
                                <div key={i} className="px-10 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div>
                                        <p className="font-black text-slate-900 mb-1">{p.name}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending for {p.days} Days</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-red-500 mb-1">{p.due}</p>
                                        <Badge variant="outline" className={`rounded-lg font-black text-[10px] uppercase border-none px-2 ${
                                            p.risk === 'High' ? 'bg-red-100 text-red-700' : 
                                            p.risk === 'Medium' ? 'bg-amber-100 text-amber-700' : 
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {p.risk} RISK
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-8 text-center bg-slate-50/50">
                            <Button variant="link" className="font-black text-xs text-primary uppercase tracking-widest">View Full Ledger →</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                <CardHeader className="px-10 py-8 border-b bg-slate-50/50 flex flex-row justify-between items-center">
                    <CardTitle className="text-lg font-black uppercase tracking-tighter">Recent Billing Activities</CardTitle>
                    <Button variant="ghost" className="rounded-xl font-black text-xs gap-2 text-slate-400">
                        <Filter className="h-4 w-4" />
                        FILTER BY METHOD
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b">
                                <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice</th>
                                <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Patient</th>
                                <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Method</th>
                                <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                                <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {[
                                { id: "INV-5521", name: "Vicky Singh", method: "UPI", amount: "₹12,000", status: "Paid" },
                                { id: "INV-5522", name: "Anita Devi", method: "Cash", amount: "₹4,500", status: "Paid" },
                                { id: "INV-5523", name: "Rahul Jha", method: "Card", amount: "₹8,500", status: "Paid" },
                            ].map((inv, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-10 py-6 font-black text-slate-900 text-sm">{inv.id}</td>
                                    <td className="px-10 py-6 font-bold text-slate-600 text-sm">{inv.name}</td>
                                    <td className="px-10 py-6 font-bold text-slate-500 text-xs uppercase tracking-widest">{inv.method}</td>
                                    <td className="px-10 py-6 font-black text-slate-900 text-sm">{inv.amount}</td>
                                    <td className="px-10 py-6 text-right">
                                        <InvoiceGenerator data={{
                                            invoiceId: inv.id,
                                            patientName: inv.name,
                                            patientId: "MBP-2026-00" + (i+1),
                                            date: "08 May 2026",
                                            items: [{ description: "Treatment Package Session", amount: parseInt(inv.amount.replace('₹', '').replace(',', '')) }],
                                            total: parseInt(inv.amount.replace('₹', '').replace(',', '')),
                                            amountPaid: parseInt(inv.amount.replace('₹', '').replace(',', '')),
                                            balance: 0
                                        }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}

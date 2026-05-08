"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Plus, Trash2, Edit3, CheckCircle2 } from "lucide-react";

export default function PackagesPage() {
    const [packages, setPackages] = useState([
        { id: "P1", name: "Premium Post-Op Rehab", price: "₹8,500", sessions: 10, bonus: 1, validity: "60 Days" },
        { id: "P2", name: "Sports Performance", price: "₹12,000", sessions: 15, bonus: 2, validity: "90 Days" },
        { id: "P3", name: "Pain Management Basic", price: "₹4,500", sessions: 5, bonus: 0, validity: "30 Days" },
    ]);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Package Intelligence</h1>
                    <p className="text-slate-500 font-medium">Configure therapy packages and session automation.</p>
                </div>
                <Button className="rounded-2xl font-black px-6 gap-2 bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    CREATE PACKAGE
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <Card key={pkg.id} className="border-none shadow-sm rounded-3xl overflow-hidden group">
                        <CardHeader className="bg-slate-50 p-6 border-b flex flex-row justify-between items-center">
                            <div className="p-3 bg-white rounded-2xl shadow-sm">
                                <Package className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white shadow-sm hover:text-primary">
                                    <Edit3 className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white shadow-sm hover:text-red-500">
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <h3 className="text-xl font-black text-slate-900 mb-1">{pkg.name}</h3>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">{pkg.id}</p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pricing</p>
                                    <p className="text-lg font-black text-primary">{pkg.price}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Validity</p>
                                    <p className="text-lg font-black text-slate-700">{pkg.validity}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-900">{pkg.sessions} + {pkg.bonus} Sessions</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Auto-Marking Enabled</p>
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center font-black text-[10px] text-white">
                                    {pkg.sessions + pkg.bonus}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* New Package Form (Placeholder Card) */}
                <Card className="border-2 border-dashed border-slate-200 shadow-none rounded-3xl flex flex-col items-center justify-center p-12 hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-primary/10 transition-colors">
                        <Plus className="h-8 w-8 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="mt-4 font-black text-slate-400 group-hover:text-primary transition-colors">Add New Template</p>
                </Card>
            </div>
        </div>
    );
}

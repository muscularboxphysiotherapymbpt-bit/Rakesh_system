"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    PackageSearch, 
    Plus, 
    AlertTriangle, 
    Wrench, 
    History,
    Search,
    ChevronRight,
    Boxes
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function InventoryPage() {
    const items = [
        { id: "INV-001", name: "IFT Machine (Elite Series)", category: "Electrotherapy", stock: 2, status: "Operational", maintenance: "2026-06-15" },
        { id: "INV-002", name: "Ultrasound Gel", category: "Consumables", stock: 5, unit: "Bottles", status: "Low Stock", maintenance: "N/A" },
        { id: "INV-003", name: "Traction Table", category: "Equipment", stock: 1, status: "Under Maintenance", maintenance: "Today" },
        { id: "INV-004", name: "Therabands (Red/Blue)", category: "Consumables", stock: 24, unit: "Meters", status: "Operational", maintenance: "N/A" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Inventory Management</h1>
                    <p className="text-slate-500 font-medium">Monitor equipment health and medical stock levels.</p>
                </div>
                <Button className="rounded-2xl font-black px-6 gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    <Plus className="h-4 w-4" />
                    ADD NEW ITEM
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm rounded-3xl bg-slate-900 text-white overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-slate-800 rounded-2xl">
                                <Boxes className="h-6 w-6 text-primary" />
                            </div>
                            <Badge className="bg-primary/20 text-primary border-none rounded-lg font-black text-[10px] px-3 py-1">REAL-TIME</Badge>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Assets</p>
                        <h3 className="text-4xl font-black">₹4.2L+</h3>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-red-50 rounded-2xl">
                                <AlertTriangle className="h-6 w-6 text-red-500" />
                            </div>
                            <Badge className="bg-red-50 text-red-500 border-none rounded-lg font-black text-[10px] px-3 py-1">URGENT</Badge>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Low Stock Alerts</p>
                        <h3 className="text-4xl font-black text-slate-900">03</h3>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-amber-50 rounded-2xl">
                                <Wrench className="h-6 w-6 text-amber-500" />
                            </div>
                            <Badge className="bg-amber-50 text-amber-500 border-none rounded-lg font-black text-[10px] px-3 py-1">PENDING</Badge>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Maintenance Due</p>
                        <h3 className="text-4xl font-black text-slate-900">01</h3>
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border">
                <Search className="h-5 w-5 text-slate-400 ml-2" />
                <Input 
                    placeholder="Search equipment, consumables or maintenance records..." 
                    className="border-none shadow-none focus-visible:ring-0 w-full font-bold text-slate-600"
                />
            </div>

            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory Item</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Stock / Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Next Maintenance</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {items.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                                    <PackageSearch className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 leading-none mb-1">{item.name}</p>
                                                    <p className="text-[10px] font-black text-primary tracking-widest">{item.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge variant="outline" className="rounded-lg border-slate-200 font-bold text-slate-500 uppercase text-[10px]">{item.category}</Badge>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <p className="text-sm font-black text-slate-700">{item.stock} {item.unit || "Units"}</p>
                                                <p className={`text-[10px] font-black uppercase tracking-widest ${item.status === 'Operational' ? 'text-green-500' : 'text-red-500'}`}>{item.status}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-slate-300" />
                                                <p className="text-xs font-black text-slate-600 uppercase tracking-tighter">{item.maintenance}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm">
                                                    <Wrench className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm">
                                                    <History className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary">
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

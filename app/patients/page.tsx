"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Users, 
    UserPlus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    ChevronRight,
    FileText,
    History,
    Activity
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function PatientsListPage() {
    const [search, setSearch] = useState("");
    const patients = [
        { id: "MBP-2026-001", name: "Rohan Sharma", phone: "9876543210", injury: "ACL Tear (Post-Op)", status: "Active", risk: "Low" },
        { id: "MBP-2026-002", name: "Priya Patel", phone: "9988776655", injury: "Lumbar Disc Prolapse", status: "Active", risk: "Medium" },
        { id: "MBP-2026-003", name: "Amit Kumar", phone: "9123456789", injury: "Frozen Shoulder", status: "On-Hold", risk: "High" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Patient Management</h1>
                    <p className="text-slate-500 font-medium">Enterprise database of clinical records and recovery progress.</p>
                </div>
                <Button asChild className="rounded-2xl font-black px-6 gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    <Link href="/patients/new">
                        <UserPlus className="h-4 w-4" />
                        REGISTER PATIENT
                    </Link>
                </Button>
            </div>

            <div className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border">
                <Search className="h-5 w-5 text-slate-400 ml-2" />
                <Input 
                    placeholder="Search by ID, Name, Phone or Clinical Condition..." 
                    className="border-none shadow-none focus-visible:ring-0 w-full font-bold text-slate-600"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="ghost" className="rounded-xl font-black text-xs gap-2 text-slate-400 hover:text-primary">
                    <Filter className="h-4 w-4" />
                    FILTERS
                </Button>
            </div>

            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Identity</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Clinical Condition</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {patients.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400">
                                                    {p.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 leading-none mb-1">{p.name}</p>
                                                    <p className="text-[10px] font-black text-primary tracking-widest">{p.id} • {p.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <p className="text-sm font-bold text-slate-700">{p.injury}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <div className={`h-1.5 w-1.5 rounded-full ${p.risk === 'Low' ? 'bg-green-500' : p.risk === 'Medium' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{p.risk} Risk</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge className={`rounded-lg font-black text-[10px] uppercase tracking-widest px-3 py-1 border-none shadow-none ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {p.status}
                                            </Badge>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm" title="View Profile">
                                                    <History className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm" title="Clinical Notes">
                                                    <FileText className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary hover:shadow-sm">
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

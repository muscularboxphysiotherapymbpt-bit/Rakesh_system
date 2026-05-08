"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    CheckCircle2, 
    XCircle, 
    Search, 
    Calendar as CalendarIcon,
    AlertCircle,
    User
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AttendancePage() {
    const [search, setSearch] = useState("");
    const [patients, setPatients] = useState([
        { id: "MB001", name: "Rohan Sharma", package: "Post-Op (10+1)", remaining: 4, lastVisit: "2026-05-06" },
        { id: "MB002", name: "Priya Patel", package: "Sports Rehab (15+2)", remaining: 12, lastVisit: "2026-05-05" },
        { id: "MB003", name: "Amit Kumar", package: "Pain Basic (5+0)", remaining: 1, lastVisit: "2026-05-04" },
    ]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Attendance Intelligence</h1>
                    <p className="text-slate-500 font-medium">Mark session consumption and track package usage.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border w-full md:w-auto">
                    <Search className="h-5 w-5 text-slate-400 ml-2" />
                    <Input 
                        placeholder="Search patient ID or name..." 
                        className="border-none shadow-none focus-visible:ring-0 w-full md:w-64 font-bold"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                <CardHeader className="bg-slate-50 px-8 py-6 border-b flex flex-row justify-between items-center">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        Sessions for Today: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none rounded-lg px-3 py-1 font-black text-[10px]">
                            12 PRESENT
                        </Badge>
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none rounded-lg px-3 py-1 font-black text-[10px]">
                            2 ABSENT
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Patient</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Active Package</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Remaining</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Last Session</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Quick Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {patients.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                                    <User className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 leading-none mb-1">{p.name}</p>
                                                    <p className="text-[10px] font-black text-primary tracking-widest">{p.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="rounded-lg border-slate-200 font-bold text-slate-600 bg-white shadow-sm">
                                                    {p.package}
                                                </Badge>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className={`inline-flex items-center justify-center h-8 w-12 rounded-lg font-black text-xs ${p.remaining <= 2 ? 'bg-red-50 text-red-500' : 'bg-slate-900 text-white'}`}>
                                                {p.remaining}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-600 uppercase tracking-tighter">{p.lastVisit}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button className="h-10 rounded-xl px-4 gap-2 font-black text-xs bg-green-500 hover:bg-green-600 shadow-sm transition-all active:scale-95">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    PRESENT
                                                </Button>
                                                <Button variant="outline" className="h-10 rounded-xl px-4 gap-2 font-black text-xs border-red-200 text-red-500 hover:bg-red-50 transition-all active:scale-95">
                                                    <XCircle className="h-4 w-4" />
                                                    ABSENT
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

            <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertCircle className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-black uppercase tracking-tighter">Operational Integrity Rule</h3>
                    </div>
                    <p className="text-slate-400 font-medium max-w-xl">
                        Attendance records are <span className="text-white font-bold underline">non-deletable</span> once marked. 
                        Every entry is linked to your staff ID for audit transparency. 
                        Only Admins can correct historical marking errors.
                    </p>
                </div>
                <Button variant="secondary" className="relative z-10 rounded-2xl font-black px-8 py-6 shadow-xl hover:scale-105 transition-transform">
                    VIEW AUDIT LOGS
                </Button>
            </div>
        </div>
    );
}

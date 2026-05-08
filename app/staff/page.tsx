"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    ClipboardList, 
    UserPlus, 
    Activity, 
    CreditCard, 
    Calendar,
    Clock,
    Filter,
    Download
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StaffIntelligencePage() {
    const logs = [
        { id: 1, user: "Dr. Rakesh", action: "Updated Treatment Plan", target: "Patient #MB0024", time: "10:45 AM", date: "Today", type: "medical" },
        { id: 2, user: "Staff Arun", action: "Recorded Payment", target: "₹12,000 (UPI)", time: "10:15 AM", date: "Today", type: "financial" },
        { id: 3, user: "Dr. Rakesh", action: "Marked Attendance", target: "Patient #MB0012", time: "09:30 AM", date: "Today", type: "operational" },
        { id: 4, user: "Staff Arun", action: "Booked Appointment", target: "12 May, 11:30 AM", time: "Yesterday", date: "Yesterday", type: "appointment" },
        { id: 5, user: "Dr. Rakesh", action: "Created New Patient", target: "Sunita Verma", time: "Yesterday", date: "Yesterday", type: "admin" },
    ];

    const getTypeColor = (type: string) => {
        switch(type) {
            case "financial": return "bg-green-100 text-green-700";
            case "medical": return "bg-blue-100 text-blue-700";
            case "operational": return "bg-purple-100 text-purple-700";
            case "appointment": return "bg-amber-100 text-amber-700";
            default: return "bg-slate-100 text-slate-700";
        }
    };

    const getTypeIcon = (type: string) => {
        switch(type) {
            case "financial": return CreditCard;
            case "medical": return Activity;
            case "operational": return ClipboardList;
            case "appointment": return Calendar;
            default: return Clock;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Staff Intelligence</h1>
                    <p className="text-slate-500 font-medium">Monitoring clinic operational transparency and activity timelines.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl font-black px-6 gap-2 border-slate-200">
                        <Filter className="h-4 w-4" />
                        FILTER LOGS
                    </Button>
                    <Button variant="outline" className="rounded-2xl font-black px-6 gap-2 border-slate-200">
                        <Download className="h-4 w-4" />
                        EXPORT REPORT
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Stats Sidebar */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm rounded-3xl bg-slate-900 text-white overflow-hidden">
                        <CardContent className="p-8">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Actions (Today)</p>
                            <h3 className="text-4xl font-black mb-6">124</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-bold">Dr. Rakesh</span>
                                    <span className="font-black">48</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[40%]"></div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-bold">Staff Arun</span>
                                    <span className="font-black">76</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full w-[60%]"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                        <CardHeader className="p-6 border-b">
                            <CardTitle className="text-xs font-black uppercase tracking-widest">Active Staff</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            {["Dr. Rakesh", "Staff Arun"].map((name) => (
                                <div key={name} className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <p className="text-sm font-black text-slate-700">{name}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Timeline */}
                <Card className="lg:col-span-3 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-8 py-6 border-b bg-slate-50/50">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">System Audit Trail</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {logs.map((log) => {
                                const Icon = getTypeIcon(log.type);
                                return (
                                    <div key={log.id} className="px-8 py-6 flex items-start gap-6 hover:bg-slate-50 transition-colors">
                                        <div className="flex flex-col items-center">
                                            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{log.time}</p>
                                            <div className={`p-3 rounded-2xl ${getTypeColor(log.type)} shadow-sm`}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-black text-slate-900 leading-none mb-2">
                                                        <span className="text-primary">{log.user}</span> {log.action}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="rounded-lg font-bold text-[10px] uppercase tracking-tighter border-slate-200 px-2">
                                                            {log.target}
                                                        </Badge>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.date}</span>
                                                    </div>
                                                </div>
                                                <Badge className={`rounded-lg font-black text-[10px] uppercase tracking-widest px-3 py-1 ${getTypeColor(log.type)} border-none shadow-none`}>
                                                    {log.type}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="p-8 text-center bg-slate-50/50">
                            <Button variant="ghost" className="font-black text-xs text-primary hover:bg-primary/5 rounded-xl uppercase tracking-widest">
                                LOAD MORE LOGS
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

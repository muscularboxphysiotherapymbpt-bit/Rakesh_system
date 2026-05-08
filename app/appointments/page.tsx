"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Calendar, 
    ChevronLeft, 
    ChevronRight, 
    Plus, 
    Clock, 
    User, 
    Activity,
    CheckCircle2,
    XCircle,
    MoreVertical
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AppointmentsPage() {
    const appointments = [
        { id: 1, time: "09:00 AM", patient: "Rohan Sharma", therapist: "Dr. Rakesh", type: "Post-Op Rehab", status: "Confirmed" },
        { id: 2, time: "10:30 AM", patient: "Priya Patel", therapist: "Dr. Rakesh", type: "Sports Recovery", status: "Confirmed" },
        { id: 3, time: "11:45 AM", patient: "Amit Kumar", therapist: "Staff Arun", type: "Frozen Shoulder", status: "In-Progress" },
        { id: 4, time: "02:00 PM", patient: "Sunita Verma", therapist: "Dr. Rakesh", type: "Initial Assessment", status: "Pending" },
        { id: 5, time: "04:30 PM", patient: "Vicky Singh", therapist: "Staff Arun", type: "Maintenance", status: "Cancelled" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Appointment Management</h1>
                    <p className="text-slate-500 font-medium">Coordinate therapist availability and patient sessions.</p>
                </div>
                <Button className="rounded-2xl font-black px-6 gap-2 bg-slate-900 hover:bg-black shadow-lg">
                    <Plus className="h-4 w-4" />
                    BOOK SESSION
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Date Selection Sidebar */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50 px-6 py-4 border-b flex flex-row justify-between items-center">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">May 2026</h3>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><ChevronLeft className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><ChevronRight className="h-4 w-4" /></Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                    <span key={day} className="text-[10px] font-black text-slate-300">{day}</span>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: 31 }).map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`h-8 w-full rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer transition-colors ${i + 1 === 7 ? 'bg-primary text-white shadow-md' : 'hover:bg-slate-50 text-slate-600'}`}
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm rounded-3xl bg-slate-900 text-white p-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Therapist Capacity</h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>Dr. Rakesh</span>
                                    <span>8/10</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[80%]"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>Staff Arun</span>
                                    <span>4/8</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[50%]"></div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Schedule Timeline */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Schedule for Thursday, 07 May</h2>
                        <Badge variant="outline" className="rounded-lg border-slate-200 font-bold px-3 py-1">5 SESSIONS BOOKED</Badge>
                    </div>

                    <div className="space-y-3">
                        {appointments.map((appt) => (
                            <Card key={appt.id} className="border-none shadow-sm rounded-2xl bg-white overflow-hidden group hover:shadow-md transition-shadow">
                                <CardContent className="p-0 flex">
                                    <div className="w-24 bg-slate-50 border-r flex flex-col items-center justify-center py-4">
                                        <Clock className="h-4 w-4 text-slate-400 mb-1" />
                                        <span className="text-xs font-black text-slate-900">{appt.time.split(' ')[0]}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{appt.time.split(' ')[1]}</span>
                                    </div>
                                    <div className="flex-1 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                                <User className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 leading-none mb-1">{appt.patient}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                    <Activity className="h-3 w-3 text-primary" />
                                                    {appt.type}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right hidden md:block">
                                                <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Therapist</p>
                                                <p className="text-xs font-bold text-slate-700">{appt.therapist}</p>
                                            </div>
                                            <Badge className={`rounded-lg font-black text-[10px] uppercase tracking-widest px-3 py-1 border-none shadow-none ${
                                                appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                appt.status === 'In-Progress' ? 'bg-blue-100 text-blue-700' :
                                                appt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                'bg-amber-100 text-amber-700'
                                            }`}>
                                                {appt.status}
                                            </Badge>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical className="h-4 w-4 text-slate-400" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

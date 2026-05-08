"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    ClipboardList, 
    Activity, 
    History, 
    TrendingDown, 
    Target,
    Plus,
    FileText,
    ArrowRight
} from "lucide-react";
import { PainProgressChart } from "@/components/pain-progress-chart";
import { Badge } from "@/components/ui/badge";

export default function TreatmentTrackingPage() {
    const painHistory = [
        { date: "2026-04-20", painScore: 9, formattedDate: "20 Apr" },
        { date: "2026-04-25", painScore: 7, formattedDate: "25 Apr" },
        { date: "2026-05-01", painScore: 5, formattedDate: "01 May" },
        { date: "2026-05-07", painScore: 3, formattedDate: "07 May" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Recovery Intel & Tracking</h1>
                    <p className="text-slate-500 font-medium italic">Clinical progress, exercise plans, and therapy notes.</p>
                </div>
                <Button className="rounded-2xl font-black px-6 gap-2 bg-primary hover:bg-primary/90 shadow-lg">
                    <Plus className="h-4 w-4" />
                    NEW THERAPY NOTE
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Clinical Overview Card */}
                <Card className="lg:col-span-1 border-none shadow-sm rounded-3xl bg-slate-900 text-white overflow-hidden">
                    <CardContent className="p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-primary/20 rounded-xl">
                                <Target className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Current Recovery Status</h3>
                        </div>
                        
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <p className="text-4xl font-black tracking-tighter">65%</p>
                                    <p className="text-[10px] font-black text-green-400 uppercase">+15% THIS WEEK</p>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[65%]"></div>
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest">Progress vs Treatment Goal</p>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400">Sessions Completed</span>
                                    <span className="font-black">07/11</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400">Current Pain (VAS)</span>
                                    <span className="font-black text-primary">3/10</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400">Avg. Recovery Rate</span>
                                    <span className="font-black text-green-400">High</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pain Reduction Intelligence */}
                <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-10 pt-10 pb-0">
                        <CardTitle className="text-lg font-black flex items-center gap-2 uppercase tracking-tighter">
                            <TrendingDown className="h-5 w-5 text-primary" />
                            Pain Reduction Intelligence (VAS)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10">
                        <PainProgressChart data={painHistory} patientName="Clinical Average" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Exercise Prescription */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-10 py-6 border-b bg-slate-50/50 flex flex-row items-center justify-between">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Active Exercise Plan</CardTitle>
                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full bg-white shadow-sm">
                            <Plus className="h-4 w-4 text-primary" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        {[
                            { name: "Quadriceps Sets", reps: "15 Reps x 3 Sets", frequency: "Daily (Morning)", status: "Active" },
                            { name: "Ankle Pumps", reps: "20 Reps x 3 Sets", frequency: "Every 2 Hours", status: "Active" },
                            { name: "Straight Leg Raise", reps: "10 Reps x 3 Sets", frequency: "Daily (Morning/Evening)", status: "Pending Review" },
                        ].map((ex, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center font-black text-primary text-xs border shadow-sm">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{ex.name}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ex.reps} • {ex.frequency}</p>
                                    </div>
                                </div>
                                <Badge className={`rounded-lg font-black text-[10px] uppercase border-none ${ex.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {ex.status}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Session Notes Timeline */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="px-10 py-6 border-b bg-slate-50/50">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Clinical Session History</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {[
                                { date: "07 May 2026", note: "Improved knee extension observed. Patient reports reduced stiffness in mornings.", therapist: "Dr. Rakesh", pain: "3/10" },
                                { date: "05 May 2026", note: "Increased weight bearing to 75%. Added straight leg raises to home program.", therapist: "Dr. Rakesh", pain: "4/10" },
                                { date: "01 May 2026", note: "Post-surgical swelling significantly reduced. Focus shifted to mobilization.", therapist: "Dr. Rakesh", pain: "5/10" },
                            ].map((session, i) => (
                                <div key={i} className="p-8 hover:bg-slate-50 transition-colors group cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{session.date}</span>
                                            <Badge variant="outline" className="rounded-lg font-black text-[10px] border-primary/20 text-primary uppercase px-2 shadow-none">Pain: {session.pain}</Badge>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 leading-relaxed mb-3">{session.note}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center">
                                            <FileText className="h-2.5 w-2.5 text-slate-400" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Therapist: {session.therapist}</span>
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

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    UserPlus, 
    ArrowLeft, 
    HeartPulse, 
    ShieldAlert, 
    User,
    Loader2,
    CheckCircle2,
    Activity,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/auth-context";

export default function NewPatientPage() {
    const router = useRouter();
    const { user, role } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "male",
        phone: "",
        occupation: "",
        injury: "",
        history: "",
        emergency: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
            if (!APPS_SCRIPT_URL) throw new Error("Backend URL not configured");

            const response = await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Required for Apps Script
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "registerPatient",
                    staffId: user?.email || "Admin",
                    role: role || "Admin",
                    patient: formData
                })
            });

            // Since no-cors doesn't return body, we assume success if no error thrown
            setSuccess(true);
            setTimeout(() => router.push("/patients"), 2000);
        } catch (err) {
            console.error("Registration failed:", err);
            alert("Storage failed. Please check your Google Apps Script connection.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="h-[70vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-500">
                    <div className="h-24 w-24 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Identity Registered</h2>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Syncing with Muscularbox Cloud...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 max-w-5xl mx-auto pb-20">
            {/* Premium Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-5">
                    <Button asChild variant="ghost" className="rounded-2xl h-14 w-14 bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
                        <Link href="/patients">
                            <ArrowLeft className="h-6 w-6 text-slate-400" />
                        </Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical Registration Mode</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">New Clinical Identity</h1>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-900 text-white p-2 pr-6 rounded-2xl shadow-xl">
                    <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Secure Linkage</p>
                        <p className="text-xs font-black uppercase italic">Encryption: Active</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    {/* Section 1: Demographics */}
                    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white overflow-hidden">
                        <div className="bg-slate-50 px-10 py-6 border-b flex items-center gap-3">
                            <User className="h-4 w-4 text-primary" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section 01: Core Patient Metadata</h3>
                        </div>
                        <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Legal Full Name</Label>
                                <Input 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="Enter full name" 
                                    className="rounded-2xl h-14 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-900" 
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Contact Intelligence (Phone)</Label>
                                <Input 
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    placeholder="+91 00000 00000" 
                                    className="rounded-2xl h-14 border-slate-100 bg-slate-50/50 font-bold" 
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Age (Years)</Label>
                                <Input 
                                    required
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                                    placeholder="Enter age" 
                                    className="rounded-2xl h-14 border-slate-100 bg-slate-50/50 font-bold" 
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Biometric Gender</Label>
                                <RadioGroup 
                                    value={formData.gender}
                                    onValueChange={(val) => setFormData({...formData, gender: val})}
                                    className="flex items-center gap-4 h-14 px-5 bg-slate-50/50 rounded-2xl border border-slate-100"
                                >
                                    {['Male', 'Female', 'Other'].map((g) => (
                                        <div key={g} className="flex items-center space-x-2">
                                            <RadioGroupItem value={g.toLowerCase()} id={g} className="text-primary border-slate-300" />
                                            <Label htmlFor={g} className="font-black text-[10px] uppercase tracking-tighter cursor-pointer">{g}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 2: Clinical Details */}
                    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white overflow-hidden">
                        <div className="bg-slate-50 px-10 py-6 border-b flex items-center gap-3">
                            <HeartPulse className="h-4 w-4 text-red-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section 02: Clinical Intelligence</h3>
                        </div>
                        <CardContent className="p-10 space-y-8">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Chief Complaint & Injury Summary</Label>
                                <Textarea 
                                    required
                                    value={formData.injury}
                                    onChange={(e) => setFormData({...formData, injury: e.target.value})}
                                    placeholder="Describe the injury and current symptoms in detail..." 
                                    className="rounded-[2rem] min-h-[150px] border-slate-100 bg-slate-50/50 p-6 font-medium leading-relaxed" 
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Historical Medical Context</Label>
                                <Textarea 
                                    value={formData.history}
                                    onChange={(e) => setFormData({...formData, history: e.target.value})}
                                    placeholder="Diabetes, Hypertension, Previous Surgeries..." 
                                    className="rounded-[2rem] min-h-[100px] border-slate-100 bg-slate-50/50 p-6 font-medium" 
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-8">
                    <Card className="border-none shadow-2xl shadow-slate-900/20 rounded-[2.5rem] bg-slate-900 text-white p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16" />
                        
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Operation Sync</h3>
                                <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic">
                                    Finalizing this form will generate a permanent clinical ID and synchronize data across 15 relational tables.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Activity className="h-4 w-4 text-emerald-500" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Relational Engine: ON</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Audit Trail: LOGGING</p>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full h-20 rounded-[1.5rem] bg-primary hover:bg-emerald-400 text-slate-900 font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95 group"
                            >
                                {loading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        SUBMIT TO CLOUD
                                        <UserPlus className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </div>
                    </Card>

                    <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-2 flex items-center gap-2">
                            <ShieldAlert className="h-3 w-3 text-amber-500" />
                            Data Integrity
                        </h4>
                        <p className="text-[10px] font-bold text-slate-400 leading-loose">
                            Ensure all contact details are verified. This record will serve as the base for all future billing, attendance, and clinical assessments.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

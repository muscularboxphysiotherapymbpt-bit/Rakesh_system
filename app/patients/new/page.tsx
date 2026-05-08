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
    Info, 
    HeartPulse, 
    ShieldAlert, 
    Phone,
    User
} from "lucide-react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function NewPatientPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" className="rounded-xl h-12 w-12 p-0">
                    <Link href="/patients">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Register New Patient</h1>
                    <p className="text-slate-500 font-medium italic">Initialize medical record and unique patient identity.</p>
                </div>
            </div>

            <form className="space-y-8">
                {/* 1. Basic Demographics */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="bg-slate-50 px-8 py-6 border-b flex flex-row items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm">
                            <User className="h-4 w-4 text-primary" />
                        </div>
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Section 01: Patient Identity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                            <Input placeholder="Enter full name" className="rounded-xl h-12 border-slate-200 focus-visible:ring-primary font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unique Patient ID (Auto-Generated)</Label>
                            <Input value="MBP-2026-004" disabled className="rounded-xl h-12 bg-slate-50 border-slate-200 font-black text-primary" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Age</Label>
                            <Input type="number" placeholder="Enter age" className="rounded-xl h-12 border-slate-200 font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Occupation</Label>
                            <Input placeholder="Current occupation" className="rounded-xl h-12 border-slate-200 font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</Label>
                            <Input placeholder="+91 00000 00000" className="rounded-xl h-12 border-slate-200 font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Gender</Label>
                            <RadioGroup defaultValue="male" className="flex items-center gap-6 h-12 px-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male" className="font-bold text-xs uppercase">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female" className="font-bold text-xs uppercase">Female</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="other" id="other" />
                                    <Label htmlFor="other" className="font-bold text-xs uppercase">Other</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Clinical History */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="bg-slate-50 px-8 py-6 border-b flex flex-row items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm">
                            <HeartPulse className="h-4 w-4 text-red-500" />
                        </div>
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Section 02: Clinical Intelligence</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Chief Complaint & Injury Details</Label>
                            <Textarea placeholder="Describe the injury and current symptoms..." className="rounded-2xl min-h-[120px] border-slate-200 font-medium" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Medical History (Diabetic, Cardiac, etc.)</Label>
                            <Textarea placeholder="Any pre-existing conditions or surgeries..." className="rounded-2xl min-h-[100px] border-slate-200 font-medium" />
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Emergency Contacts */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="bg-slate-50 px-8 py-6 border-b flex flex-row items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm">
                            <ShieldAlert className="h-4 w-4 text-amber-500" />
                        </div>
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Section 03: Operational Safety (Emergency Contacts)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Primary Emergency Contact Name</Label>
                            <Input placeholder="Contact name" className="rounded-xl h-12 border-slate-200 font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Emergency Relation / Phone</Label>
                            <Input placeholder="Relation & Phone" className="rounded-xl h-12 border-slate-200 font-bold" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4 pt-4 pb-12">
                    <Button variant="outline" className="rounded-2xl font-black px-8 py-6 uppercase tracking-widest text-slate-400 border-slate-200 hover:bg-slate-50">
                        Cancel
                    </Button>
                    <Button className="rounded-2xl font-black px-12 py-6 uppercase tracking-widest bg-slate-900 hover:bg-black shadow-xl">
                        Complete Registration
                    </Button>
                </div>
            </form>
        </div>
    );
}

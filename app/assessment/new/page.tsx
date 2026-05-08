"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    Camera, 
    Video, 
    Upload, 
    FileText, 
    Activity, 
    ChevronRight,
    Loader2,
    CheckCircle2
} from "lucide-react";

export default function NewAssessmentPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'img' | 'vid') => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files);
            if (type === 'img') setImages(prev => [...prev, ...fileList].slice(0, 4));
            else setVideos(prev => [...prev, ...fileList].slice(0, 4));
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Advanced Patient Assessment</h1>
                <p className="text-slate-500 font-medium italic">Clinical diagnosis and multi-media documentation (8 Slots).</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Clinical Notes Section */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50 p-6 border-b">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Section 01: Clinical Diagnosis</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Diagnosis Detail</Label>
                                <Textarea placeholder="Enter detailed clinical findings..." className="rounded-2xl min-h-[150px] border-slate-200 font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Proposed Treatment Plan</Label>
                                <Textarea placeholder="Outline the recovery roadmap..." className="rounded-2xl min-h-[100px] border-slate-200 font-medium" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Media Upload Section */}
                    <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50 p-6 border-b flex flex-row justify-between items-center">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Section 02: Multi-Media Evidence</CardTitle>
                            <Badge className="bg-primary/10 text-primary border-none rounded-lg font-black text-[10px] px-3 py-1 uppercase tracking-widest">
                                {images.length + videos.length}/8 Slots Used
                            </Badge>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            {/* 4 Images */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Camera className="h-4 w-4 text-primary" />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Clinical Photos (Max 4)</h4>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className="aspect-square rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer">
                                            {images[i] ? (
                                                <img src={URL.createObjectURL(images[i])} className="w-full h-full object-cover" />
                                            ) : (
                                                <>
                                                    <Upload className="h-5 w-5 text-slate-300" />
                                                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'img')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 4 Videos */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Video className="h-4 w-4 text-primary" />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Motion Videos (Max 4)</h4>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className="aspect-square rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer">
                                            {videos[i] ? (
                                                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                                    <Video className="h-6 w-6 text-white" />
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="h-5 w-5 text-slate-300" />
                                                    <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'vid')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Submission Sidebar */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm rounded-3xl bg-slate-900 text-white p-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Database Intelligence</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-xl bg-slate-800 flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                </div>
                                <p className="text-xs font-bold">Drive Sync Enabled</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-xl bg-slate-800 flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                </div>
                                <p className="text-xs font-bold">Relational Mapping ON</p>
                            </div>
                        </div>
                        <Button className="w-full mt-8 rounded-2xl h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 flex gap-2">
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Finalize & Save"}
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </Card>

                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 italic text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
                        Note: Assessment data is non-editable after submission to maintain clinical accuracy and audit trail standards.
                    </div>
                </div>
            </div>
        </div>
    );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${className}`}>
            {children}
        </span>
    );
}

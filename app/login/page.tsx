"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Failed to login. Please check credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full -ml-48 -mb-48"></div>

            <div className="w-full max-w-[450px] relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-slate-900 shadow-2xl mb-6 transform rotate-3">
                        <ShieldCheck className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Secure Portal</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Muscularbox Physiotherapy ERP</p>
                </div>

                <Card className="border-none shadow-2xl rounded-[32px] bg-white overflow-hidden">
                    <CardContent className="p-10">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input 
                                        type="email" 
                                        placeholder="admin@muscularbox.com" 
                                        className="rounded-2xl h-14 pl-12 border-slate-100 bg-slate-50/50 focus-visible:ring-primary font-bold"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="rounded-2xl h-14 pl-12 border-slate-100 bg-slate-50/50 focus-visible:ring-primary font-bold"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest p-3 rounded-xl border border-red-100">
                                    {error}
                                </div>
                            )}

                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full rounded-2xl h-16 bg-slate-900 hover:bg-black font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 gap-2"
                            >
                                {loading ? "Authenticating..." : "Enter Command Center"}
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center mt-8 text-slate-400 font-bold text-[10px] uppercase tracking-tighter">
                    Authorized Personnel Only • Cloud-Based Intelligence v1.0
                </p>
            </div>
        </div>
    );
}

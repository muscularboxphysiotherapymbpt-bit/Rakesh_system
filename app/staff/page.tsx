"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    UserPlus, 
    ShieldCheck, 
    Mail, 
    User, 
    Lock,
    Loader2,
    CheckCircle2,
    Users,
    Activity,
    ShieldAlert
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useERPData } from "@/hooks/use-erp-data";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function StaffManagementPage() {
    const { user, role } = useAuth();
    const { data: staffList, loading: dataLoading, refresh } = useERPData("getStaff");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "Staff",
        specialization: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
            if (!APPS_SCRIPT_URL) throw new Error("Backend URL not configured");

            await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "registerStaff",
                    adminId: user?.email,
                    role: "Admin",
                    staffData: formData
                })
            });

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setFormData({ name: "", email: "", role: "Staff", specialization: "" });
                refresh();
            }, 2000);
        } catch (err) {
            console.error("Staff registration failed:", err);
            alert("Failed to register staff. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    if (role !== "Admin") {
        return (
            <div className="h-[70vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <ShieldAlert className="h-16 w-16 text-red-500 mx-auto" />
                    <h1 className="text-2xl font-black uppercase tracking-tighter">Access Restricted</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Admin Authorization Required</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12 max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Personnel Intelligence</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">Staff Management</h1>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2 italic">Deploy and manage clinical roles & permissions.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Registration Form */}
                <div className="space-y-8">
                    <Card className="border-none shadow-2xl shadow-slate-900/10 rounded-[2.5rem] bg-white overflow-hidden">
                        <div className="bg-slate-900 text-white p-8">
                            <div className="flex items-center gap-3 mb-2">
                                <UserPlus className="h-5 w-5 text-primary" />
                                <h3 className="text-xs font-black uppercase tracking-widest">Register New Staff</h3>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">Assign roles to synchronize access levels across the platform.</p>
                        </div>
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-4 h-4 w-4 text-slate-300" />
                                        <Input 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            placeholder="Staff name" 
                                            className="rounded-xl h-12 pl-12 border-slate-100 bg-slate-50/50 font-bold" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-4 h-4 w-4 text-slate-300" />
                                        <Input 
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            placeholder="email@muscularbox.com" 
                                            className="rounded-xl h-12 pl-12 border-slate-100 bg-slate-50/50 font-bold" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assigned Role</Label>
                                    <RadioGroup 
                                        value={formData.role}
                                        onValueChange={(val) => setFormData({...formData, role: val})}
                                        className="grid grid-cols-2 gap-3"
                                    >
                                        {['Therapist', 'Accountant', 'Staff', 'Admin'].map((r) => (
                                            <div key={r} className="flex items-center space-x-2 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                                                <RadioGroupItem value={r} id={r} className="text-slate-900 border-slate-300" />
                                                <Label htmlFor={r} className="font-black text-[9px] uppercase tracking-tighter cursor-pointer">{r}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <Button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-slate-900/20 active:scale-95 transition-all"
                                >
                                    {loading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : success ? (
                                        <div className="flex items-center gap-2">
                                            STAFF DEPLOYED
                                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                        </div>
                                    ) : (
                                        "DEPLOY STAFF ACCESS"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="h-4 w-4 text-primary" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Security Protocol</h4>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 leading-loose uppercase tracking-wider">
                            Newly added staff will be able to log in using their email via Firebase. The system will automatically detect their role from the cloud database and adjust their permissions.
                        </p>
                    </div>
                </div>

                {/* Staff List */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-xl shadow-slate-100 rounded-[2.5rem] bg-white overflow-hidden">
                        <div className="px-10 py-8 border-b bg-slate-50/50 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest">Active Personnel</h3>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current Team Distribution</p>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-0">
                            {dataLoading ? (
                                <div className="p-20 flex justify-center">
                                    <Loader2 className="h-8 w-8 animate-spin text-slate-200" />
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b bg-slate-50/30">
                                                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Staff Member</th>
                                                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Access Role</th>
                                                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Status</th>
                                                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 text-right">Activity</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {staffList?.map((staff: any, i: number) => (
                                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-10 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-xs text-slate-400">
                                                                {staff.Name?.[0]}
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-slate-900 leading-none mb-1 uppercase tracking-tighter">{staff.Name}</p>
                                                                <p className="text-[10px] font-bold text-slate-400">{staff.Email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <Badge className={cn(
                                                            "rounded-lg px-3 py-1 font-black text-[9px] uppercase tracking-widest border-none",
                                                            staff.Role === "Admin" ? "bg-slate-900 text-primary" : "bg-slate-100 text-slate-600"
                                                        )}>
                                                            {staff.Role}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-6 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <div className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors">
                                                                <Activity className="h-4 w-4" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

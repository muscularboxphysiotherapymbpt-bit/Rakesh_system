"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export type Role = "Admin" | "Staff" | "Therapist" | "Accountant" | null;

interface AuthContextType {
    user: User | null;
    role: Role;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<Role>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                // In a production app, we would fetch the role from our Staff table via API
                // or use Firebase Custom Claims. For now, we'll use a mock fetch.
                try {
                    const response = await fetch(`/api/staff/role?email=${user.email}`);
                    const data = await response.json();
                    setRole(data.role || "Staff"); // Default to Staff if not found
                } catch (e) {
                    setRole("Staff");
                }
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

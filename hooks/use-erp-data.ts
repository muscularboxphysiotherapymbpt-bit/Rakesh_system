"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

export function useERPData(action: string, params: Record<string, string> = {}) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { role } = useAuth();

    useEffect(() => {
        if (!APPS_SCRIPT_URL) {
            setError("Google Apps Script URL not configured.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    action,
                    role: role || "Staff",
                    ...params
                });
                
                const response = await fetch(`${APPS_SCRIPT_URL}?${queryParams}`);
                const result = await response.json();
                
                if (result.error) {
                    throw new Error(result.error);
                }
                
                setData(result);
            } catch (err: any) {
                setError(err.message || "Failed to fetch ERP data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [action, role, JSON.stringify(params)]);

    return { data, loading, error };
}

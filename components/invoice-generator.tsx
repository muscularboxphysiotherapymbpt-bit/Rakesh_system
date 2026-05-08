"use client";

import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer } from "lucide-react";

interface InvoiceData {
    invoiceId: string;
    patientName: string;
    patientId: string;
    date: string;
    items: Array<{ description: string; amount: number }>;
    total: number;
    amountPaid: number;
    balance: number;
}

export function InvoiceGenerator({ data }: { data: InvoiceData }) {
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Header
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, 210, 40, "F");
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text("MUSCULARBOX PHYSIOTHERAPY", 20, 25);
        
        doc.setFontSize(10);
        doc.text("Advanced Clinical ERP • Receipt", 150, 25);

        // Body
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(12);
        doc.text(`Invoice ID: ${data.invoiceId}`, 20, 60);
        doc.text(`Date: ${data.date}`, 150, 60);
        
        doc.setDrawColor(226, 232, 240);
        doc.line(20, 65, 190, 65);

        // Patient Details
        doc.setFont("helvetica", "bold");
        doc.text("BILLED TO:", 20, 80);
        doc.setFont("helvetica", "normal");
        doc.text(data.patientName, 20, 88);
        doc.text(`Patient ID: ${data.patientId}`, 20, 94);

        // Table Header
        doc.setFillColor(248, 250, 252);
        doc.rect(20, 110, 170, 10, "F");
        doc.setFont("helvetica", "bold");
        doc.text("DESCRIPTION", 25, 117);
        doc.text("AMOUNT", 160, 117);

        // Items
        let y = 130;
        data.items.forEach(item => {
            doc.setFont("helvetica", "normal");
            doc.text(item.description, 25, y);
            doc.text(`INR ${item.amount.toLocaleString()}`, 160, y);
            y += 10;
        });

        // Totals
        doc.line(20, y + 5, 190, y + 5);
        y += 20;
        
        doc.setFont("helvetica", "bold");
        doc.text("TOTAL AMOUNT:", 110, y);
        doc.text(`INR ${data.total.toLocaleString()}`, 160, y);
        
        y += 10;
        doc.text("AMOUNT PAID:", 110, y);
        doc.setTextColor(34, 197, 94);
        doc.text(`INR ${data.amountPaid.toLocaleString()}`, 160, y);
        
        y += 10;
        doc.setTextColor(239, 68, 68);
        doc.text("BALANCE DUE:", 110, y);
        doc.text(`INR ${data.balance.toLocaleString()}`, 160, y);

        // Footer
        doc.setTextColor(148, 163, 184);
        doc.setFontSize(8);
        doc.text("Computer generated invoice. No signature required.", 105, 280, { align: "center" });
        doc.text("Muscularbox Physiotherapy • 2026 ERP", 105, 285, { align: "center" });

        doc.save(`Invoice_${data.invoiceId}.pdf`);
    };

    return (
        <div className="flex gap-2">
            <Button onClick={generatePDF} className="rounded-xl font-black gap-2 bg-slate-900 hover:bg-black text-white">
                <Download className="h-4 w-4" />
                DOWNLOAD PDF
            </Button>
            <Button variant="outline" className="rounded-xl font-black gap-2 border-slate-200">
                <Printer className="h-4 w-4" />
                PRINT
            </Button>
        </div>
    );
}

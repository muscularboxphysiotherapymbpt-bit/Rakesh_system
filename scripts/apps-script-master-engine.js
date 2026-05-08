/**
 * MUSCULARBOX ERP MASTER ENGINE v1.0
 * 
 * Features:
 * - Automated 15-Table Relational Schema
 * - Real-time Financial Intelligence & Package Consumption
 * - Google Drive File Storage Integration (MRI/X-rays/Videos)
 * - Role-Based API Access Control
 * - Staff Activity Logging & Audit Trail
 */

const CONFIG = {
    PROJECT_NAME: "Muscularbox ERP",
    VERSION: "1.0",
    DRIVE_FOLDER_NAME: "Muscularbox_Clinical_Records"
};

// --- DATABASE INITIALIZATION ---

function initializeDatabase() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = {
        "patients": ["Patient ID", "Name", "Age", "Gender", "Phone", "Occupation", "Injury Details", "Medical History", "Emergency Contact", "Created At", "Status"],
        "appointments": ["Appointment ID", "Patient ID", "Therapist ID", "Date", "Time", "Status", "Notes"],
        "attendance": ["Record ID", "Patient ID", "Staff ID", "Date", "Session Type", "Package ID", "Status"],
        "packages": ["Package ID", "Name", "Price", "Total Sessions", "Bonus Sessions", "Validity (Days)", "Status"],
        "patient_packages": ["ID", "Patient ID", "Package ID", "Purchased Date", "Total Allowed", "Used Sessions", "Remaining", "Expiry Date", "Payment Status"],
        "payments": ["Payment ID", "Patient ID", "Amount Paid", "Date", "Method", "Package ID", "Staff ID", "Status"],
        "billing": ["Invoice ID", "Patient ID", "Total Amount", "Amount Paid", "Balance Due", "Last Updated", "Status"],
        "treatments": ["Note ID", "Patient ID", "Therapist ID", "Date", "Daily Notes", "Pain Scale (VAS)", "Recovery %", "Exercise Plan"],
        "staff": ["Staff ID", "Name", "Email", "Role", "Specialization", "Joined Date", "Status"],
        "staff_activity_logs": ["Log ID", "Staff ID", "Action", "Target ID", "Timestamp", "Role", "Status"],
        "inventory": ["Item ID", "Name", "Category", "Stock", "Unit", "Maintenance Due", "Status"],
        "financial_logs": ["Log ID", "Type", "Amount", "Source", "Date", "Staff ID"],
        "reports": ["Report ID", "Patient ID", "File Name", "Drive URL", "Type", "Uploaded At"],
        "settings": ["Key", "Value", "Description", "Last Updated"],
        "ai_intelligence": ["ID", "Patient ID", "Prediction Type", "Confidence Score", "Result", "Date"]
    };

    for (let name in sheets) {
        let sheet = ss.getSheetByName(name);
        if (!sheet) {
            sheet = ss.insertSheet(name);
        }
        sheet.clear();
        sheet.getRange(1, 1, 1, sheets[name].length).setValues([sheets[name]])
             .setFontWeight("bold")
             .setBackground("#1e293b")
             .setFontColor("#ffffff");
        sheet.setFrozenRows(1);
    }
    
    // Create Root Drive Folder
    createClinicalFolder();
    
    Logger.log("Muscularbox Database Successfully Initialized!");
    return "SUCCESS: Database Initialized with 15 Tables.";
}

// --- FILE STORAGE ENGINE (DRIVE) ---

function createClinicalFolder() {
    const folders = DriveApp.getFoldersByName(CONFIG.DRIVE_FOLDER_NAME);
    if (!folders.hasNext()) {
        const folder = DriveApp.createFolder(CONFIG.DRIVE_FOLDER_NAME);
        Logger.log("Folder Created: " + folder.getName());
        return folder.getId();
    }
    return folders.next().getId();
}

function uploadFileToDrive(base64Data, fileName, patientId, type) {
    try {
        const folderId = createClinicalFolder();
        const folder = DriveApp.getFolderById(folderId);
        
        // Decode base64
        const data = Utilities.base64Decode(base64Data.split(",")[1]);
        const blob = Utilities.newBlob(data, "application/octet-stream", fileName);
        
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        
        const fileUrl = file.getUrl();
        
        // Record in reports sheet
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const reportSheet = ss.getSheetByName("reports");
        const reportId = "REP-" + new Date().getTime();
        reportSheet.appendRow([reportId, patientId, fileName, fileUrl, type, new Date()]);
        
        return { success: true, url: fileUrl, id: reportId };
    } catch (e) {
        return { success: false, error: e.toString() };
    }
}

// --- API ROUTER (GET/POST) ---

function doGet(e) {
    const action = e.parameter.action;
    const role = e.parameter.role || "Staff";
    
    try {
        switch (action) {
            case "getDashboardStats":
                return jsonResponse(getDashboardStats(role));
            case "getPatients":
                return jsonResponse(getData("patients"));
            case "getFinancials":
                if (role !== "Admin" && role !== "Accountant") throw new Error("Unauthorized Access to Financials");
                return jsonResponse(getFinancialStats());
            case "getStaffLogs":
                return jsonResponse(getData("staff_activity_logs"));
            default:
                return jsonResponse({ error: "Invalid Action" });
        }
    } catch (err) {
        return jsonResponse({ error: err.toString() });
    }
}

function doPost(e) {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const staffId = data.staffId;
    
    try {
        let result;
        switch (action) {
            case "registerPatient":
                result = registerPatient(data.patient);
                break;
            case "saveAssessment":
                result = saveAssessmentWithMedia(data.assessment);
                break;
            case "markAttendance":
                result = markAttendance(data.attendance);
                break;
            case "uploadReport":
                result = uploadFileToDrive(data.file, data.fileName, data.patientId, data.type);
                break;
            default:
                throw new Error("Action not recognized");
        }
        
        logActivity(staffId, action, result.id || "N/A", data.role);
        return jsonResponse({ success: true, result: result });
    } catch (err) {
        return jsonResponse({ success: false, error: err.toString() });
    }
}

// --- ADVANCED ASSESSMENT MEDIA LOGIC ---

function saveAssessmentWithMedia(a) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("assessments");
    if (!sheet) {
        sheet = ss.insertSheet("assessments");
        sheet.appendRow(["Assessment ID", "Patient ID", "Staff ID", "Date", "Diagnosis", "Plan", "Img 1", "Img 2", "Img 3", "Img 4", "Vid 1", "Vid 2", "Vid 3", "Vid 4"]);
    }
    
    const id = "ASS-" + new Date().getTime();
    const folderId = createClinicalFolder();
    const folder = DriveApp.getFolderById(folderId);
    
    const mediaUrls = [];
    
    // Process Media (Images 0-3, Videos 4-7)
    if (a.media && a.media.length > 0) {
        a.media.forEach((m, index) => {
            if (m.data) {
                const blob = Utilities.newBlob(Utilities.base64Decode(m.data.split(",")[1]), m.mimeType, m.name);
                const file = folder.createFile(blob);
                file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
                mediaUrls.push(file.getUrl());
            } else {
                mediaUrls.push("");
            }
        });
    }
    
    // Pad array to ensure it has 8 items
    while (mediaUrls.length < 8) mediaUrls.push("");
    
    sheet.appendRow([
        id, a.patientId, a.staffId, new Date(), a.diagnosis, a.plan,
        mediaUrls[0], mediaUrls[1], mediaUrls[2], mediaUrls[3], // Images
        mediaUrls[4], mediaUrls[5], mediaUrls[6], mediaUrls[7]  // Videos
    ]);
    
    return { id: id, urls: mediaUrls };
}

// --- LOGICAL FUNCTIONS ---

function getDashboardStats(role) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const patients = ss.getSheetByName("patients").getLastRow() - 1;
    const appointments = ss.getSheetByName("appointments").getLastRow() - 1;
    
    let stats = {
        totalPatients: patients,
        todayAppointments: appointments,
        activePackages: ss.getSheetByName("patient_packages").getLastRow() - 1
    };
    
    // Add financial stats only for Admins
    if (role === "Admin") {
        const payments = ss.getSheetByName("payments").getDataRange().getValues();
        let totalRev = 0;
        for (let i = 1; i < payments.length; i++) {
            totalRev += parseFloat(payments[i][2] || 0);
        }
        stats.revenue = totalRev;
    }
    
    return stats;
}

function registerPatient(p) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("patients");
    const id = "MBP-" + new Date().getFullYear() + "-" + (sheet.getLastRow());
    sheet.appendRow([id, p.name, p.age, p.gender, p.phone, p.occupation, p.injury, p.history, p.emergency, new Date(), "Active"]);
    return { id: id };
}

function markAttendance(a) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("attendance");
    const id = "ATT-" + new Date().getTime();
    
    // Append to attendance
    sheet.appendRow([id, a.patientId, a.staffId, new Date(), a.type, a.packageId, "Present"]);
    
    // Auto-consume package session
    if (a.packageId) {
        consumePackageSession(a.patientId, a.packageId);
    }
    
    return { id: id };
}

function consumePackageSession(patientId, packageId) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("patient_packages");
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
        if (data[i][1] === patientId && data[i][2] === packageId) {
            let used = parseInt(data[i][5]) + 1;
            let remaining = parseInt(data[i][4]) - used;
            sheet.getRange(i + 1, 6).setValue(used);
            sheet.getRange(i + 1, 7).setValue(remaining);
            break;
        }
    }
}

function logActivity(staffId, action, targetId, role) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("staff_activity_logs");
    const id = "LOG-" + new Date().getTime();
    sheet.appendRow([id, staffId, action, targetId, new Date(), role, "Success"]);
}

// --- UTILS ---

function getData(sheetName) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = [];
    for (let i = 1; i < data.length; i++) {
        let obj = {};
        headers.forEach((h, j) => obj[h] = data[i][j]);
        rows.push(obj);
    }
    return rows;
}

function jsonResponse(obj) {
    return ContentService.createTextOutput(JSON.stringify(obj))
        .setMimeType(ContentService.MimeType.JSON);
}

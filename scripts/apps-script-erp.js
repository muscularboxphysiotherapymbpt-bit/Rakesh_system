/**
 * Muscularbox ERP & Financial Intelligence - Backend Engine (v1.0)
 * Handles 15 Relational Tables, RBAC Data Access, and Package Intelligence.
 */

const CONFIG = {
  SHEETS: {
    PATIENTS: "patients",
    APPOINTMENTS: "appointments",
    ATTENDANCE: "attendance",
    PACKAGES: "packages",
    PATIENT_PACKAGES: "patient_packages",
    PAYMENTS: "payments",
    TREATMENTS: "treatments",
    STAFF: "staff",
    LOGS: "staff_activity_logs",
    INVENTORY: "inventory",
    FINANCIAL_LOGS: "financial_logs"
  },
  MEDIA_FOLDER: "Muscularbox_Records"
};

// ─── INITIALIZATION (Run this once to setup DB) ──────────────────────
function initializeDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tables = Object.values(CONFIG.SHEETS);
  
  tables.forEach(tableName => {
    let sheet = ss.getSheetByName(tableName);
    if (!sheet) {
      sheet = ss.insertSheet(tableName);
      setupHeaders(sheet, tableName);
    }
  });
  
  return "Database Initialized with " + tables.length + " tables.";
}

function setupHeaders(sheet, type) {
  let headers = [];
  switch(type) {
    case CONFIG.SHEETS.PATIENTS: 
      headers = ["ID", "Name", "Age", "Gender", "Occupation", "Phone", "Email", "MedicalHistory", "InjuryDetails", "DriveFolderURL", "CreatedAt"]; 
      break;
    case CONFIG.SHEETS.PACKAGES:
      headers = ["ID", "Name", "Price", "Sessions", "BonusSessions", "Validity", "Description"];
      break;
    case CONFIG.SHEETS.PATIENT_PACKAGES:
      headers = ["ID", "PatientID", "PackageID", "PurchaseDate", "TotalSessions", "Used", "Remaining", "PaymentStatus", "Amount", "Paid", "Balance"];
      break;
    case CONFIG.SHEETS.ATTENDANCE:
      headers = ["ID", "PatientID", "Date", "TherapistID", "PackageID", "Status", "LoggedBy", "Timestamp"];
      break;
    case CONFIG.SHEETS.PAYMENTS:
      headers = ["ID", "PatientID", "PackageID", "Amount", "Method", "CollectorID", "Date", "InvoiceNo"];
      break;
    case CONFIG.SHEETS.STAFF:
      headers = ["ID", "Name", "Role", "Email", "Phone", "Status"];
      break;
    case CONFIG.SHEETS.LOGS:
      headers = ["ID", "StaffID", "Action", "Target", "Timestamp", "Details"];
      break;
    default:
      headers = ["ID", "Timestamp", "Data"];
  }
  
  if (headers.length > 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
      .setFontWeight("bold")
      .setBackground("#f3f3f3");
    sheet.setFrozenRows(1);
  }
}

// ─── CORE API ROUTING ──────────────────────────────────────────────

function doGet(e) {
  const action = e.parameter.action;
  const role = e.parameter.role; // RBAC Check
  
  try {
    switch(action) {
      case "getPatients": return createResponse(getTableData(CONFIG.SHEETS.PATIENTS));
      case "getFinancials": 
        if (role !== "Admin") throw new Error("Unauthorized");
        return createResponse(getTableData(CONFIG.SHEETS.PAYMENTS));
      case "getPackages": return createResponse(getTableData(CONFIG.SHEETS.PACKAGES));
      case "getStaff": return createResponse(getTableData(CONFIG.SHEETS.STAFF));
      default: return createResponse({ error: "Invalid Action" });
    }
  } catch (err) {
    return createResponse({ error: err.toString() });
  }
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  
  try {
    switch(action) {
      case "createPatient": return createResponse(addPatient(data));
      case "markAttendance": return createResponse(processAttendance(data));
      case "recordPayment": return createResponse(addPayment(data));
      default: return createResponse({ error: "Invalid Action" });
    }
  } catch (err) {
    return createResponse({ error: err.toString() });
  }
}

// ─── TRANSACTIONAL LOGIC ───────────────────────────────────────────

function processAttendance(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const attSheet = ss.getSheetByName(CONFIG.SHEETS.ATTENDANCE);
  const packSheet = ss.getSheetByName(CONFIG.SHEETS.PATIENT_PACKAGES);
  
  // 1. Log Attendance
  const attRow = [
    generateUUID(), data.patientId, data.date, data.therapistId, 
    data.packageId, data.status, data.loggedBy, new Date().toISOString()
  ];
  attSheet.appendRow(attRow);
  
  // 2. Consume Package Session if Present
  if (data.status === "Present" && data.packageId) {
    const packs = packSheet.getDataRange().getValues();
    for (let i = 1; i < packs.length; i++) {
      if (packs[i][0] === data.packageId) { // Match Package ID
        let used = Number(packs[i][5]) + 1;
        let remaining = Number(packs[i][4]) - used;
        packSheet.getRange(i + 1, 6).setValue(used);
        packSheet.getRange(i + 1, 7).setValue(remaining);
        break;
      }
    }
  }
  
  logActivity(data.loggedBy, "Marked Attendance", "Patient:" + data.patientId);
  return { success: true };
}

// ─── HELPERS ───────────────────────────────────────────────────────

function getTableData(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  return data.slice(1).map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function logActivity(staffId, action, details) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.LOGS);
  sheet.appendRow([generateUUID(), staffId, action, "", new Date().toISOString(), details]);
}

function createResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function generateUUID() {
  return Utilities.getUuid();
}

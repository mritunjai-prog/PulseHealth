// Demo data for the platform
export const hospitals = [
  { id: "h1", name: "Apollo Demo", city: "Mumbai", state: "MH", staff: 142, patients: 8420, specialties: 18, active: true },
  { id: "h2", name: "Fortis Demo", city: "Delhi", state: "DL", staff: 96, patients: 5210, specialties: 14, active: true },
  { id: "h3", name: "Max Demo", city: "Bangalore", state: "KA", staff: 78, patients: 3940, specialties: 12, active: true },
];

export const platformKpis = {
  hospitals: 3,
  patients: 17570,
  staff: 316,
  appointmentsToday: 482,
  revenueToday: 2840000,
};

export const monthlyRegistrations = [
  { month: "Jan", patients: 820 }, { month: "Feb", patients: 920 },
  { month: "Mar", patients: 1100 }, { month: "Apr", patients: 1240 },
  { month: "May", patients: 1340 }, { month: "Jun", patients: 1480 },
  { month: "Jul", patients: 1620 }, { month: "Aug", patients: 1720 },
  { month: "Sep", patients: 1810 }, { month: "Oct", patients: 1940 },
  { month: "Nov", patients: 2080 }, { month: "Dec", patients: 2240 },
];

export const appointmentsPerHospital = [
  { name: "Apollo", appointments: 248 },
  { name: "Fortis", appointments: 156 },
  { name: "Max", appointments: 78 },
];

export const staffDistribution = [
  { name: "Doctors", value: 64 },
  { name: "Nurses", value: 112 },
  { name: "Technicians", value: 48 },
  { name: "Admin", value: 56 },
  { name: "Support", value: 36 },
];

export const revenueByDept = [
  { dept: "Cardiology", revenue: 480000 },
  { dept: "Orthopedics", revenue: 320000 },
  { dept: "Pediatrics", revenue: 180000 },
  { dept: "Neurology", revenue: 410000 },
  { dept: "Oncology", revenue: 520000 },
  { dept: "General", revenue: 240000 },
];

// Doctor demo data
export const todaysAppointments = [
  { id: "a1", patient: "Ananya Reddy", age: 32, time: "09:00", reason: "Follow-up: Hypertension", status: "completed", avatar: "AR" },
  { id: "a2", patient: "Rajesh Kumar", age: 58, time: "09:30", reason: "Chest pain evaluation", status: "completed", avatar: "RK" },
  { id: "a3", patient: "Sneha Pillai", age: 45, time: "10:00", reason: "Diabetes review", status: "in-progress", avatar: "SP" },
  { id: "a4", patient: "Mohammed Ali", age: 67, time: "10:30", reason: "Post-op review", status: "scheduled", avatar: "MA" },
  { id: "a5", patient: "Lakshmi Iyer", age: 29, time: "11:00", reason: "New consultation", status: "scheduled", avatar: "LI" },
  { id: "a6", patient: "David Cohen", age: 51, time: "11:30", reason: "Lab results", status: "scheduled", avatar: "DC" },
  { id: "a7", patient: "Pooja Singh", age: 38, time: "12:00", reason: "Migraine consult", status: "scheduled", avatar: "PS" },
];

export const vitalsHistory = [
  { date: "Mon", bp: 128, hr: 76, spo2: 98 },
  { date: "Tue", bp: 132, hr: 78, spo2: 97 },
  { date: "Wed", bp: 130, hr: 74, spo2: 98 },
  { date: "Thu", bp: 134, hr: 80, spo2: 96 },
  { date: "Fri", bp: 129, hr: 75, spo2: 98 },
  { date: "Sat", bp: 127, hr: 73, spo2: 99 },
  { date: "Sun", bp: 125, hr: 72, spo2: 99 },
];

export const erQueue = [
  { id: "e1", patient: "Vikram Joshi", age: 45, complaint: "Severe chest pain", triage: "RED", wait: 2, doctor: "Dr. Shah" },
  { id: "e2", patient: "Ramya Das", age: 28, complaint: "Difficulty breathing", triage: "ORANGE", wait: 8, doctor: "Dr. Khan" },
  { id: "e3", patient: "Sameer Mehta", age: 62, complaint: "Dizziness, headache", triage: "YELLOW", wait: 24, doctor: "—" },
  { id: "e4", patient: "Anita Bose", age: 35, complaint: "Sprained ankle", triage: "GREEN", wait: 45, doctor: "—" },
];

export const labWorklist = [
  { id: "l1", patient: "Sneha Pillai", test: "HbA1c", priority: "ROUTINE", status: "in-progress" },
  { id: "l2", patient: "Rajesh Kumar", test: "Troponin-I", priority: "STAT", status: "pending" },
  { id: "l3", patient: "Ananya Reddy", test: "Lipid Profile", priority: "ROUTINE", status: "ready" },
  { id: "l4", patient: "Lakshmi Iyer", test: "CBC", priority: "ROUTINE", status: "ready" },
];

export const inventory = [
  { id: "m1", name: "Atorvastatin 20mg", qty: 320, reorder: 100, expiry: "2026-08-12", status: "ok" },
  { id: "m2", name: "Metformin 500mg", qty: 80, reorder: 100, expiry: "2026-04-20", status: "low" },
  { id: "m3", name: "Amoxicillin 250mg", qty: 540, reorder: 150, expiry: "2025-12-30", status: "ok" },
  { id: "m4", name: "Insulin Glargine", qty: 24, reorder: 30, expiry: "2025-09-01", status: "low" },
];

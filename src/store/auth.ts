import { create } from "zustand";

export type Role =
  | "SUPER_ADMIN"
  | "HOSPITAL_ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "RECEPTIONIST"
  | "LAB_TECHNICIAN"
  | "PHARMACIST"
  | "BILLING_EXECUTIVE"
  | "INSURANCE_COORDINATOR"
  | "ED_MANAGER"
  | "PATIENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  hospital?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  theme: "light" | "dark";
  login: (role: Role) => void;
  logout: () => void;
  toggleTheme: () => void;
}

const demoUsers: Record<Role, User> = {
  SUPER_ADMIN: { id: "u1", name: "Dr. Aanya Mehta", email: "aanya@medcore.io", role: "SUPER_ADMIN" },
  HOSPITAL_ADMIN: { id: "u2", name: "Rohan Kapoor", email: "rohan@apollo-demo.io", role: "HOSPITAL_ADMIN", hospital: "Apollo Demo" },
  DOCTOR: { id: "u3", name: "Dr. Vikram Shah", email: "vikram@apollo-demo.io", role: "DOCTOR", hospital: "Apollo Demo" },
  NURSE: { id: "u4", name: "Priya Sharma", email: "priya@apollo-demo.io", role: "NURSE", hospital: "Apollo Demo" },
  RECEPTIONIST: { id: "u5", name: "Maya Iyer", email: "maya@apollo-demo.io", role: "RECEPTIONIST", hospital: "Apollo Demo" },
  LAB_TECHNICIAN: { id: "u6", name: "Arjun Rao", email: "arjun@apollo-demo.io", role: "LAB_TECHNICIAN", hospital: "Apollo Demo" },
  PHARMACIST: { id: "u7", name: "Neha Verma", email: "neha@apollo-demo.io", role: "PHARMACIST", hospital: "Apollo Demo" },
  BILLING_EXECUTIVE: { id: "u8", name: "Sanjay Patel", email: "sanjay@apollo-demo.io", role: "BILLING_EXECUTIVE", hospital: "Apollo Demo" },
  INSURANCE_COORDINATOR: { id: "u9", name: "Kavita Nair", email: "kavita@apollo-demo.io", role: "INSURANCE_COORDINATOR", hospital: "Apollo Demo" },
  ED_MANAGER: { id: "u10", name: "Dr. Imran Khan", email: "imran@apollo-demo.io", role: "ED_MANAGER", hospital: "Apollo Demo" },
  PATIENT: { id: "u11", name: "Ananya Reddy", email: "ananya@gmail.com", role: "PATIENT" },
};

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  theme: "light",
  login: (role) => set({ user: demoUsers[role] }),
  logout: () => set({ user: null }),
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
    }
    set({ theme: next });
  },
}));

export const roleLabel: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  HOSPITAL_ADMIN: "Hospital Admin",
  DOCTOR: "Doctor",
  NURSE: "Nurse",
  RECEPTIONIST: "Receptionist",
  LAB_TECHNICIAN: "Lab Technician",
  PHARMACIST: "Pharmacist",
  BILLING_EXECUTIVE: "Billing Executive",
  INSURANCE_COORDINATOR: "Insurance Coordinator",
  ED_MANAGER: "ED Manager",
  PATIENT: "Patient",
};

export const roleHome: Record<Role, string> = {
  SUPER_ADMIN: "/super-admin",
  HOSPITAL_ADMIN: "/hospital-admin",
  DOCTOR: "/doctor",
  NURSE: "/nurse",
  RECEPTIONIST: "/reception",
  LAB_TECHNICIAN: "/lab",
  PHARMACIST: "/pharmacy",
  BILLING_EXECUTIVE: "/billing",
  INSURANCE_COORDINATOR: "/insurance",
  ED_MANAGER: "/emergency",
  PATIENT: "/patient",
};

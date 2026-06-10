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
  username: string;
  role: Role;
  hospital?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  theme: "light" | "dark";
  login: (username: string, pass: string) => Promise<void>;
  demoLogin: (role: Role) => void;
  logout: () => void;
  toggleTheme: () => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  theme: "light",
  login: async (username, pass) => {
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass })
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      const token = data.access_token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      set({ 
        token,
        user: {
           id: payload.sub,
           name: payload.username,
           username: payload.username,
           role: payload.role as Role
        }
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  demoLogin: (role) => {
    set({
      token: "demo-token",
      user: {
        id: "demo-id",
        name: `Demo ${roleLabel[role] || role}`,
        username: `demo-${role.toLowerCase()}`,
        role: role
      }
    });
  },
  logout: () => set({ user: null, token: null }),
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

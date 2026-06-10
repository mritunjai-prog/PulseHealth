import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity, LayoutDashboard, Building2, Users, BarChart3, Bot, Settings,
  Calendar, Stethoscope, FileText, Pill, FlaskConical, Receipt, Shield,
  AlertCircle, Bed, Heart, Search, ClipboardList, UserPlus, ListChecks,
} from "lucide-react";
import type { Role } from "@/store/auth";
import { useAuth } from "@/store/auth";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof Activity };

const navByRole: Record<Role, NavItem[]> = {
  SUPER_ADMIN: [
    { to: "/super-admin", label: "Overview", icon: LayoutDashboard },
    { to: "/super-admin/hospitals", label: "Hospitals", icon: Building2 },
    { to: "/super-admin/staff", label: "Staff", icon: Users },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/ai-suite", label: "AI Console", icon: Bot },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
  HOSPITAL_ADMIN: [
    { to: "/hospital-admin", label: "Overview", icon: LayoutDashboard },
    { to: "/hospital-admin/departments", label: "Departments", icon: Building2 },
    { to: "/hospital-admin/staff", label: "Staff", icon: Users },
    { to: "/analytics", label: "Reports", icon: BarChart3 },
    { to: "/ai-suite", label: "AI Suite", icon: Bot },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
  DOCTOR: [
    { to: "/doctor", label: "Dashboard", icon: LayoutDashboard },
    { to: "/doctor/appointments", label: "Appointments", icon: Calendar },
    { to: "/doctor/patients", label: "My Patients", icon: Stethoscope },
    { to: "/doctor/emr", label: "EMR / EHR", icon: FileText },
    { to: "/doctor/prescriptions", label: "Prescriptions", icon: Pill },
    { to: "/ai-suite", label: "AI Copilot", icon: Bot },
  ],
  NURSE: [
    { to: "/nurse", label: "My Ward", icon: Bed },
    { to: "/nurse/vitals", label: "Vitals", icon: Heart },
    { to: "/nurse/medication", label: "Medications", icon: Pill },
    { to: "/nurse/tasks", label: "Tasks", icon: ListChecks },
  ],
  RECEPTIONIST: [
    { to: "/reception", label: "Front Desk", icon: LayoutDashboard },
    { to: "/reception/book", label: "Book Appointment", icon: Calendar },
    { to: "/reception/register", label: "Register Patient", icon: UserPlus },
    { to: "/reception/search", label: "Patient Search", icon: Search },
  ],
  LAB_TECHNICIAN: [
    { to: "/lab", label: "Worklist", icon: FlaskConical },
    { to: "/lab/results", label: "Result Entry", icon: ClipboardList },
  ],
  PHARMACIST: [
    { to: "/pharmacy", label: "Queue", icon: Pill },
    { to: "/pharmacy/inventory", label: "Inventory", icon: ClipboardList },
  ],
  BILLING_EXECUTIVE: [
    { to: "/billing", label: "Dashboard", icon: Receipt },
    { to: "/billing/invoice", label: "New Invoice", icon: FileText },
  ],
  INSURANCE_COORDINATOR: [
    { to: "/insurance", label: "Claims", icon: Shield },
  ],
  ED_MANAGER: [
    { to: "/emergency", label: "ER Live", icon: AlertCircle },
    { to: "/emergency/beds", label: "Bed Map", icon: Bed },
  ],
  PATIENT: [
    { to: "/patient", label: "My Health", icon: Heart },
    { to: "/patient/appointments", label: "Appointments", icon: Calendar },
    { to: "/patient/records", label: "Records", icon: FileText },
    { to: "/ai-suite", label: "AI Assistant", icon: Bot },
  ],
};

export function Sidebar() {
  const user = useAuth((s) => s.user);
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  if (!user) return null;
  const items = navByRole[user.role];

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-2 bg-sidebar border-r border-sidebar-border px-4 py-6">
      <Link to="/" className="flex items-center gap-2 px-2 mb-4">
        <motion.div
          animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="grid place-items-center w-10 h-10 rounded-2xl bg-primary text-primary-foreground"
        >
          <Activity className="w-5 h-5" />
        </motion.div>
        <div>
          <div className="font-display font-extrabold text-lg leading-tight">MedCore</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Health OS</div>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to + "/"));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon className="w-4.5 h-4.5" strokeWidth={2} />
              <span>{item.label}</span>
              {active && (
                <motion.div
                  layoutId="sidebar-active-dot"
                  className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary-foreground"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

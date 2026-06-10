import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useAuth, roleHome } from "@/store/auth";
import { Navigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function AppShell({ children, requireAuth = true }: { children: ReactNode; requireAuth?: boolean }) {
  const user = useAuth((s) => s.user);
  if (requireAuth && !user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export { roleHome };

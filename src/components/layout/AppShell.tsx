import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useAuth, roleHome } from "@/store/auth";
import { Navigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { useState } from "react";
import { AiCopilotPanel } from "@/components/ai/AiCopilotPanel";
import { Bot } from "lucide-react";

export function AppShell({ children, requireAuth = true }: { children: ReactNode; requireAuth?: boolean }) {
  const user = useAuth((s) => s.user);
  const [copilotOpen, setCopilotOpen] = useState(false);

  if (requireAuth && !user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen flex bg-background text-foreground relative">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden relative"
        >
          {children}
        </motion.main>
      </div>

      {/* Global Floating Action Button */}
      <button 
        onClick={() => setCopilotOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl shadow-primary/30 grid place-items-center hover:scale-105 active:scale-95 transition-all z-30"
      >
        <Bot className="w-6 h-6" />
      </button>

      <AiCopilotPanel open={copilotOpen} onClose={() => setCopilotOpen(false)} />
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

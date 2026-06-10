import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, FileText, AlertCircle, Sparkles } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/common/KpiCard";
import { MiniLineChart } from "@/components/charts/Charts";
import { todaysAppointments, vitalsHistory } from "@/data/demo";
import { AiCopilotPanel } from "@/components/ai/AiCopilotPanel";

export const Route = createFileRoute("/doctor/")({
  head: () => ({ meta: [{ title: "Doctor Dashboard — MedCore" }] }),
  component: DoctorDashboard,
});

const statusStyle: Record<string, string> = {
  completed: "bg-success-highlight text-success",
  "in-progress": "bg-warning-highlight text-warning",
  scheduled: "bg-primary-highlight text-primary",
};

function DoctorDashboard() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <AppShell>
      <PageHeader
        title="Good morning, Dr. Shah 👋"
        subtitle="Here's what's on your schedule today."
        action={
          <button onClick={() => setAiOpen(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition active:scale-95 shadow-lg shadow-primary/25">
            <Sparkles className="w-4 h-4" /> AI Copilot
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Appointments Today" value={12} icon={Calendar} tone="primary" delay={0} />
        <KpiCard label="Inpatients" value={8} icon={Users} tone="secondary" delay={0.05} />
        <KpiCard label="Pending Reports" value={5} icon={FileText} tone="warning" delay={0.1} />
        <KpiCard label="Critical Alerts" value={2} icon={AlertCircle} tone="accent" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-soft p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg">Today's Appointments</h3>
            <span className="text-xs text-muted-foreground">{todaysAppointments.length} total</span>
          </div>
          <div className="space-y-2">
            {todaysAppointments.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-surface-offset transition"
              >
                <div className="w-11 h-11 rounded-full bg-primary-highlight text-primary grid place-items-center font-bold text-sm ring-2 ring-primary/20">
                  {a.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{a.patient} <span className="text-muted-foreground font-normal">· {a.age}y</span></div>
                  <div className="text-xs text-muted-foreground truncate">{a.reason}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold tabular-nums">{a.time}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${statusStyle[a.status]}`}>{a.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-1">Patient Vitals Trend</h3>
          <p className="text-xs text-muted-foreground mb-2">Ananya Reddy · last 7 days</p>
          <MiniLineChart data={vitalsHistory} xKey="date" yKey="bp" height={200} />
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div className="p-2 rounded-xl bg-surface-offset"><div className="text-xs text-muted-foreground">BP</div><div className="font-bold tabular-nums text-sm">125/82</div></div>
            <div className="p-2 rounded-xl bg-surface-offset"><div className="text-xs text-muted-foreground">HR</div><div className="font-bold tabular-nums text-sm">72</div></div>
            <div className="p-2 rounded-xl bg-surface-offset"><div className="text-xs text-muted-foreground">SpO₂</div><div className="font-bold tabular-nums text-sm">99%</div></div>
          </div>
        </motion.div>
      </div>

      <AiCopilotPanel open={aiOpen} onClose={() => setAiOpen(false)} />
    </AppShell>
  );
}

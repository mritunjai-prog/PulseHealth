import { createFileRoute } from "@tanstack/react-router";
import { Heart, Calendar, FileText, Pill } from "lucide-react";
import { motion } from "framer-motion";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/common/KpiCard";
import { MiniLineChart } from "@/components/charts/Charts";
import { vitalsHistory } from "@/data/demo";

export const Route = createFileRoute("/patient/")({
  head: () => ({ meta: [{ title: "My Health — MedCore" }] }),
  component: () => (
    <AppShell>
      <PageHeader title="Hi Ananya 🌿" subtitle="Here's a quick summary of your health." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Next Appointment" value={2} suffix=" days" icon={Calendar} tone="primary" delay={0} />
        <KpiCard label="Active Prescriptions" value={3} icon={Pill} tone="secondary" delay={0.05} />
        <KpiCard label="Lab Reports" value={6} icon={FileText} tone="warning" delay={0.1} />
        <KpiCard label="Health Score" value={86} suffix="/100" icon={Heart} tone="success" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-soft p-5 lg:col-span-2">
          <h3 className="font-display font-bold text-lg mb-1">Blood Pressure</h3>
          <p className="text-xs text-muted-foreground mb-2">Last 7 readings</p>
          <MiniLineChart data={vitalsHistory} xKey="date" yKey="bp" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-3">Upcoming</h3>
          <div className="space-y-3">
            {[
              { title: "Dr. Vikram Shah", note: "Follow-up · Hypertension", date: "Thu, 10:00 AM" },
              { title: "Lab — Lipid Profile", note: "Apollo Demo · Fasting", date: "Sat, 8:30 AM" },
            ].map((u, i) => (
              <div key={i} className="p-3 rounded-2xl bg-surface-offset">
                <div className="font-semibold text-sm">{u.title}</div>
                <div className="text-xs text-muted-foreground">{u.note}</div>
                <div className="text-xs text-primary font-medium mt-1">{u.date}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppShell>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertCircle, Activity, Clock, Bed } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/common/KpiCard";
import { erQueue } from "@/data/demo";

export const Route = createFileRoute("/emergency/")({
  head: () => ({ meta: [{ title: "ER Live — MedCore" }] }),
  component: ErDashboard,
});

const triageStyle: Record<string, string> = {
  RED: "bg-error-highlight text-error ring-error",
  ORANGE: "bg-accent/15 text-accent ring-accent",
  YELLOW: "bg-warning-highlight text-warning ring-warning",
  GREEN: "bg-success-highlight text-success ring-success",
};

function ErDashboard() {
  return (
    <AppShell>
      <PageHeader title="Emergency Department · Live" subtitle="Auto-updating triage queue and bed availability." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="In Queue" value={erQueue.length} icon={Clock} tone="accent" delay={0} />
        <KpiCard label="Avg Wait (min)" value={18} icon={Activity} tone="warning" delay={0.05} />
        <KpiCard label="Available Beds" value={6} icon={Bed} tone="success" delay={0.1} />
        <KpiCard label="Critical Cases" value={1} icon={AlertCircle} tone="primary" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-display font-bold text-lg">Triage Queue</h3>
          {erQueue.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-soft p-4 flex items-center gap-4"
            >
              <motion.span
                animate={p.triage === "RED" ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className={`text-[10px] px-2.5 py-1 rounded-full font-bold ring-1 ${triageStyle[p.triage]}`}
              >
                {p.triage}
              </motion.span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{p.patient} <span className="text-muted-foreground font-normal text-xs">· {p.age}y</span></div>
                <div className="text-xs text-muted-foreground truncate">{p.complaint}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-muted-foreground">Waiting</div>
                <div className="font-bold tabular-nums">{p.wait} min</div>
              </div>
              <div className="text-right shrink-0 hidden md:block">
                <div className="text-xs text-muted-foreground">Doctor</div>
                <div className="text-sm font-medium">{p.doctor}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-3">Bed Map · ER Wing</h3>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 16 }).map((_, i) => {
              const states = ["occupied", "available", "available", "cleaning", "occupied", "available", "occupied", "available"];
              const s = states[i % states.length];
              const cls = s === "occupied" ? "bg-primary text-primary-foreground" : s === "available" ? "bg-success-highlight text-success" : "bg-warning-highlight text-warning";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`aspect-square rounded-2xl grid place-items-center text-[10px] font-bold ${cls}`}
                >
                  {i + 1}
                </motion.div>
              );
            })}
          </div>
          <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Occupied</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Free</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Cleaning</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

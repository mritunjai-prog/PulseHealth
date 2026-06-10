import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FlaskConical, AlertCircle, Check, Clock } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/common/KpiCard";
import { labWorklist } from "@/data/demo";

export const Route = createFileRoute("/lab/")({
  head: () => ({ meta: [{ title: "Lab Worklist — MedCore" }] }),
  component: () => (
    <AppShell>
      <PageHeader title="Lab Worklist" subtitle="STAT tests highlighted · sample tracking" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="STAT Pending" value={1} icon={AlertCircle} tone="accent" delay={0} />
        <KpiCard label="In Progress" value={1} icon={Clock} tone="warning" delay={0.05} />
        <KpiCard label="Ready" value={2} icon={Check} tone="success" delay={0.1} />
        <KpiCard label="Tests Today" value={48} icon={FlaskConical} tone="primary" delay={0.15} />
      </div>
      <div className="card-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-offset text-muted-foreground text-xs uppercase tracking-wider">
            <tr><th className="text-left px-4 py-3">Patient</th><th className="text-left px-4 py-3">Test</th><th className="text-left px-4 py-3">Priority</th><th className="text-left px-4 py-3">Status</th><th className="text-right px-4 py-3">Actions</th></tr>
          </thead>
          <tbody>
            {labWorklist.map((l, i) => (
              <motion.tr key={l.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.05}} className="border-t border-divider hover:bg-primary-highlight/40 transition">
                <td className="px-4 py-3 font-medium">{l.patient}</td>
                <td className="px-4 py-3">{l.test}</td>
                <td className="px-4 py-3">
                  <motion.span animate={l.priority==="STAT"?{scale:[1,1.08,1]}:{}} transition={{duration:1,repeat:Infinity}} className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${l.priority==="STAT"?"bg-error-highlight text-error":"bg-surface-offset text-muted-foreground"}`}>{l.priority}</motion.span>
                </td>
                <td className="px-4 py-3 capitalize">{l.status}</td>
                <td className="px-4 py-3 text-right"><button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-hover">Open</button></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  ),
});

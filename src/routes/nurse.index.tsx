import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bed, Heart, Pill, ListChecks, Check } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/common/KpiCard";
import { useState } from "react";

export const Route = createFileRoute("/nurse/")({
  head: () => ({ meta: [{ title: "Nurse — Ward View" }] }),
  component: NurseDash,
});

const wardPatients = [
  { bed: "W-12", name: "Rajesh Kumar", dx: "Post-CABG day 2", bp: "118/76", hr: 72, alert: false },
  { bed: "W-13", name: "Sneha Pillai", dx: "DKA recovery", bp: "124/80", hr: 88, alert: true },
  { bed: "W-14", name: "Mohammed Ali", dx: "Pneumonia", bp: "130/82", hr: 94, alert: false },
  { bed: "W-15", name: "Lakshmi Iyer", dx: "Appendectomy d1", bp: "112/74", hr: 78, alert: false },
];

function NurseDash() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Record vitals — W-13", done: false },
    { id: 2, text: "Administer Insulin — W-13 10:00", done: false },
    { id: 3, text: "Discharge prep — W-15", done: true },
    { id: 4, text: "Wound dressing — W-12", done: false },
  ]);

  return (
    <AppShell>
      <PageHeader title="Ward 3B · West Wing" subtitle="4 patients assigned · shift 7am–7pm" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Patients" value={4} icon={Bed} tone="primary" delay={0} />
        <KpiCard label="Vitals Pending" value={2} icon={Heart} tone="warning" delay={0.05} />
        <KpiCard label="Meds Due" value={3} icon={Pill} tone="secondary" delay={0.1} />
        <KpiCard label="Tasks Open" value={tasks.filter(t=>!t.done).length} icon={ListChecks} tone="accent" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-2">
          <h3 className="font-display font-bold text-lg mb-2">Patients</h3>
          {wardPatients.map((p, i) => (
            <motion.div key={p.bed} initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}} className="card-soft p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary grid place-items-center font-bold text-xs">{p.bed}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm flex items-center gap-2">
                  {p.name}
                  {p.alert && <motion.span animate={{scale:[1,1.2,1]}} transition={{duration:1.2,repeat:Infinity}} className="text-[10px] px-2 py-0.5 rounded-full bg-error-highlight text-error font-bold">ALERT</motion.span>}
                </div>
                <div className="text-xs text-muted-foreground">{p.dx}</div>
              </div>
              <div className="text-right text-xs">
                <div className="tabular-nums font-semibold">{p.bp}</div>
                <div className="text-muted-foreground tabular-nums">HR {p.hr}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-3">Task List</h3>
          <div className="space-y-2">
            {tasks.map(t => (
              <button key={t.id} onClick={() => setTasks(ts => ts.map(x => x.id===t.id ? {...x, done:!x.done}:x))}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-surface-offset transition text-left">
                <motion.div animate={t.done ? {scale:[1,1.2,1]}:{}} className={`w-5 h-5 rounded-md border-2 grid place-items-center ${t.done ? "bg-success border-success" : "border-divider"}`}>
                  {t.done && <Check className="w-3 h-3 text-white" />}
                </motion.div>
                <span className={`text-sm ${t.done ? "line-through text-muted-foreground" : ""}`}>{t.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

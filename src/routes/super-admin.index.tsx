import { createFileRoute } from "@tanstack/react-router";
import { Building2, Users, Calendar, Wallet, Activity, Plus, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/common/KpiCard";
import { MiniLineChart, MiniBarChart, MiniDonut } from "@/components/charts/Charts";
import {
  hospitals, platformKpis, monthlyRegistrations,
  appointmentsPerHospital, staffDistribution,
} from "@/data/demo";

export const Route = createFileRoute("/super-admin/")({
  head: () => ({ meta: [{ title: "Super Admin — MedCore" }] }),
  component: () => (
    <AppShell>
      <PageHeader title="Platform Overview" subtitle="All hospitals, staff, and patient activity across the MedCore network." />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KpiCard label="Hospitals" value={platformKpis.hospitals} icon={Building2} tone="primary" delay={0} />
        <KpiCard label="Patients" value={platformKpis.patients} icon={Users} tone="secondary" delay={0.05} />
        <KpiCard label="Staff" value={platformKpis.staff} icon={Activity} tone="success" delay={0.1} />
        <KpiCard label="Appointments Today" value={platformKpis.appointmentsToday} icon={Calendar} tone="warning" delay={0.15} />
        <KpiCard label="Revenue Today" value={platformKpis.revenueToday} prefix="₹" icon={Wallet} tone="accent" delay={0.2} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card-soft p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-lg">Patient Registrations</h3>
              <p className="text-xs text-muted-foreground">Last 12 months across all hospitals</p>
            </div>
          </div>
          <MiniLineChart data={monthlyRegistrations} xKey="month" yKey="patients" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-1">Staff Distribution</h3>
          <p className="text-xs text-muted-foreground mb-2">By role across the network</p>
          <MiniDonut data={staffDistribution} />
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card-soft p-5 lg:col-span-2">
          <h3 className="font-display font-bold text-lg mb-1">Appointments per Hospital</h3>
          <p className="text-xs text-muted-foreground mb-2">This week</p>
          <MiniBarChart data={appointmentsPerHospital} xKey="name" yKey="appointments" color="var(--color-secondary)" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-3">AI Console</h3>
          <div className="space-y-2.5">
            {["Symptom Triage", "Doctor Copilot", "Claim Validator", "Revenue Analytics"].map((a, i) => (
              <div key={a} className="flex items-center justify-between p-3 rounded-2xl bg-surface-offset">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full bg-success"
                  />
                  <span className="text-sm font-medium">{a}</span>
                </div>
                <span className="text-[11px] text-muted-foreground tabular-nums">{420 + i * 87} runs</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hospitals grid */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-extrabold text-xl">Hospitals</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition active:scale-95">
          <Plus className="w-4 h-4" /> New hospital
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.07 }}
            whileHover={{ y: -4 }}
            className="card-soft card-soft-hover p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-highlight text-primary grid place-items-center font-display font-extrabold">
                {h.name[0]}
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-success-highlight text-success font-semibold uppercase">Active</span>
            </div>
            <h3 className="font-display font-bold text-lg">{h.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
              <MapPin className="w-3 h-3" /> {h.city}, {h.state}
            </div>
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-divider">
              <div><div className="text-base font-bold tabular-nums">{h.staff}</div><div className="text-[10px] text-muted-foreground uppercase">Staff</div></div>
              <div><div className="text-base font-bold tabular-nums">{h.patients.toLocaleString()}</div><div className="text-[10px] text-muted-foreground uppercase">Patients</div></div>
              <div><div className="text-base font-bold tabular-nums">{h.specialties}</div><div className="text-[10px] text-muted-foreground uppercase">Specialties</div></div>
            </div>
          </motion.div>
        ))}
      </div>
    </AppShell>
  ),
});

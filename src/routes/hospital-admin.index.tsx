import { createFileRoute } from "@tanstack/react-router";
import { Building2, Users, Bed, Wallet } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/common/KpiCard";
import { MiniBarChart, MiniLineChart } from "@/components/charts/Charts";
import { revenueByDept, monthlyRegistrations } from "@/data/demo";

export const Route = createFileRoute("/hospital-admin/")({
  head: () => ({ meta: [{ title: "Hospital Admin — MedCore" }] }),
  component: () => (
    <AppShell>
      <PageHeader title="Apollo Demo · Mumbai" subtitle="Hospital overview, occupancy, and revenue." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="OPD Today" value={248} icon={Users} tone="primary" delay={0} />
        <KpiCard label="Inpatients" value={86} icon={Bed} tone="secondary" delay={0.05} />
        <KpiCard label="Available Beds" value={24} icon={Building2} tone="success" delay={0.1} />
        <KpiCard label="Revenue Today" value={840000} prefix="₹" icon={Wallet} tone="accent" delay={0.15} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-2">Revenue by Department</h3>
          <MiniBarChart data={revenueByDept} xKey="dept" yKey="revenue" />
        </div>
        <div className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-2">Patient Volume Trend</h3>
          <MiniLineChart data={monthlyRegistrations} xKey="month" yKey="patients" color="var(--color-secondary)" />
        </div>
      </div>
    </AppShell>
  ),
});

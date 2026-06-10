import { createFileRoute } from "@tanstack/react-router";
import { Pill, Package, AlertCircle, Check } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/common/KpiCard";
import { inventory } from "@/data/demo";

export const Route = createFileRoute("/pharmacy/")({
  head: () => ({ meta: [{ title: "Pharmacy — MedCore" }] }),
  component: () => (
    <AppShell>
      <PageHeader title="Pharmacy" subtitle="Prescription queue and inventory" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Queue" value={12} icon={Pill} tone="primary" delay={0} />
        <KpiCard label="Dispensed Today" value={84} icon={Check} tone="success" delay={0.05} />
        <KpiCard label="Low Stock" value={2} icon={AlertCircle} tone="warning" delay={0.1} />
        <KpiCard label="SKUs" value={1284} icon={Package} tone="secondary" delay={0.15} />
      </div>
      <div className="card-soft p-5">
        <h3 className="font-display font-bold text-lg mb-3">Inventory</h3>
        <div className="space-y-2">
          {inventory.map((m) => (
            <div key={m.id} className="flex items-center gap-3 p-3 rounded-2xl bg-surface-offset">
              <div className="w-10 h-10 rounded-2xl bg-success-highlight text-success grid place-items-center"><Pill className="w-5 h-5" /></div>
              <div className="flex-1"><div className="font-semibold text-sm">{m.name}</div><div className="text-xs text-muted-foreground">Expires {m.expiry}</div></div>
              <div className="text-right">
                <div className="font-bold tabular-nums">{m.qty}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${m.status==="low"?"bg-warning-highlight text-warning":"bg-success-highlight text-success"}`}>{m.status === "low" ? "Reorder" : "OK"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  ),
});

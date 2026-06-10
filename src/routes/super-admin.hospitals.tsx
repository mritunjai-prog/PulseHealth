import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Trash2, Plus, Building2 } from "lucide-react";

export const Route = createFileRoute("/super-admin/hospitals")({
  component: HospitalsManagement,
});

function HospitalsManagement() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const { data: hospitals = [], isLoading } = useQuery({
    queryKey: ['hospitals'],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/hospital");
      return res.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await fetch("http://localhost:3000/hospital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hospitals'] });
      queryClient.invalidateQueries({ queryKey: ['platformKpis'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:3000/hospital/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hospitals'] });
      queryClient.invalidateQueries({ queryKey: ['platformKpis'] });
    }
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ name, code, address: "TBD", city: "TBD", state: "TBD", country: "TBD" });
    setName("");
    setCode("");
  };

  return (
    <AppShell>
      <PageHeader title="Hospital Management" subtitle="Add or remove organizations from the MedCore network." />

      <div className="card-soft p-5 mb-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Register New Hospital</h3>
        <form onSubmit={handleCreate} className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-semibold text-muted-foreground">Hospital Name</label>
            <input required value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 p-2 rounded-xl bg-surface-offset border border-divider outline-none focus:border-primary" placeholder="e.g. Apollo Central"/>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-semibold text-muted-foreground">Hospital Code</label>
            <input required value={code} onChange={e => setCode(e.target.value)} className="w-full mt-1 p-2 rounded-xl bg-surface-offset border border-divider outline-none focus:border-primary" placeholder="e.g. APL-01"/>
          </div>
          <button type="submit" disabled={createMutation.isPending} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover active:scale-95 disabled:opacity-50 transition">
            {createMutation.isPending ? "Saving..." : "Add Hospital"}
          </button>
        </form>
      </div>

      <div className="card-soft p-5 overflow-x-auto">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Building2 className="w-5 h-5"/> Network Hospitals</h3>
        {isLoading ? <div className="text-muted-foreground py-4 text-center">Loading hospitals...</div> : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-divider text-muted-foreground">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Code</th>
                <th className="pb-3 font-semibold">Staff Count</th>
                <th className="pb-3 font-semibold">Patient Count</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((h: any) => (
                <tr key={h.id} className="border-b border-divider/50 hover:bg-surface-offset/50 transition">
                  <td className="py-3 font-medium">{h.name}</td>
                  <td className="py-3">{h.code}</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full bg-secondary-highlight text-secondary font-bold">{h._count?.users || 0}</span></td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full bg-primary-highlight text-primary font-bold">{h._count?.patients || 0}</span></td>
                  <td className="py-3 text-right">
                    <button onClick={() => { if(confirm('WARNING: This will permanently cascade delete all patients, appointments, and staff associated with this hospital. Are you sure?')) deleteMutation.mutate(h.id) }} className="p-2 rounded-lg text-destructive hover:bg-destructive-highlight transition" title="Delete Hospital">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppShell>
  );
}

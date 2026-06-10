import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Trash2, Plus, Users } from "lucide-react";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/hospital-admin/staff")({
  component: HospitalAdminStaff,
});

function HospitalAdminStaff() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("DOCTOR");

  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/user");
      return res.json();
    }
  });

  // Filter users to only show staff in the admin's hospital
  const staff = allUsers.filter((u: any) => u.hospitalId === user?.hospitalId);

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:3000/user/${id}`, { method: "DELETE" });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.hospitalId) return;
    
    // Automatically assign to the admin's hospital
    createMutation.mutate({ username, email, role, hospitalId: user.hospitalId });
    setUsername("");
    setEmail("");
  };

  return (
    <AppShell>
      <PageHeader title="Staff Directory" subtitle="Manage credentials for doctors, nurses, and staff in your hospital." />

      <div className="card-soft p-5 mb-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Provision Staff Credentials</h3>
        <form onSubmit={handleCreate} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Username</label>
            <input required value={username} onChange={e => setUsername(e.target.value)} className="w-full mt-1 p-2 rounded-xl bg-surface-offset border border-divider outline-none focus:border-primary" placeholder="dr.smith"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 p-2 rounded-xl bg-surface-offset border border-divider outline-none focus:border-primary" placeholder="smith@hospital.org"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full mt-1 p-2 rounded-xl bg-surface-offset border border-divider outline-none focus:border-primary">
              <option value="DOCTOR">Doctor</option>
              <option value="NURSE">Nurse</option>
              <option value="RECEPTIONIST">Receptionist</option>
              <option value="LAB_TECHNICIAN">Lab Tech</option>
              <option value="PHARMACIST">Pharmacist</option>
              <option value="BILLING_EXECUTIVE">Billing Exec</option>
            </select>
          </div>
          <button type="submit" disabled={createMutation.isPending} className="w-full px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover active:scale-95 disabled:opacity-50 transition">
            Create Credential
          </button>
        </form>
      </div>

      <div className="card-soft p-5 overflow-x-auto">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Users className="w-5 h-5"/> Your Hospital Staff</h3>
        {isLoading ? <div className="text-muted-foreground py-4 text-center">Loading staff...</div> : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-divider text-muted-foreground">
                <th className="pb-3 font-semibold">Username</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((u: any) => (
                <tr key={u.id} className="border-b border-divider/50 hover:bg-surface-offset/50 transition">
                  <td className="py-3 font-medium">{u.username}</td>
                  <td className="py-3">{u.email || 'N/A'}</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full bg-surface-offset font-semibold text-xs">{u.role}</span></td>
                  <td className="py-3">
                    {u.status === 'ACTIVE' 
                      ? <span className="px-2 py-1 rounded-full bg-success-highlight text-success font-semibold text-[10px]">ACTIVE</span>
                      : <span className="px-2 py-1 rounded-full bg-warning-highlight text-warning font-semibold text-[10px]">INACTIVE</span>
                    }
                  </td>
                  <td className="py-3 text-right">
                    <button onClick={() => { if(confirm('Deactivate this credential?')) deleteMutation.mutate(u.id) }} className="p-2 rounded-lg text-destructive hover:bg-destructive-highlight transition" title="Deactivate Credential">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </td>
                </tr>
              ))}
              {staff.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted-foreground">No staff provisioned yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </AppShell>
  );
}

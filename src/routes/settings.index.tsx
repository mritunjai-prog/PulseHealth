import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { useAuth, roleLabel } from "@/store/auth";

export const Route = createFileRoute("/settings/")({
  head: () => ({ meta: [{ title: "Settings — MedCore" }] }),
  component: () => {
    const { user, theme, toggleTheme } = useAuth();
    return (
      <AppShell>
        <PageHeader title="Settings" subtitle="Manage your profile and preferences." />
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="card-soft p-5">
            <h3 className="font-display font-bold text-lg mb-4">Profile</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-extrabold text-xl">
                  {user?.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
                </div>
                <div>
                  <div className="font-bold">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user && roleLabel[user.role]} · {user?.email}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-soft p-5">
            <h3 className="font-display font-bold text-lg mb-4">Appearance</h3>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-offset">
              <div>
                <div className="font-semibold text-sm">Theme</div>
                <div className="text-xs text-muted-foreground">Currently using {theme} mode</div>
              </div>
              <button onClick={toggleTheme} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                Switch to {theme === "light" ? "dark" : "light"}
              </button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  },
});

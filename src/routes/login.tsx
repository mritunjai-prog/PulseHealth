import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Heart, Stethoscope, Pill, FlaskConical } from "lucide-react";
import { useAuth, roleHome, roleLabel, type Role } from "@/store/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — MedCore" }] }),
  component: LoginPage,
});

const roleOptions: Role[] = [
  "SUPER_ADMIN", "HOSPITAL_ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST",
  "LAB_TECHNICIAN", "PHARMACIST", "BILLING_EXECUTIVE", "INSURANCE_COORDINATOR",
  "ED_MANAGER", "PATIENT",
];

function LoginPage() {
  const router = useRouter();
  const login = useAuth((s) => s.login);

  const signIn = (role: Role) => {
    login(role);
    router.navigate({ to: roleHome[role] });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left: animated illustration */}
      <div className="relative md:flex-1 hidden md:flex items-center justify-center bg-gradient-to-br from-primary-highlight via-surface to-surface-offset overflow-hidden">
        {[Heart, Stethoscope, Pill, FlaskConical, Activity].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/40"
            style={{ left: `${15 + i * 16}%`, top: `${20 + (i % 3) * 22}%` }}
            animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            <Icon className="w-14 h-14" strokeWidth={1.5} />
          </motion.div>
        ))}
        <div className="relative z-10 text-center px-10">
          <motion.div
            animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-primary text-primary-foreground grid place-items-center shadow-xl shadow-primary/30"
          >
            <Activity className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl font-display font-extrabold mb-3">MedCore Health OS</h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            The AI-powered operating system for modern hospital networks.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="md:flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md card-soft p-8"
        >
          <h2 className="font-display font-extrabold text-2xl mb-2">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Demo mode — pick a role to sign in instantly.
          </p>

          <div className="space-y-3 mb-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
              <input defaultValue="demo@medcore.io" className="mt-1 w-full px-4 py-3 rounded-2xl bg-surface-offset border border-transparent focus:border-primary focus:bg-surface outline-none text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
              <input type="password" defaultValue="demo1234" className="mt-1 w-full px-4 py-3 rounded-2xl bg-surface-offset border border-transparent focus:border-primary focus:bg-surface outline-none text-sm" />
            </div>
          </div>

          <div className="mb-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sign in as</div>
            <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {roleOptions.map((r) => (
                <motion.button
                  key={r} whileTap={{ scale: 0.96 }}
                  onClick={() => signIn(r)}
                  className="text-xs font-medium px-3 py-2.5 rounded-2xl bg-surface-offset hover:bg-primary hover:text-primary-foreground transition-colors text-left"
                >
                  {roleLabel[r]}
                </motion.button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground text-center mt-4">
            Staff accounts are provisioned by your Super Admin. Patients can self-register.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

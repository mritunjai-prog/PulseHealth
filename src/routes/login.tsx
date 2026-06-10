import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Heart, Stethoscope, Pill, FlaskConical, Loader2, Sun, Moon } from "lucide-react";
import { useAuth, roleHome } from "@/store/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — MedCore" }] }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const { theme, toggleTheme } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const demoLogin = useAuth((s) => s.demoLogin);

  const handleDemoLogin = (role: any) => {
    demoLogin(role);
    toast.success(`Logged in as ${role} (Demo)`);
    router.navigate({ to: roleHome[role] });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      const user = useAuth.getState().user;
      if (user && user.role) {
        toast.success("Successfully logged in");
        router.navigate({ to: roleHome[user.role] });
      }
    } catch (err) {
      toast.error("Invalid credentials or server offline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background relative">
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 w-14 h-8 rounded-full bg-surface-offset border border-divider p-1 transition-colors z-20"
        aria-label="Toggle theme"
      >
        <motion.div
          className="absolute top-1 w-6 h-6 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-md"
          animate={{ x: theme === "dark" ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {theme === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </motion.div>
      </button>

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
            Sign in to access your dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Username / Email</label>
              <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 rounded-2xl bg-surface-offset border border-transparent focus:border-primary focus:bg-surface outline-none text-sm" 
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 rounded-2xl bg-surface-offset border border-transparent focus:border-primary focus:bg-surface outline-none text-sm" 
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full mt-4 bg-primary text-primary-foreground font-semibold py-3 rounded-2xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
            </motion.button>
          </form>

          <div className="mt-8 border-t border-divider pt-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Bypass for Demo Mode</p>
            <div className="grid grid-cols-3 gap-2">
              {['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'PATIENT'].map((r) => (
                <button
                  key={r}
                  onClick={() => handleDemoLogin(r)}
                  className="px-2 py-2 text-[10px] font-semibold bg-surface border border-divider hover:border-primary rounded-lg transition-colors text-foreground"
                >
                  {r.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground text-center mt-6">
            Staff accounts are provisioned by your Super Admin. Patients can self-register.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

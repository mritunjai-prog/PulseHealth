import { motion } from "framer-motion";
import { Bell, Search, Sun, Moon, LogOut, ChevronDown } from "lucide-react";
import { useAuth, roleLabel } from "@/store/auth";
import { useRouter } from "@tanstack/react-router";

export function Topbar() {
  const { user, theme, toggleTheme, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 glass border-b border-divider px-4 md:px-6 h-16 flex items-center gap-3">
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search patients, doctors, MRN…"
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-surface-offset border border-transparent focus:border-primary focus:bg-surface text-sm outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 md:hidden" />

      <button
        onClick={toggleTheme}
        className="relative w-14 h-8 rounded-full bg-surface-offset border border-divider p-1 transition-colors"
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

      <button className="relative p-2.5 rounded-full hover:bg-surface-offset transition-colors">
        <Bell className="w-5 h-5" />
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent"
        />
      </button>

      {user && (
        <div className="flex items-center gap-2 pl-2 border-l border-divider">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-semibold leading-tight">{user.name}</div>
            <div className="text-[11px] text-muted-foreground">{roleLabel[user.role]}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold text-sm ring-2 ring-primary/30">
            {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <button
            onClick={() => { logout(); router.navigate({ to: "/login" }); }}
            className="p-2 rounded-full hover:bg-surface-offset"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}

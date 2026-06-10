import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  tone?: "primary" | "secondary" | "accent" | "success" | "warning";
  delay?: number;
}

const toneClasses: Record<string, string> = {
  primary: "bg-primary-highlight text-primary",
  secondary: "bg-secondary/15 text-secondary",
  accent: "bg-accent/15 text-accent",
  success: "bg-success-highlight text-success",
  warning: "bg-warning-highlight text-warning",
};

export function KpiCard({ label, value, prefix = "", suffix = "", icon: Icon, tone = "primary", delay = 0 }: Props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const duration = 900;
    let raf = 0;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      setCount(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="card-soft card-soft-hover p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
        <div className={`w-10 h-10 rounded-2xl grid place-items-center ${toneClasses[tone]}`}>
          <Icon className="w-5 h-5" strokeWidth={2.25} />
        </div>
      </div>
      <div className="font-display font-extrabold text-3xl tabular-nums leading-none">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
    </motion.div>
  );
}

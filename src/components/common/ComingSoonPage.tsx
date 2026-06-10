import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";

export function ComingSoonPage({
  title, subtitle, icon: Icon, blurb,
}: { title: string; subtitle: string; icon: LucideIcon; blurb: string }) {
  return (
    <AppShell>
      <PageHeader title={title} subtitle={subtitle} />
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="card-soft p-10 text-center max-w-2xl mx-auto mt-12"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-primary-highlight text-primary grid place-items-center"
        >
          <Icon className="w-10 h-10" strokeWidth={1.75} />
        </motion.div>
        <h2 className="font-display font-extrabold text-2xl mb-2">{title}</h2>
        <p className="text-muted-foreground text-sm">{blurb}</p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning-highlight text-warning text-xs font-semibold">
          Module in Phase 2
        </div>
      </motion.div>
    </AppShell>
  );
}

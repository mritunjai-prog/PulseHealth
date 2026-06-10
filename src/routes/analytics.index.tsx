import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { MiniBarChart, MiniLineChart, MiniDonut } from "@/components/charts/Charts";
import { revenueByDept, monthlyRegistrations, staffDistribution } from "@/data/demo";
import { motion } from "framer-motion";

export const Route = createFileRoute("/analytics/")({
  head: () => ({ meta: [{ title: "Analytics — MedCore" }] }),
  component: () => (
    <AppShell>
      <PageHeader title="Analytics & Reports" subtitle="Operational and financial insights across the network." />
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-2">Revenue by Department</h3>
          <MiniBarChart data={revenueByDept} xKey="dept" yKey="revenue" />
        </motion.div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.05}} className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-2">Patient Volume</h3>
          <MiniLineChart data={monthlyRegistrations} xKey="month" yKey="patients" />
        </motion.div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-2">Staff Mix</h3>
          <MiniDonut data={staffDistribution} />
        </motion.div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15}} className="card-soft p-5">
          <h3 className="font-display font-bold text-lg mb-3">AI Insights</h3>
          <div className="space-y-3">
            {[
              { title: "ER wait time up 12%", desc: "Possible cause: staff shortage on Mondays." },
              { title: "Cardiology revenue trending +18%", desc: "Driven by increased procedure volume." },
              { title: "Insulin stock below reorder", desc: "Predicted stockout in 9 days." },
            ].map((c, i) => (
              <div key={i} className="p-3 rounded-2xl bg-primary-highlight/50 border border-primary/20">
                <div className="font-semibold text-sm mb-0.5">{c.title}</div>
                <div className="text-xs text-muted-foreground">{c.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppShell>
  ),
});

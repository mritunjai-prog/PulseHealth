import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope, Brain, FileSearch, MessageSquare, ClipboardCheck,
  TrendingUp, Package, Siren, ShieldCheck, Heart, Mic, FileText,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { AiCopilotPanel } from "@/components/ai/AiCopilotPanel";

export const Route = createFileRoute("/ai-suite/")({
  head: () => ({ meta: [{ title: "AI Suite — MedCore" }] }),
  component: AiSuite,
});

const agents = [
  { icon: Stethoscope, name: "Symptom Triage", desc: "Patient describes symptoms — AI suggests triage level.", runs: 482 },
  { icon: Brain, name: "Clinical Summary", desc: "Generate structured patient summary from EMR.", runs: 312 },
  { icon: MessageSquare, name: "Doctor Copilot", desc: "Clinical decision support, drug interactions, ICD codes.", runs: 1240 },
  { icon: FileText, name: "Prescription Explainer", desc: "Patient-friendly explanation of prescriptions.", runs: 268 },
  { icon: FileSearch, name: "Report Analyzer", desc: "Flag abnormal lab values and suggest significance.", runs: 198 },
  { icon: TrendingUp, name: "Revenue Analytics", desc: "Natural language queries over hospital revenue.", runs: 84 },
  { icon: Package, name: "Inventory Forecasting", desc: "Predicted 30-day stock needs per medicine.", runs: 56 },
  { icon: Siren, name: "ER Prioritization", desc: "Re-rank ER queue based on vitals + symptoms.", runs: 174 },
  { icon: ShieldCheck, name: "Claim Validator", desc: "Validate insurance claim completeness.", runs: 92 },
  { icon: Heart, name: "Sentiment Analyzer", desc: "Patient feedback sentiment + action items.", runs: 47 },
  { icon: Mic, name: "Voice Receptionist", desc: "Voice-driven appointment booking (simulated).", runs: 31 },
  { icon: ClipboardCheck, name: "Discharge Summary", desc: "Auto-compose discharge from admission data.", runs: 118 },
];

function AiSuite() {
  const [open, setOpen] = useState(false);

  return (
    <AppShell>
      <PageHeader title="AI Suite" subtitle="12 specialized AI agents to augment clinical and operational workflows." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agents.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="card-soft card-soft-hover p-5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-highlight text-primary grid place-items-center mb-3">
                <Icon className="w-6 h-6" strokeWidth={2} />
              </div>
              <h3 className="font-display font-bold text-base mb-1">{a.name}</h3>
              <p className="text-xs text-muted-foreground flex-1 mb-3">{a.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground tabular-nums">{a.runs} runs today</span>
                <button onClick={() => setOpen(true)} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition active:scale-95">
                  Launch
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AiCopilotPanel open={open} onClose={() => setOpen(false)} />
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope, Brain, FileSearch, MessageSquare, ClipboardCheck,
  TrendingUp, Package, Siren, ShieldCheck, Heart, Mic, FileText,
  ArrowLeft, Send
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { useAuth } from "@/store/auth";
import ReactMarkdown from 'react-markdown';

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

function DedicatedAgentView({ agent, onBack }: { agent: any, onBack: () => void }) {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: "ai", content: `I am the **${agent.name}** agent. How can I assist you today?` }
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const Icon = agent.icon;

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;
    
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setStreaming(true);
    
    let full = "I'm sorry, I couldn't connect to the AI engine.";
    try {
      const res = await fetch('http://localhost:3000/ai/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, context: agent.name })
      });
      if (res.ok) {
        const data = await res.json();
        full = data.response;
      }
    } catch (e) {
      console.error(e);
    }

    setMessages((m) => [...m, { role: "ai", content: "" }]);
    
    const chunkSize = 3;
    for (let i = 0; i <= full.length; i += chunkSize) {
      await new Promise((r) => setTimeout(r, 10));
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "ai", content: full.slice(0, i) };
        return copy;
      });
    }
    setStreaming(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-[calc(100vh-140px)] bg-surface border border-divider shadow-xl rounded-2xl overflow-hidden"
    >
      <div className="p-4 md:p-6 border-b border-divider flex items-center gap-4 bg-surface-offset">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-divider transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="w-12 h-12 rounded-xl bg-primary-highlight text-primary grid place-items-center">
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold">{agent.name}</h2>
          <p className="text-sm text-muted-foreground">{agent.desc}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={
                m.role === "user"
                  ? "max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-br-md px-5 py-3 shadow-md"
                  : "max-w-[95%] bg-surface-offset rounded-2xl rounded-bl-md px-6 py-4 border border-divider shadow-sm"
              }
            >
              {m.role === "ai" ? (
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:mb-3 prose-ul:my-2 prose-li:my-0.5">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                  {streaming && i === messages.length - 1 && <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse align-middle" />}
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{m.content}</div>
              )}
            </motion.div>
          </div>
        ))}
        {streaming && messages[messages.length - 1]?.content === "" && (
          <div className="flex gap-1.5 px-6">
            {[0, 1, 2].map((i) => (
              <motion.div key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                className="w-2.5 h-2.5 rounded-full bg-primary opacity-60"
              />
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 md:p-6 bg-surface-offset border-t border-divider">
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="max-w-4xl mx-auto flex gap-3 items-center bg-surface p-1.5 rounded-full border border-divider focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
          <input
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${agent.name} a question...`}
            className="flex-1 px-5 py-3 bg-transparent outline-none md:text-lg"
          />
          <button type="submit" disabled={streaming || !input.trim()}
            className="w-12 h-12 mr-1 rounded-full bg-primary text-primary-foreground grid place-items-center disabled:opacity-50 active:scale-95 transition-transform shadow-md">
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function AiSuite() {
  const { user } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const role = user?.role || 'PATIENT';

  let visibleAgents = agents;
  if (role === 'HOSPITAL_ADMIN') {
    visibleAgents = agents.filter(a => ['Symptom Triage', 'Clinical Summary', 'Doctor Copilot', 'Revenue Analytics', 'Inventory Forecasting', 'Claim Validator', 'Sentiment Analyzer'].includes(a.name));
  } else if (role === 'DOCTOR') {
    visibleAgents = agents.filter(a => ['Symptom Triage', 'Clinical Summary', 'Doctor Copilot', 'Prescription Explainer', 'Report Analyzer', 'Discharge Summary'].includes(a.name));
  } else if (role === 'NURSE') {
    visibleAgents = agents.filter(a => ['Symptom Triage', 'Clinical Summary', 'ER Prioritization'].includes(a.name));
  } else if (role === 'PATIENT') {
    visibleAgents = agents.filter(a => ['Symptom Triage', 'Prescription Explainer', 'Voice Receptionist'].includes(a.name));
  } else if (role === 'RECEPTIONIST') {
    visibleAgents = agents.filter(a => ['Voice Receptionist'].includes(a.name));
  } else if (role === 'LAB_TECHNICIAN') {
    visibleAgents = agents.filter(a => ['Report Analyzer'].includes(a.name));
  } else if (role === 'PHARMACIST') {
    visibleAgents = agents.filter(a => ['Inventory Forecasting', 'Prescription Explainer'].includes(a.name));
  } else if (role === 'BILLING_EXECUTIVE' || role === 'INSURANCE_COORDINATOR') {
    visibleAgents = agents.filter(a => ['Revenue Analytics', 'Claim Validator'].includes(a.name));
  } else if (role === 'ED_MANAGER') {
    visibleAgents = agents.filter(a => ['ER Prioritization', 'Symptom Triage'].includes(a.name));
  }

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        {selectedAgent ? (
          <motion.div key="agent-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DedicatedAgentView agent={selectedAgent} onBack={() => setSelectedAgent(null)} />
          </motion.div>
        ) : (
          <motion.div key="grid-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PageHeader title="AI Suite" subtitle="Specialized AI agents filtered and tailored to your clinical role." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleAgents.map((a, i) => {
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
                      <button onClick={() => setSelectedAgent(a)} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition active:scale-95">
                        Launch
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}

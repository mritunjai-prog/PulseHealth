import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, Copy, X } from "lucide-react";

type Msg = { role: "user" | "ai"; content: string };

const QUICK_CHIPS = [
  "Summarize patient",
  "Differential diagnosis",
  "Drug interactions",
  "Suggest ICD codes",
];

const FAKE_RESPONSES: Record<string, string> = {
  default:
    "Based on the patient's recent vitals and history, blood pressure has trended slightly upward over the past week. Consider reinforcing lifestyle modifications and reviewing current antihypertensive dosing. No drug interactions detected with current medications.",
  "Summarize patient":
    "**Patient Summary**\n\n45-year-old female with a 5-year history of Type 2 diabetes and recent diagnosis of stage 1 hypertension. HbA1c trending down (7.2 → 6.8) over 3 months on metformin 500mg BID. BP averaging 132/84. Compliant with medications. No active complaints.",
  "Differential diagnosis":
    "**Top differentials for chest pain in a 58y male with HTN:**\n1. Acute Coronary Syndrome — order ECG, troponin\n2. Stable angina — exercise tolerance test\n3. GERD — trial PPI\n4. Musculoskeletal — palpation, reproducibility\n\nRecommend immediate ECG and serial troponins.",
  "Drug interactions":
    "**No major interactions detected.**\n\nMinor: Metformin + contrast agents — hold metformin 48h post-IV contrast.\n\nMonitor renal function before/after procedures.",
  "Suggest ICD codes":
    "**Suggested ICD-10 codes:**\n• E11.9 — Type 2 diabetes without complications\n• I10 — Essential hypertension\n• Z79.4 — Long-term use of insulin",
};

interface Props { open: boolean; onClose: () => void; }

export function AiCopilotPanel({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", content: "Hi Dr. Shah 👋 I'm your AI Copilot. Ask me anything about this patient or pick a quick action below." },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setStreaming(true);
    const full = FAKE_RESPONSES[text] ?? FAKE_RESPONSES.default;
    setMessages((m) => [...m, { role: "ai", content: "" }]);
    for (let i = 1; i <= full.length; i++) {
      await new Promise((r) => setTimeout(r, 12));
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "ai", content: full.slice(0, i) };
        return copy;
      });
    }
    setStreaming(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-surface border-l border-divider z-50 flex flex-col"
          >
            <div className="p-4 border-b border-divider flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground grid place-items-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-display font-bold">AI Copilot</div>
                <div className="text-xs text-muted-foreground">Clinical decision support</div>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-offset">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={
                      m.role === "user"
                        ? "max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 text-sm"
                        : "max-w-[90%] bg-surface-offset rounded-2xl rounded-bl-md px-4 py-3 text-sm border border-divider"
                    }
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{m.content}{streaming && i === messages.length - 1 && <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />}</div>
                    {m.role === "ai" && m.content && !streaming && (
                      <div className="mt-2 pt-2 border-t border-divider flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>⚠️ Advisory only — clinical judgment required.</span>
                        <button className="p-1 hover:text-primary" onClick={() => navigator.clipboard.writeText(m.content)}>
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
              {streaming && messages[messages.length - 1]?.content === "" && (
                <div className="flex gap-1 px-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-divider space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {QUICK_CHIPS.map((c) => (
                  <button key={c} onClick={() => send(c)}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary-highlight text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    {c}
                  </button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the copilot…"
                  className="flex-1 px-4 py-2.5 rounded-full bg-surface-offset border border-transparent focus:border-primary focus:bg-surface text-sm outline-none"
                />
                <button type="submit" disabled={streaming}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center disabled:opacity-50 active:scale-95 transition">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

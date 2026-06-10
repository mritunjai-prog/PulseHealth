import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, X, Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from 'react-markdown';

type Msg = { role: "user" | "ai"; content: string };

const QUICK_CHIPS = [
  "Summarize patient",
  "Differential diagnosis",
  "Drug interactions",
  "Suggest ICD codes",
];

interface Props { open: boolean; onClose: () => void; }

export function AiCopilotPanel({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", content: "Hi Dr. Shah 👋 I'm your AI Copilot. Ask me anything about this patient or pick a quick action below." },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  // Web Speech API Integration
  const SpeechRecognition = typeof window !== 'undefined' ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (SpeechRecognition && !recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) setInput(prev => (prev ? prev + " " : "") + finalTranscript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, [SpeechRecognition]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    }
  };

  const speak = (text: string) => {
    if (!autoSpeak) return;
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#_`]/g, ''); // Remove basic markdown characters for speech
      const utterance = new SpeechSynthesisUtterance(cleanText);
      window.speechSynthesis.speak(utterance);
    }
  };

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); }
    
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setStreaming(true);
    
    let full = "I'm sorry, I couldn't connect to the AI engine.";
    try {
      const res = await fetch('http://localhost:3000/ai/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });
      if (res.ok) {
        const data = await res.json();
        full = data.response;
      }
    } catch (e) {
      console.error(e);
    }

    setMessages((m) => [...m, { role: "ai", content: "" }]);
    
    // Smooth streaming effect
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
    speak(full); // Read the full response aloud when done
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
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-surface border-l border-divider z-50 flex flex-col shadow-2xl"
          >
            <div className="p-4 border-b border-divider flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground grid place-items-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold">AI Copilot</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    Clinical Voice Assistant
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setAutoSpeak(!autoSpeak);
                    if (autoSpeak) window.speechSynthesis?.cancel();
                  }} 
                  className={`p-2 rounded-full transition-colors ${autoSpeak ? 'bg-primary/10 text-primary' : 'bg-surface-offset text-muted-foreground hover:bg-surface-offset/80'}`}
                  title={autoSpeak ? "Voice Output On" : "Voice Output Off"}
                >
                  {autoSpeak ? <Volume2 className="w-4 h-4"/> : <VolumeX className="w-4 h-4"/>}
                </button>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-offset">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={
                      m.role === "user"
                        ? "max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 text-sm"
                        : "max-w-[95%] bg-surface-offset rounded-2xl rounded-bl-md px-4 py-3 text-sm border border-divider shadow-sm"
                    }
                  >
                    {m.role === "ai" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-display prose-headings:font-bold prose-headings:mb-2 prose-ul:my-2 prose-li:my-0.5">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                        {streaming && i === messages.length - 1 && <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse align-middle" />}
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
                    )}
                    
                    {m.role === "ai" && m.content && !streaming && (
                      <div className="mt-3 pt-2 border-t border-divider/50 flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="opacity-80">⚠️ AI Advisory — verify clinically.</span>
                        <button className="p-1.5 hover:text-primary transition-colors bg-surface rounded-md border border-divider" onClick={() => navigator.clipboard.writeText(m.content)}>
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
                      className="w-2 h-2 rounded-full bg-primary opacity-60"
                    />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-divider space-y-3 bg-surface z-10">
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                {QUICK_CHIPS.map((c) => (
                  <button key={c} onClick={() => send(c)}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary-highlight text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap">
                    {c}
                  </button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 items-center bg-surface-offset p-1 rounded-full border border-divider focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Type or speak a clinical query…"
                  className="flex-1 px-4 py-2 bg-transparent text-sm outline-none"
                />
                
                <button 
                  type="button" 
                  onClick={toggleListen}
                  className={`w-9 h-9 rounded-full grid place-items-center transition-all ${isListening ? 'bg-destructive text-destructive-foreground animate-pulse' : 'text-muted-foreground hover:bg-surface hover:text-foreground'}`}
                  title="Speak"
                >
                  {isListening ? <MicOff className="w-4 h-4"/> : <Mic className="w-4 h-4"/>}
                </button>

                <button type="submit" disabled={streaming || !input.trim()}
                  className="w-9 h-9 mr-0.5 rounded-full bg-primary text-primary-foreground grid place-items-center disabled:opacity-50 active:scale-95 transition-transform">
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

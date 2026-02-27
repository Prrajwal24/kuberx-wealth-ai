import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Activity, Sparkles, Cpu, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const mockResponses: Record<string, string> = {
  default: "Protocol analysis complete. Based on your current vector — ₹85K inflow, ₹42K outflow, and ₹3.2L reserves — I recommend recalibrating your SIP by +₹5,000/cycle. This will accelerate your acquisition target by 14%. Your liquidity buffer (7.6 months) is optimal for high-yield diversification.",
};

export default function Advisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Neural link established. I am your KuberX Intelligence Hub. I have mapped your financial lattice and am ready for optimization queries. Ask me about capital allocation, tax mitigation, or wealth projections." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: mockResponses.default,
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto space-y-8 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Intelligence Node 01</span>
          </div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase whitespace-nowrap">
            Neural <span className="text-primary glow-text-violet">Advisor</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Personalized wealth optimization via neural data mapping.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="glass-cyber px-4 py-2 rounded-xl flex items-center gap-3 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-success animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Core Sync: 100%</span>
          </div>
        </div>
      </div>

      {/* Chat Terminal */}
      <div className="flex-1 glass-cyber border neon-border-violet rounded-[2.5rem] p-1 relative overflow-hidden flex flex-col">
        {/* Background Scan Line */}
        <motion.div
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-x-0 h-[2px] bg-primary/5 z-0 pointer-events-none"
        />

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-6 p-8 relative z-10 custom-scrollbar"
        >
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded-[2rem] px-8 py-5 text-sm leading-relaxed relative ${msg.role === 'user'
                    ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(192,132,252,0.3)] border border-primary/20'
                    : 'glass-cyber border border-white/10 text-white/90 shadow-xl'
                  }`}>
                  {msg.role === 'assistant' && (
                    <div className="absolute -left-3 -top-3 w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20 backdrop-blur-md">
                      <Bot size={16} className="text-primary" />
                    </div>
                  )}
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Interface */}
        <div className="p-8 bg-black/40 border-t border-white/5 relative z-20">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative group">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="PROMPT: Query allocation metrics or tax mitigations..."
                className="h-16 bg-white/5 border-white/5 text-white rounded-2xl pl-6 pr-14 text-sm font-medium focus:border-primary/40 focus:bg-white/10 transition-all placeholder:text-white/20"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                <Sparkles size={18} className="text-primary" />
              </div>
            </div>
            <Button
              onClick={handleSend}
              className="h-16 w-16 bg-primary text-black rounded-2xl shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_40px_rgba(192,132,252,0.5)] transition-all shrink-0 group"
            >
              <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-6 opacity-30 justify-center">
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-primary" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">End-to-End Encrypted</span>
            </div>
            <div className="w-[1px] h-3 bg-white/20" />
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-secondary" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Neural Engine v4.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

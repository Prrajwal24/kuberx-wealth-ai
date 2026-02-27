import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const mockResponses: Record<string, string> = {
  default: "Based on your profile — ₹85K salary, ₹42K expenses, and ₹3.2L savings — I'd recommend increasing your SIP by ₹5,000/month to accelerate your home-buying goal. Your emergency fund at 7.6 months is healthy, so you can afford to be slightly more aggressive with investments.",
};

export default function Advisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi Arjun! I'm your KuberX AI advisor. I have access to your financial profile and can help you make smarter money decisions. Ask me anything about savings, investments, tax planning, or budgeting!" },
  ]);
  const [input, setInput] = useState("");

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
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      <div className="mb-4">
        <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
          <Bot className="text-primary" /> AI Financial Advisor
        </h1>
        <p className="text-muted-foreground mt-1">Personalized advice powered by your data</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${msg.role === 'user'
                ? 'gold-gradient text-primary-foreground'
                : 'glass-card border border-border text-foreground'
              }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 pt-4 border-t border-border">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about investments, savings, tax..."
          className="bg-secondary border-border text-foreground"
        />
        <Button onClick={handleSend} className="gold-gradient text-primary-foreground px-4">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}

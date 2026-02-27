import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AITutor() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hi! I'm your Academy AI Tutor. Ask me anything about the lessons, like 'What is inflation?' or 'How does compound interest work?'" }
    ]);
    const [input, setInput] = useState("");

    const responses: Record<string, string> = {
        "inflation": "Inflation is when prices go up and your money's value goes down. It's like your ₹100 note buying fewer chocolates today than it did last year!",
        "compound interest": "Compound interest is 'interest on interest'. It's when you earn interest not just on your original money, but also on the interest that has already been added!",
        "mutual fund": "A mutual fund pools money from many people to buy a variety of stocks or bonds. It's a great way for beginners to diversify their investments.",
        "credit score": "A credit score (like CIBIL) is a rating of how well you handle borrowed money. Higher scores make it easier to get loans at lower interest rates!",
        "budget": "A budget is a plan for your money. It helps you track what comes in (income) and what goes out (expenses) so you can save more for your goals."
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        const term = Object.keys(responses).find(k => input.toLowerCase().includes(k));
        const reply = term ? responses[term] : "That's a great question! In simple terms, this concept is focused on helping you build long-term wealth by making smart choices with your income.";

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant' as const, content: reply }]);
        }, 800);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full gold-gradient shadow-lg flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform z-50 glow-gold"
            >
                <Bot size={28} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="fixed bottom-24 right-6 w-80 sm:w-96 glass-card border border-primary/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                        style={{ maxHeight: '500px' }}
                    >
                        <div className="p-4 gold-gradient flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bot className="text-primary-foreground" size={20} />
                                <span className="font-display font-bold text-primary-foreground">AI Academy Tutor</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] bg-background/50">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'gold-gradient text-primary-foreground'
                                            : 'bg-secondary border border-border text-foreground shadow-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-3 border-t border-border bg-background">
                            <div className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask a finance question..."
                                    className="bg-secondary border-border h-10 text-sm"
                                />
                                <Button onClick={handleSend} size="icon" className="gold-gradient w-10 h-10 shrink-0">
                                    <Send size={16} className="text-primary-foreground" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

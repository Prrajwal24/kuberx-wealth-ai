import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Bot, Send, X, MessageCircle, Sparkles, TrendingUp, IndianRupee, GraduationCap, Zap, Info, HelpCircle, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockUser } from '@/lib/mockData';
import { academyLevels } from '@/lib/academyData';

interface Message {
    role: 'yaksha' | 'user';
    content: string;
}

export default function YakshaMascot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isWaving, setIsWaving] = useState(false);
    const [isCelebrating, setIsCelebrating] = useState(false);
    const location = useLocation();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Global event listener for celebrations
    useEffect(() => {
        const handleCelebrate = (e: any) => {
            setIsCelebrating(true);
            const msg = e.detail?.message || "Impressive! Your discipline builds a stronger future. Keep it up!";
            setMessages(prev => [...prev, { role: 'yaksha', content: msg }]);
            setIsOpen(true);
            setTimeout(() => setIsCelebrating(false), 3000);
        };

        window.addEventListener('yaksha-celebrate', handleCelebrate);
        return () => window.removeEventListener('yaksha-celebrate', handleCelebrate);
    }, []);

    // Suggested questions based on location
    const getSuggestions = () => {
        if (location.pathname.includes('/learn')) return ["Explain finance concepts", "How to earn XP?", "Help with quiz"];
        if (location.pathname.includes('/advisor') || location.pathname.includes('/buy-check')) return ["Can I afford an iPhone?", "Investment advice", "Budgeting help"];
        return ["Show financial tips", "How am I doing today?", "Daily motivation"];
    };

    // Contextual initial greeting
    useEffect(() => {
        // Read user data from localStorage for personalization
        const userData = JSON.parse(localStorage.getItem('kuberx_academy_user') || '{}');
        let greeting = "Hello! I am Yaksha, your financial guide. Ask me anything about money, investing, or budgeting.";

        if (location.pathname.includes('/learn')) {
            greeting = "Greetings, learner! I'm here to help you master the levels. If a concept like 'Compound Interest' puzzles you, just ask!";
        } else if (location.pathname.includes('/expenses') || location.pathname.includes('/dashboard')) {
            const budgetExceeded = 1500; // Mock budget data
            if (budgetExceeded > 1000) {
                greeting = `Be careful, guardian! You've spent ₹${budgetExceeded} on shopping this week. Saving ₹1,000 more this month will help you reach your goals faster!`;
            }
        }

        setMessages([{ role: 'yaksha', content: greeting }]);

        // Animate waving on page change
        setIsWaving(true);
        setTimeout(() => setIsWaving(false), 2000);
    }, [location.pathname]);

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

        // Personality-driven response logic
        setTimeout(() => {
            const prompt = input.toLowerCase();
            let reply = "A wise question! Wealth grows with patience and knowledge. How else can I guide you?";

            if (prompt.includes("iphone") || prompt.includes("ps5") || prompt.includes("buy")) {
                reply = "Before you open the treasury, consider: is this a 'Need' or a 'Want'? Investing that money could turn ₹70,000 into ₹1 Lakh in a few years with the right strategy!";
            } else if (prompt.includes("invest") || prompt.includes("10,000")) {
                reply = "₹10,000 is a great seed! For a beginner, a 'Nifty 50 Index Fund' is like planting an oak tree – it grows steadily over time. Would you like to see a simulation?";
            } else if (prompt.includes("compound interest")) {
                reply = "Ah, the 8th wonder! It's when your money makes money, and then *that* money makes money too. It's like a snowball rolling down a golden mountain!";
            } else if (prompt.includes("budget")) {
                reply = "Budgeting is the map to your fortune. Try the 50/30/20 rule: 50% for Needs, 30% for Wants, and 20% for your future self! Your current profile shows you are doing well with 45% on needs.";
            } else if (prompt.includes("quiz") || prompt.includes("answer")) {
                reply = "Focus on the basics! Remember: Inflation is the thief that steals your buying power. Always invest at a rate higher than 6%!";
            } else if (prompt.includes("motivation") || prompt.includes("doing")) {
                reply = "You're close to unlocking the next academy level! One more lesson today and you'll be a step closer to financial freedom.";
            }

            setMessages(prev => [...prev, { role: 'yaksha', content: reply }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Celebration Effects */}
            <AnimatePresence>
                {isCelebrating && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 0, x: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    y: -100 - Math.random() * 200,
                                    x: (Math.random() - 0.5) * 200,
                                    rotate: Math.random() * 360
                                }}
                                className="absolute"
                            >
                                <IndianRupee className="text-warning" size={20 + Math.random() * 20} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-80 sm:w-96 glass-cyber neon-border-violet rounded-[2rem] shadow-2xl overflow-hidden flex flex-col backdrop-blur-3xl"
                        style={{ maxHeight: '550px' }}
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#0a0a0c] flex items-center justify-center border border-white/10 overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                                    <YakshaSVG isAnimated={false} />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-white leading-tight">YAKSHA <span className="text-[10px] text-primary ml-1 uppercase tracking-widest">v2.0</span></h3>
                                    <div className="flex items-center gap-2">
                                        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-success rounded-full" />
                                        <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.2em]">Neural Link Stable</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-all">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 min-h-[350px] bg-black/20 scrollbar-hide">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, y: 0, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[13px] leading-relaxed shadow-lg ${msg.role === 'user'
                                        ? 'bg-primary text-black font-bold border border-white/20'
                                        : 'glass-cyber border border-white/5 text-white/90'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="p-4 bg-white/5 border-t border-white/10 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-3">
                            {getSuggestions().map(s => (
                                <button
                                    key={s}
                                    onClick={() => { setInput(s); setTimeout(handleSend, 100); }}
                                    className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-[9px] font-bold text-white/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all uppercase tracking-[0.2em]"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <div className="flex gap-3">
                                <Input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder="Execute query..."
                                    className="bg-black/40 border-white/10 h-12 text-sm focus:ring-primary/40 rounded-xl"
                                />
                                <Button onClick={handleSend} size="icon" className="w-12 h-12 rounded-xl bg-primary hover:bg-primary/80 transition-all shadow-[0_0_20px_rgba(192,132,252,0.3)] group">
                                    <Send size={18} className="text-black group-hover:translate-x-0.5 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mascot Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 overflow-hidden
          ${isOpen ? 'bg-[#0a0a0c] border border-white/20 rotate-90 scale-90' : 'bg-[#0a0a0c] border border-primary/40 shadow-[0_0_30px_rgba(192,132,252,0.2)]'}
        `}
            >
                {/* Background Glow */}
                {!isOpen && (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-primary blur-2xl"
                    />
                )}

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={32} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="mascot"
                            initial={{ scale: 0, rotate: 45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -45 }}
                            className="relative z-10"
                        >
                            <YakshaSVG isWaving={isWaving} />

                            {/* Status Indicator */}
                            <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full blur-[1px] animate-pulse" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}

function YakshaSVG({ isWaving = false, isAnimated = true }: { isWaving?: boolean; isAnimated?: boolean }) {
    return (
        <motion.svg
            width="48"
            height="48"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={isAnimated ? {
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0]
            } : {}}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <defs>
                <radialGradient id="cyberGold" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </radialGradient>
                <filter id="neon_glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Spectral Body */}
            <motion.path
                d="M50 15C30 15 20 30 20 45C20 65 50 85 50 85C50 85 80 65 80 45C80 30 70 15 50 15Z"
                fill="url(#cyberGold)"
                fillOpacity="0.8"
                filter="url(#neon_glow)"
                animate={{ fillOpacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Holographic Face */}
            <circle cx="40" cy="45" r="3" fill="#ffffff" />
            <circle cx="60" cy="45" r="3" fill="#ffffff" />
            <path d="M42 55Q50 62 58 55" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

            {/* Neural Pulses */}
            <motion.circle
                cx="50" cy="45" r="25"
                stroke="#c084fc"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Data Particulates */}
            <motion.circle cx="15" cy="25" r="1.5" fill="#c084fc" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <motion.circle cx="85" cy="35" r="1.5" fill="#3b82f6" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />

            {/* Signaling Arm */}
            {isWaving && (
                <motion.path
                    d="M80 45L95 35"
                    stroke="#c084fc"
                    strokeWidth="4"
                    strokeLinecap="round"
                    animate={{ rotate: [-15, 15, -15], x: [0, 2, 0] }}
                    transition={{ duration: 0.4, repeat: 5 }}
                    style={{ originX: '80px', originY: '45px' }}
                />
            )}
        </motion.svg>
    );
}

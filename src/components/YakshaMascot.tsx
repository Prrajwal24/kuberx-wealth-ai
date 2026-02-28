import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Bot, Send, X, MessageCircle, Sparkles, TrendingUp, IndianRupee, GraduationCap, Zap, Info, HelpCircle } from 'lucide-react';
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
        if (location.pathname.includes('/ping') || location.pathname.includes('/should-i-buy-this') || location.pathname.includes('/shield')) return ["How much insurance do I need?", "Emergency fund guide", "Protection score help", "Budgeting help"];
        if (location.pathname.includes('/intel')) return ["What is Nifty 50?", "Is Gold a safe investment?", "Bitcoin vs Gold", "How does SIP work?"];
        return ["Show financial tips", "How am I doing today?", "Daily motivation"];
    };

    // Contextual initial greeting
    useEffect(() => {
        // Read user data from localStorage for personalization
        const userData = JSON.parse(localStorage.getItem('kuberx_academy_user') || '{}');
        let greeting = "Hello! I am Yaksha, your financial guide. Ask me anything about money, investing, or budgeting.";

        if (location.pathname.includes('/learn')) {
            greeting = "Greetings, learner! I'm here to help you master the levels. If a concept like 'Compound Interest' puzzles you, just ask!";
        } else if (location.pathname.includes('/intel')) {
            greeting = "Welcome to the Intel hub. Here, we track the pulse of the economy. Gold represents stability, while the Nifty 50 reflects the strength of our industry. Use the growth simulator to see your future wealth!";
        } else if (location.pathname.includes('/shield')) {
            greeting = "Welcome to your financial fortress. A solid shield consists of an emergency fund and the right insurance. I've analyzed your protection gaps – let's fix them!";
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
                        className="mb-4 w-80 sm:w-96 glass-card border border-primary/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ maxHeight: '500px' }}
                    >
                        {/* Header */}
                        <div className="p-4 gold-gradient flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 overflow-hidden">
                                    <YakshaSVG isAnimated={false} />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-primary-foreground leading-tight">Yaksha</h3>
                                    <p className="text-[10px] text-primary-foreground/80 uppercase font-bold tracking-widest">Financial Guardian</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] bg-background/40 scrollbar-hide">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'gold-gradient text-primary-foreground shadow-md'
                                        : 'bg-secondary border border-border text-foreground shadow-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="p-3 bg-secondary/30 border-t border-border overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-2">
                            {getSuggestions().map(s => (
                                <button
                                    key={s}
                                    onClick={() => { setInput(s); setTimeout(handleSend, 100); }}
                                    className="px-3 py-1.5 rounded-full border border-primary/20 bg-background/50 text-[10px] font-bold text-primary hover:bg-primary/10 transition-colors uppercase tracking-wider"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-border bg-background/80 backdrop-blur-md">
                            <div className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask your guardian..."
                                    className="bg-secondary border-border h-10 text-sm focus-visible:ring-primary/40"
                                />
                                <Button onClick={handleSend} size="icon" className="gold-gradient w-10 h-10 shrink-0 shadow-lg">
                                    <Send size={16} className="text-primary-foreground" />
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
                className={`group relative w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all duration-500
          ${isOpen ? 'bg-secondary border-2 border-border rotate-90' : 'gold-gradient border-2 border-white/20 glow-gold'}
        `}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={28} className="text-foreground" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="mascot"
                            initial={{ scale: 0, rotate: 45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -45 }}
                            className="relative"
                        >
                            <YakshaSVG isWaving={isWaving} />

                            {/* Notification Bubble */}
                            {!isOpen && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-background"
                                >
                                    1
                                </motion.div>
                            )}
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
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={isAnimated ? {
                y: [0, -10, 0],
            } : {}}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {/* Body / Aura */}
            <defs>
                <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#D97706" />
                </radialGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Main Body */}
            <motion.path
                d="M50 20C35 20 25 35 25 50C25 70 50 85 50 85C50 85 75 70 75 50C75 35 65 20 50 20Z"
                fill="url(#goldGradient)"
                filter="url(#glow)"
            />

            {/* Face */}
            <circle cx="40" cy="45" r="4" fill="#6B21A8" />
            <circle cx="60" cy="45" r="4" fill="#6B21A8" />
            <path d="M42 55Q50 62 58 55" stroke="#6B21A8" strokeWidth="3" strokeLinecap="round" />

            {/* Sparkles */}
            <motion.circle
                cx="20" cy="30" r="2" fill="#FDE68A"
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle
                cx="80" cy="40" r="2" fill="#FDE68A"
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
            />

            {/* Waving Arm */}
            {isWaving && (
                <motion.path
                    d="M75 50L90 40"
                    stroke="#FBBF24"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [-20, 20, -20] }}
                    transition={{ duration: 0.5, repeat: 4 }}
                    style={{ originX: '75px', originY: '50px' }}
                />
            )}
        </motion.svg>
    );
}

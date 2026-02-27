import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, Activity, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const items = [
    { id: 1, name: "Monthly Rent", category: "Needs" },
    { id: 2, name: "Groceries", category: "Needs" },
    { id: 3, name: "Netflix Subscription", category: "Wants" },
    { id: 4, name: "Emergency Fund Deposit", category: "Savings" },
    { id: 5, name: "Dining Out", category: "Wants" },
    { id: 6, name: "Utility Bills", category: "Needs" },
    { id: 7, name: "Mutual Fund SIP", category: "Savings" },
    { id: 8, name: "Designer Shoes", category: "Wants" },
];

export default function ExpenseSortGame({ onComplete }: { onComplete: (score: number) => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleSort = (category: string) => {
        if (feedback) return;

        const item = items[currentIndex];
        const isCorrect = item.category === category;

        if (isCorrect) {
            setCorrectCount(c => c + 1);
            setFeedback({ isCorrect: true, message: "PROTOCOL_VERIFIED: CORRECT CLASSIFICATION" });
        } else {
            setFeedback({ isCorrect: false, message: "SYSTEM_ERROR: INVALID VECTOR CATEGORY" });
        }

        setTimeout(() => {
            setFeedback(null);
            if (currentIndex < items.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setIsFinished(true);
            }
        }, 1500);
    };

    if (isFinished) {
        return (
            <div className="text-center space-y-8 p-10 glass-cyber border neon-border-violet rounded-[2rem]">
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_30px_rgba(192,132,252,0.2)]">
                    <CheckCircle2 className="text-primary w-12 h-12" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Analysis <span className="text-primary">Complete</span></h2>
                    <p className="text-muted-foreground text-lg font-bold">Accuracy: <span className="text-white font-black text-2xl">{correctCount}/{items.length}</span></p>
                </div>
                <Button onClick={() => onComplete(correctCount * 12.5)} className="w-full h-16 bg-primary text-black font-display font-black text-xl rounded-2xl shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_40px_rgba(192,132,252,0.5)] transition-all">
                    EXTRACT NODE XP
                </Button>
            </div>
        );
    }

    const currentItem = items[currentIndex];

    return (
        <div className="space-y-10 p-2 h-[500px] flex flex-col justify-center relative overflow-hidden">
            {/* Background Pulse */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="text-center space-y-10 relative z-10">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Resource Classification: {currentIndex + 1} / {items.length}</p>
                    <div className="w-32 h-[1px] bg-primary/20" />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentItem.id}
                        initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                        exit={{ scale: 1.2, opacity: 0, rotateX: -20 }}
                        className={`text-4xl font-display font-black p-12 rounded-[2.5rem] border-2 shadow-2xl backdrop-blur-xl transition-all duration-500 ${feedback
                                ? feedback.isCorrect
                                    ? 'border-success bg-success/10 text-success shadow-success/20'
                                    : 'border-pink-500 bg-pink-500/10 text-pink-500 shadow-pink-500/20'
                                : 'glass-cyber border-primary/40 text-white'
                            }`}
                    >
                        <div className="absolute top-0 right-10 p-2 bg-black/40 border-x border-b border-white/5 text-[8px] font-mono opacity-40">ITEM_ID_{currentItem.id}</div>
                        {currentItem.name.toUpperCase()}

                        {/* Scanning Line */}
                        {!feedback && (
                            <motion.div
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-x-0 h-[1px] bg-primary/40 z-20"
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="h-4">
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className={`text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-2 ${feedback.isCorrect ? 'text-success' : 'text-pink-500'}`}
                            >
                                <Activity size={12} className="animate-pulse" /> {feedback.message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 relative z-10">
                {[
                    { id: "Needs", icon: <Cpu size={18} />, color: "primary" },
                    { id: "Wants", icon: <Zap size={18} />, color: "pink-500" },
                    { id: "Savings", icon: <Activity size={18} />, color: "success" }
                ].map((cat) => (
                    <motion.button
                        key={cat.id}
                        whileHover={{ scale: 1.05, translateY: -5 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!!feedback}
                        onClick={() => handleSort(cat.id)}
                        className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300
                           ${cat.id === 'Needs' ? 'border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-black' :
                                cat.id === 'Wants' ? 'border-pink-500/20 bg-pink-500/5 text-pink-500 hover:bg-pink-500 hover:text-white' :
                                    'border-success/20 bg-success/5 text-success hover:bg-success hover:text-black'
                            }
                        `}
                    >
                        {cat.icon}
                        <span className="text-[10px] font-black uppercase tracking-widest">{cat.id}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

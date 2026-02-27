import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShieldCheck, AlertTriangle, IndianRupee, Cpu, Zap, Activity, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const applicants = [
    { name: "Rahul", score: 820, income: 120000, loan: 500000, purpose: "Home Renovation", isGood: true },
    { name: "Sneha", score: 450, income: 40000, loan: 200000, purpose: "Luxury Trip", isGood: false },
    { name: "Amit", score: 710, income: 85000, loan: 100000, purpose: "Education", isGood: true },
    { name: "Priya", score: 580, income: 30000, loan: 50000, purpose: "Buy Crypto", isGood: false },
];

export default function BankManagerGame({ onComplete }: { onComplete: (score: number) => void }) {
    const [idx, setIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'fail' } | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const handleDecision = (approve: boolean) => {
        const person = applicants[idx];
        const correct = approve === person.isGood;

        if (correct) {
            setScore(s => s + 25);
            setFeedback({ msg: "NEURAL MATCH: RISK PROFILE OPTIMAL", type: 'success' });
        } else {
            setFeedback({
                msg: approve ? "PROTOCOL BREACH: HIGH DEFAULT PROBABILITY" : "LOSS OF YIELD: RELIABLE ENTITY REJECTED",
                type: 'fail'
            });
        }

        setTimeout(() => {
            setFeedback(null);
            if (idx < applicants.length - 1) setIdx(i => i + 1);
            else setIsFinished(true);
        }, 2500);
    };

    if (isFinished) {
        return (
            <div className="text-center space-y-8 p-10 glass-cyber border neon-border-violet rounded-[2rem]">
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_30px_rgba(192,132,252,0.2)]">
                    <CheckCircle className="text-primary w-12 h-12" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Evaluation <span className="text-primary">Complete</span></h2>
                    <p className="text-muted-foreground text-lg font-bold">Neural Accuracy: <span className="text-white font-black text-2xl">{score}%</span></p>
                </div>
                <Button onClick={() => onComplete(score)} className="w-full h-16 bg-primary text-black font-display font-black text-xl rounded-2xl shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_40px_rgba(192,132,252,0.5)] transition-all">
                    LOG DATA & EXIT
                </Button>
            </div>
        );
    }

    const p = applicants[idx];

    return (
        <div className="space-y-8 p-2">
            {/* Status Bar */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Interface Active</span>
                </div>
                <div className="text-[10px] font-mono text-white/40">SUBJECT: {idx + 1}/{applicants.length}</div>
            </div>

            {/* Feedback Message */}
            <div className="h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            className={`px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${feedback.type === 'success' ? 'bg-success/20 border-success/40 text-success shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'bg-pink-500/20 border-pink-500/40 text-pink-500 shadow-[0_0_20px_rgba(244,114,182,0.2)]'
                                }`}
                        >
                            {feedback.msg}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Applicant Dossier */}
            <motion.div
                key={idx}
                initial={{ opacity: 0, rotateX: 10, y: 20 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                className="glass-cyber border neon-border-violet rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden group"
            >
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                        <User size={36} className="text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-mono text-primary animate-pulse tracking-widest">AWAITING DECISION</p>
                        <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">{p.name}</h3>
                        <p className="text-xs text-muted-foreground font-medium italic underline decoration-primary/30">Vector: {p.purpose}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 relative z-10">
                    <div className="glass-cyber bg-white/5 p-5 rounded-2xl border border-white/5 space-y-2">
                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Credit Health</p>
                        <div className={`text-2xl font-display font-black flex items-center gap-2 ${p.score > 700 ? 'text-success' : p.score > 600 ? 'text-secondary' : 'text-pink-500'}`}>
                            <ShieldCheck size={20} /> {p.score}
                        </div>
                    </div>
                    <div className="glass-cyber bg-white/5 p-5 rounded-2xl border border-white/5 space-y-2">
                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Revenue Flow</p>
                        <p className="text-2xl font-display font-black text-white">₹{p.income.toLocaleString()}</p>
                    </div>
                    <div className="glass-cyber bg-white/5 p-5 rounded-2xl border border-white/5 space-y-2">
                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Capital Request</p>
                        <p className="text-2xl font-display font-black text-white">₹{p.loan.toLocaleString()}</p>
                    </div>
                    <div className="glass-cyber bg-white/10 p-5 rounded-2xl border border-primary/20 space-y-2 group/risk">
                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Risk Index</p>
                        <p className={`text-2xl font-display font-black flex items-center gap-2 ${p.isGood ? 'text-success' : 'text-pink-500'}`}>
                            <Activity size={20} className="animate-pulse" /> {p.score > 700 ? 'SECURE' : 'CRITICAL'}
                        </p>
                    </div>
                </div>

                {/* Scanning Light Effect */}
                <motion.div
                    animate={{ top: ['-10%', '110%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-x-0 h-[2px] bg-primary/20 shadow-[0_0_15px_rgba(192,132,252,0.8)] z-20"
                />
            </motion.div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-6 pt-4">
                <Button
                    variant="outline"
                    onClick={() => handleDecision(false)}
                    disabled={!!feedback}
                    className="h-20 rounded-2xl border-pink-500/20 bg-pink-500/5 text-pink-500 hover:bg-pink-500 hover:text-white font-display font-black text-xl tracking-tighter uppercase transition-all flex items-center gap-3 active:scale-[0.98]"
                >
                    <XCircle size={24} /> REJECT ENTITY
                </Button>
                <Button
                    onClick={() => handleDecision(true)}
                    disabled={!!feedback}
                    className="h-20 rounded-2xl bg-primary text-black font-display font-black text-xl tracking-tighter uppercase shadow-[0_0_30px_rgba(192,132,252,0.3)] hover:shadow-[0_0_50px_rgba(192,132,252,0.5)] transition-all flex items-center gap-3 active:scale-[0.98]"
                >
                    <CheckCircle size={24} /> AUTHORIZE LOAN
                </Button>
            </div>
        </div>
    );
}

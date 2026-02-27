import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShieldCheck, AlertTriangle, IndianRupee } from 'lucide-react';
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
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const handleDecision = (approve: boolean) => {
        const person = applicants[idx];
        const correct = approve === person.isGood;

        if (correct) {
            setScore(s => s + 25);
            setFeedback("✅ Good Decision! Applicant profile matches risk criteria.");
        } else {
            setFeedback(approve ? "❌ Bad Debt! Applicant has low score and high risk." : "❌ Missed Opportunity! Applicant was highly reliable.");
        }

        setTimeout(() => {
            setFeedback(null);
            if (idx < applicants.length - 1) setIdx(i => i + 1);
            else setIsFinished(true);
        }, 2000);
    };

    if (isFinished) {
        return (
            <div className="text-center space-y-6 p-8">
                <h2 className="text-2xl font-display font-bold text-foreground">Manager Review Complete</h2>
                <p className="text-muted-foreground text-lg">Bank Rating: <span className="text-primary font-bold">{score}% Excellent</span></p>
                <Button onClick={() => onComplete(score)} className="w-full gold-gradient py-6 font-bold uppercase tracking-widest">Submit Results</Button>
            </div>
        );
    }

    const p = applicants[idx];

    return (
        <div className="space-y-6 p-4">
            <div className="text-center h-10">
                {feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium text-primary uppercase">{feedback}</motion.p>}
            </div>

            <div className="glass-card border border-primary/20 rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"><User size={24} /></div>
                    <div>
                        <h3 className="font-bold text-lg text-foreground">{p.name}</h3>
                        <p className="text-xs text-muted-foreground">Loan Purpose: {p.purpose}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Credit Score</p>
                        <div className={`text-xl font-bold flex items-center gap-2 ${p.score > 700 ? 'text-success' : p.score > 600 ? 'text-warning' : 'text-destructive'}`}>
                            <ShieldCheck size={18} /> {p.score}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Monthly Income</p>
                        <p className="text-xl font-bold text-foreground">₹{p.income.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Requested Loan</p>
                        <p className="text-xl font-bold text-foreground">₹{p.loan.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Risk Level</p>
                        <p className={`text-xl font-bold flex items-center gap-2 ${p.isGood ? 'text-success' : 'text-destructive'}`}>
                            <AlertTriangle size={18} /> {p.score > 700 ? 'Low' : 'High'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => handleDecision(false)} className="h-16 border-destructive/20 text-destructive hover:bg-destructive/10 font-bold">REJECT</Button>
                <Button onClick={() => handleDecision(true)} className="h-16 gold-gradient text-primary-foreground font-bold">APPROVE</Button>
            </div>
        </div>
    );
}

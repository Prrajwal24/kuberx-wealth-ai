import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
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
            setFeedback({ isCorrect: true, message: `Correct! ${item.name} is a ${item.category}.` });
        } else {
            setFeedback({ isCorrect: false, message: `Not quite! ${item.name} is actually a ${item.category}.` });
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
            <div className="text-center space-y-6 p-8">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="text-success w-10 h-10" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">Sorting Complete!</h2>
                <p className="text-muted-foreground">You correctly categorized {correctCount} out of {items.length} expenses.</p>
                <Button onClick={() => onComplete(correctCount * 10)} className="w-full gold-gradient py-6 font-bold uppercase tracking-widest">
                    Finish & Earn XP
                </Button>
            </div>
        );
    }

    const currentItem = items[currentIndex];

    return (
        <div className="space-y-8 p-4 h-[400px] flex flex-col justify-center">
            <div className="text-center space-y-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Item {currentIndex + 1} of {items.length}</p>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentItem.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        className={`text-3xl font-display font-bold p-8 rounded-2xl border-2 ${feedback ? (feedback.isCorrect ? 'border-success bg-success/10 text-success' : 'border-destructive bg-destructive/10 text-destructive') : 'border-primary bg-primary/5 text-foreground'
                            }`}
                    >
                        {currentItem.name}
                    </motion.div>
                </AnimatePresence>

                <div className="h-6">
                    {feedback && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm font-medium ${feedback.isCorrect ? 'text-success' : 'text-destructive'}`}>
                            {feedback.message}
                        </motion.p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {["Needs", "Wants", "Savings"].map((cat) => (
                    <Button
                        key={cat}
                        disabled={!!feedback}
                        onClick={() => handleSort(cat)}
                        className={`h-20 rounded-xl border-2 text-sm font-bold transition-all ${cat === 'Needs' ? 'border-primary/20 hover:bg-primary/10' :
                            cat === 'Wants' ? 'border-warning/20 hover:bg-warning/10' :
                                'border-success/20 hover:bg-success/10'
                            }`}
                        variant="outline"
                    >
                        {cat}
                    </Button>
                ))}
            </div>
        </div>
    );
}

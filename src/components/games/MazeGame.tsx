import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Lock, Key, Zap, Activity, Cpu, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

const questions = [
    { question: "Inflation reduces your buying power.", options: ["True", "False"], correct: 0 },
    { question: "Mutual funds are managed by experts.", options: ["True", "False"], correct: 0 },
    { question: "Highest point of CIBIL score is 900.", options: ["True", "False"], correct: 0 },
    { question: "Stocks are ownership in a company.", options: ["True", "False"], correct: 0 },
    { question: "Simple interest is better than compound.", options: ["True", "False"], correct: 1 },
];

export default function MazeGame({ onComplete }: { onComplete: (score: number) => void }) {
    const [position, setPosition] = useState(0);
    const [isAnswering, setIsAnswering] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const handleMove = () => {
        setIsAnswering(true);
    };

    const handleAnswer = (idx: number) => {
        if (idx === questions[position].correct) {
            if (position < questions.length - 1) {
                setPosition(p => p + 1);
                setIsAnswering(false);
            } else {
                setIsFinished(true);
            }
        } else {
            // Shake effect or reset
            setTimeout(() => setIsAnswering(false), 500);
        }
    };

    if (isFinished) {
        return (
            <div className="text-center space-y-8 p-10 glass-cyber border neon-border-violet rounded-[2rem]">
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_50px_rgba(192,132,252,0.4)] animate-bounce">
                    <Trophy className="text-primary w-12 h-12" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">Maze <span className="text-primary">Decoded</span></h2>
                    <p className="text-muted-foreground text-lg font-bold">Neural Protocol: <span className="text-white font-black">FINANCE_MASTER_v1</span></p>
                </div>
                <Button onClick={() => onComplete(200)} className="w-full h-16 bg-primary text-black font-display font-black text-xl rounded-2xl shadow-[0_0_30px_rgba(192,132,252,0.3)]">
                    COLLECT FINAL BOUNTY
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-10 p-2 flex flex-col items-center relative overflow-hidden">
            {/* Status Header */}
            <div className="flex items-center gap-4 text-center">
                <div className="h-1 w-12 bg-primary/20" />
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Grid Sequence: {position + 1} / 9</p>
                <div className="h-1 w-12 bg-primary/20" />
            </div>

            {/* Maze Grid */}
            <div className="relative w-80 h-80 grid grid-cols-3 grid-rows-3 gap-4 glass-cyber p-4 rounded-[2rem] border border-white/5 shadow-2xl">
                {[...Array(9)].map((_, i) => {
                    const isPlayer = i === position;
                    const isGoal = i === 8;
                    const isPath = i <= position || i === 8;

                    return (
                        <motion.div
                            key={i}
                            layout
                            className={`rounded-2xl flex items-center justify-center border-2 transition-all duration-500 relative overflow-hidden ${isPlayer ? 'bg-primary border-primary shadow-[0_0_30px_rgba(192,132,252,0.5)] scale-110 z-10' :
                                    isGoal ? 'bg-white/5 border-white/10 border-dashed opacity-40' :
                                        isPath ? 'bg-primary/5 border-primary/10' : 'bg-black/40 border-white/5 opacity-10'
                                }`}
                        >
                            {isPlayer ? (
                                <div className="relative">
                                    <Key size={32} className="text-black animate-pulse" />
                                    <div className="absolute inset-0 bg-white blur-md opacity-40" />
                                </div>
                            ) :
                                isGoal ? <Trophy size={24} className="text-white opacity-20" /> :
                                    !isPath ? <Lock size={18} className="text-muted-foreground/30" /> :
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />}

                            {/* Scanning Light on target */}
                            {isPlayer && (
                                <motion.div
                                    animate={{ top: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-x-0 h-[2px] bg-white/40 pointer-events-none"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                {isAnswering ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="w-full max-w-md glass-cyber border neon-border-violet rounded-[2.5rem] p-10 space-y-8 shadow-2xl relative z-20"
                    >
                        <div className="flex items-center gap-3 justify-center">
                            <ShieldAlert size={18} className="text-primary animate-pulse" />
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Verification Required</p>
                        </div>

                        <h3 className="text-2xl font-display font-black text-white text-center leading-tight uppercase">{questions[position].question}</h3>

                        <div className="grid grid-cols-2 gap-4">
                            {questions[position].options.map((opt, i) => (
                                <Button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    className="h-16 bg-white/5 border-white/5 hover:bg-primary hover:text-black hover:border-primary text-sm font-black rounded-2xl transition-all active:scale-[0.98]"
                                >
                                    {opt.toUpperCase()}
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="controls"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-8"
                    >
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium italic opacity-60">"Authorize the next vector by resolving the financial paradox"</p>
                            <div className="h-[1px] w-24 bg-white/10 mx-auto" />
                        </div>

                        <Button
                            onClick={handleMove}
                            className="h-20 px-14 bg-primary text-black font-display font-black text-xl rounded-[1.5rem] shadow-[0_0_30px_rgba(192,132,252,0.3)] hover:shadow-[0_0_50px_rgba(192,132,252,0.6)] transition-all group"
                        >
                            EXECUTE JUMP <ChevronRight className="ml-3 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

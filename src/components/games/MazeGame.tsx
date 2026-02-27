import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Lock, Key } from 'lucide-react';
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
            // Wrong answer - visual shake or restart position?
            // For simplicity, just reset answering state with a delay
            setTimeout(() => setIsAnswering(false), 500);
        }
    };

    if (isFinished) {
        return (
            <div className="text-center space-y-6 p-8">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Trophy className="text-primary w-10 h-10" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">Escaped the Maze!</h2>
                <p className="text-muted-foreground">You are now a Finance Master.</p>
                <Button onClick={() => onComplete(200)} className="w-full gold-gradient py-6 font-bold uppercase">Greatest Reward</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-4 flex flex-col items-center">
            <div className="relative w-64 h-64 grid grid-cols-3 grid-rows-3 gap-2 bg-secondary/20 p-2 rounded-xl border border-border">
                {[...Array(9)].map((_, i) => {
                    const isPlayer = i === position;
                    const isGoal = i === 8;
                    const isPath = i <= position || i === 8;

                    return (
                        <div key={i} className={`rounded-lg flex items-center justify-center border-2 transition-all duration-500 ${isPlayer ? 'bg-primary border-primary glow-gold scale-110 z-10' :
                                isGoal ? 'bg-success/20 border-success/40 border-dashed' :
                                    isPath ? 'bg-primary/10 border-primary/20' : 'bg-background/40 border-border opacity-50'
                            }`}>
                            {isPlayer ? <Key size={24} className="text-primary-foreground animate-bounce" /> :
                                isGoal ? <Trophy size={20} className="text-success opacity-40" /> :
                                    !isPath ? <Lock size={16} className="text-muted-foreground" /> : null}
                        </div>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                {isAnswering ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full space-y-4 text-center"
                    >
                        <p className="text-sm font-bold text-primary uppercase">Financial Barrier!</p>
                        <h3 className="text-lg font-display font-bold text-foreground">{questions[position].question}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {questions[position].options.map((opt, i) => (
                                <Button key={i} onClick={() => handleAnswer(i)} variant="outline" className="h-14 font-bold border-primary/20 hover:bg-primary/5">{opt}</Button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="controls"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-4"
                    >
                        <p className="text-sm text-muted-foreground italic">"Correct answers unlock the path forward"</p>
                        <Button onClick={handleMove} className="gold-gradient px-12 py-6 font-bold text-lg rounded-2xl shadow-xl">
                            MOVE FORWARD <ChevronRight className="ml-2" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

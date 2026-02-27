import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AcademyQuiz as QuizType } from '@/lib/academyData';

interface QuizModalProps {
    quiz: QuizType;
    onComplete: (score: number) => void;
    onClose: () => void;
}

export default function AcademyQuiz({ quiz, onComplete, onClose }: QuizModalProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleOptionSelect = (index: number) => {
        if (isCorrect !== null) return;

        setSelectedOption(index);
        const correct = index === quiz.questions[currentQuestion].correctAnswer;
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            setIsFinished(true);
        }
    };

    if (isFinished) {
        return (
            <div className="text-center space-y-6 p-8">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-primary w-10 h-10" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">Quiz Completed!</h2>
                <p className="text-muted-foreground text-lg">
                    You scored <span className="text-primary font-bold">{score}/{quiz.questions.length}</span>
                </p>
                <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                    <p className="text-sm font-medium text-foreground">Reward earned:</p>
                    <p className="text-xl font-bold gold-text">+{quiz.xpValue} XP</p>
                </div>
                <Button onClick={() => onComplete(score)} className="w-full gold-gradient text-primary-foreground font-bold py-6">
                    Claim Rewards
                </Button>
            </div>
        );
    }

    const q = quiz.questions[currentQuestion];

    return (
        <div className="space-y-8 p-4">
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Question {currentQuestion + 1}/{quiz.questions.length}</span>
                    <span>Score: {score}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-display font-bold text-foreground leading-tight">
                    {q.question}
                </h3>

                <div className="grid gap-3">
                    {q.options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        const isAnswer = q.correctAnswer === idx;

                        let variantClass = "border-border bg-secondary/30 text-foreground hover:bg-secondary/50";
                        if (isCorrect !== null) {
                            if (isAnswer) variantClass = "border-success bg-success/10 text-success glow-success";
                            else if (isSelected) variantClass = "border-destructive bg-destructive/10 text-destructive";
                        } else if (isSelected) {
                            variantClass = "border-primary bg-primary/10 text-primary glow-gold";
                        }

                        return (
                            <button
                                key={idx}
                                disabled={isCorrect !== null}
                                onClick={() => handleOptionSelect(idx)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${variantClass}`}
                            >
                                <span className="font-medium">{option}</span>
                                {isCorrect !== null && isAnswer && <CheckCircle2 size={18} />}
                                {isCorrect !== null && isSelected && !isAnswer && <XCircle size={18} />}
                            </button>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {isCorrect !== null && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <Button onClick={handleNext} className="w-full h-14 rounded-xl gold-gradient font-bold text-lg shadow-lg">
                            {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

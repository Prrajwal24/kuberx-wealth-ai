import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AcademyQuiz as QuizType } from '@/lib/academyData';

interface QuizModalProps {
    quiz: QuizType;
    onComplete: (score: number) => void;
    onClose: () => void;
}

export default function AcademyQuiz({ quiz, onComplete, onClose }: QuizModalProps) {
    // State exact matching requirements
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [score, setScore] = useState(0);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizPassed, setQuizPassed] = useState(false);

    const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
        if (quizSubmitted) return; // Prevent changing answer after submission
        setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
    };

    const handleSubmitQuiz = () => {
        // Calculate score
        let currentScore = 0;
        quiz.questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correctAnswer) {
                currentScore++;
            }
        });

        setScore(currentScore);
        const passed = currentScore >= 2;
        setQuizPassed(passed);
        setQuizSubmitted(true);
    };

    const handleTryAgain = () => {
        setSelectedAnswers({});
        setScore(0);
        setQuizSubmitted(false);
        setQuizPassed(false);
    };

    const allAnswered = Object.keys(selectedAnswers).length === quiz.questions.length;

    return (
        <div className="space-y-8 p-4">
            <div className="space-y-12">
                {quiz.questions.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-4">
                        <div className="flex justify-between items-baseline gap-4">
                            <h3 className="text-xl font-display font-bold text-foreground leading-tight flex-1">
                                <span className="text-primary mr-2">{qIdx + 1}.</span> {q.question}
                            </h3>
                            {quizSubmitted && (
                                <div className="shrink-0">
                                    {selectedAnswers[qIdx] === q.correctAnswer ?
                                        <CheckCircle2 className="text-success w-6 h-6" /> :
                                        <XCircle className="text-destructive w-6 h-6" />
                                    }
                                </div>
                            )}
                        </div>

                        <div className="grid gap-3">
                            {q.options.map((option, oIdx) => {
                                const isSelected = selectedAnswers[qIdx] === oIdx;
                                const isCorrectAnswer = q.correctAnswer === oIdx;

                                let variantClass = "border-border bg-secondary/30 text-foreground hover:bg-secondary/50";

                                if (quizSubmitted) {
                                    // Visual Feedback after submission
                                    if (isCorrectAnswer) {
                                        // Always highlight the correct answer in green
                                        variantClass = "border-success bg-success/10 text-success glow-success";
                                    } else if (isSelected && !isCorrectAnswer) {
                                        // If they selected this and it's wrong, highlight red
                                        variantClass = "border-destructive bg-destructive/10 text-destructive";
                                    } else {
                                        // Unselected wrong answers just fade out a bit
                                        variantClass = "border-border/50 bg-secondary/10 text-muted-foreground";
                                    }
                                } else if (isSelected) {
                                    // Visual Feedback before submission
                                    variantClass = "border-primary bg-primary/10 text-primary glow-gold shadow-[inset_0_0_20px_rgba(234,179,8,0.1)]";
                                }

                                return (
                                    <button
                                        key={oIdx}
                                        disabled={quizSubmitted}
                                        onClick={() => handleOptionSelect(qIdx, oIdx)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${variantClass}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0
                                                ${quizSubmitted ?
                                                    (isCorrectAnswer ? 'border-success bg-success text-success-foreground' :
                                                        (isSelected ? 'border-destructive bg-destructive text-destructive-foreground' : 'border-muted'))
                                                    : (isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted')}
                                            `}>
                                                {quizSubmitted && isCorrectAnswer && <CheckCircle2 size={14} />}
                                                {quizSubmitted && isSelected && !isCorrectAnswer && <XCircle size={14} />}
                                                {!quizSubmitted && isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />}
                                            </div>
                                            <span className="font-medium text-[15px]">{option}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {!quizSubmitted ? (
                    <motion.div
                        key="submit-btn"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="pt-6 border-t border-border mt-8"
                    >
                        <Button
                            disabled={!allAnswered}
                            onClick={handleSubmitQuiz}
                            className="w-full h-14 rounded-xl gold-gradient font-bold text-lg shadow-lg relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center">
                                Submit Quiz
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 pt-8 border-t border-border space-y-6"
                    >
                        <div className={`rounded-2xl p-6 border-2 text-center relative overflow-hidden ${quizPassed ? 'border-success/50 bg-success/5' : 'border-destructive/30 bg-destructive/5'}`}>
                            {quizPassed && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-10 -right-10 text-success opacity-10"
                                >
                                    <Award size={120} />
                                </motion.div>
                            )}

                            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                                Quiz Result
                            </h2>
                            <p className="text-xl font-medium text-muted-foreground mb-4">
                                Score: <span className={`font-bold ${quizPassed ? 'text-success' : 'text-destructive'}`}>{score} / {quiz.questions.length}</span>
                            </p>

                            <div className={`text-2xl font-black tracking-wide uppercase ${quizPassed ? 'text-success glow-success' : 'text-destructive'}`}>
                                {quizPassed ? "Level Completed 🎉" : "Try Again"}
                            </div>

                            {quizPassed && (
                                <div className="mt-4 inline-flex items-center gap-2 bg-success/20 text-success px-4 py-1.5 rounded-full text-sm font-bold">
                                    +{quiz.xpValue} XP Earned
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            {!quizPassed ? (
                                <Button
                                    variant="outline"
                                    onClick={handleTryAgain}
                                    className="w-full h-14 border-primary/50 text-foreground hover:bg-primary/10 font-bold text-lg"
                                >
                                    <RotateCcw className="w-5 h-5 mr-2" />
                                    Try Again
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => onComplete(score)}
                                    className="w-full h-14 gold-gradient text-primary-foreground font-bold text-lg shadow-lg"
                                >
                                    Next Level
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

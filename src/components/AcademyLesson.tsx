import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AcademyLesson as LessonType } from '@/lib/academyData';

interface AcademyLessonProps {
    lesson: LessonType;
    isCompleted: boolean;
    onComplete: () => void;
}

export default function AcademyLesson({ lesson, isCompleted, onComplete }: AcademyLessonProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 text-primary">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-foreground">{lesson.title}</h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">+{lesson.xpValue} XP Rewards</p>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-border bg-secondary/10">
                <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap italic">
                    "{lesson.content}"
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {!isCompleted ? (
                    <Button
                        onClick={onComplete}
                        className="w-full py-8 text-lg font-bold gold-gradient text-primary-foreground shadow-lg hover:scale-[1.02] transition-transform"
                    >
                        I've Understood This <ArrowRight className="ml-2" />
                    </Button>
                ) : (
                    <div className="w-full py-4 px-6 rounded-xl border border-success/30 bg-success/5 flex items-center justify-center gap-2 text-success font-bold">
                        <CheckCircle size={20} />
                        Lesson Completed
                    </div>
                )}

                <p className="text-center text-xs text-muted-foreground">
                    Complete individual lessons to unlock the Level Game and Quiz!
                </p>
            </div>
        </div>
    );
}

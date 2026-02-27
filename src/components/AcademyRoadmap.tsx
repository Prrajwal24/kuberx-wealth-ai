import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Star, Play, Trophy } from 'lucide-react';
import { AcademyLevel } from '@/lib/academyData';
import { UserProfile } from '@/lib/mockData';

interface AcademyRoadmapProps {
    levels: AcademyLevel[];
    user: UserProfile;
    onSelectLevel: (level: number) => void;
}

export default function AcademyRoadmap({ levels, user, onSelectLevel }: AcademyRoadmapProps) {
    return (
        <div className="relative py-12 px-4 space-y-24">
            {/* Background connecting line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent z-0" />

            {levels.map((level, idx) => {
                const isCompleted = user.completedAcademyLevels.includes(level.level);
                const prevLevelCompleted = level.level === 1 || user.completedAcademyLevels.includes(level.level - 1);
                const isLocked = !prevLevelCompleted;
                const isCurrent = prevLevelCompleted && !isCompleted;

                return (
                    <motion.div
                        key={level.level}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {/* Level Icon Node */}
                        <button
                            disabled={isLocked}
                            onClick={() => onSelectLevel(level.level)}
                            className={`
                relative w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500
                ${isCompleted ? 'bg-success/20 border-2 border-success text-success shadow-[0_0_20px_rgba(34,197,94,0.3)]' :
                                    isLocked ? 'bg-sidebar border-2 border-border text-muted-foreground grayscale' :
                                        'gold-gradient text-primary-foreground border-2 border-white/20 shadow-[0_0_25px_rgba(251,191,36,0.4)] scale-110'}
                ${!isLocked && 'hover:scale-105 active:scale-95'}
              `}
                        >
                            {isCompleted ? (
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-success flex items-center justify-center animate-bounce">
                                    <Trophy size={14} className="text-white" />
                                </div>
                            ) : isLocked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl">
                                    <Lock size={20} />
                                </div>
                            )}

                            <div className="text-center">
                                <p className="text-[10px] font-bold uppercase tracking-tighter opacity-80">LVL {level.level}</p>
                                <Star size={24} className={isCurrent ? "animate-pulse" : ""} />
                                <p className="text-[10px] font-bold mt-1">START</p>
                            </div>
                        </button>

                        {/* Title & Stats */}
                        <div className="mt-6 text-center max-w-[200px]">
                            <h3 className={`font-display font-bold text-lg ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {level.title}
                            </h3>
                            {!isLocked && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    {isCompleted ? 'Level Mastered' : 'Progress: Incomplete'}
                                </p>
                            )}
                            {isLocked && <p className="text-[10px] font-bold text-destructive/60 uppercase mt-1">Completed Lvl {level.level - 1} to unlock</p>}
                        </div>

                        {/* Connecting Badge Goal */}
                        {idx < levels.length - 1 && (
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-secondary/80 border border-border px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                                <CheckCircle2 size={14} className="text-primary" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">{level.rewardNodes.badge}</span>
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}

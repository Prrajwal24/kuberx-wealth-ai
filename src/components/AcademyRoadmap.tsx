import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Star, Play, Trophy, Sparkles, Zap, Shield } from 'lucide-react';
import { AcademyLevel } from '@/lib/academyData';
import { UserProfile } from '@/lib/mockData';

interface AcademyRoadmapProps {
    levels: AcademyLevel[];
    user: UserProfile;
    onSelectLevel: (level: number) => void;
}

export default function AcademyRoadmap({ levels, user, onSelectLevel }: AcademyRoadmapProps) {
    return (
        <div className="relative py-20 px-6 max-w-4xl mx-auto overflow-hidden">
            {/* Background Holographic Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #c084fc 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative space-y-32">
                {levels.map((level, idx) => {
                    const isCompleted = user.completedAcademyLevels.includes(level.level);
                    const prevLevelCompleted = level.level === 1 || user.completedAcademyLevels.includes(level.level - 1);
                    const isLocked = !prevLevelCompleted;
                    const isCurrent = prevLevelCompleted && !isCompleted;

                    // Stagger alignment
                    const isEven = idx % 2 === 0;

                    return (
                        <div key={level.level} className={`flex flex-col ${isEven ? 'items-start md:ml-[15%]' : 'items-end md:mr-[15%]'} relative`}>
                            {/* Connection Link (Vertical/Diagonal) */}
                            {idx < levels.length - 1 && (
                                <div className={`absolute top-full h-32 w-px bg-gradient-to-b from-primary/50 to-transparent ${isEven ? 'left-12' : 'right-12'} hidden md:block`}>
                                    <motion.div
                                        animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        className="absolute w-2 h-2 -left-1 bg-primary rounded-full blur-[2px] shadow-[0_0_10px_#c084fc]"
                                    />
                                </div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: isEven ? -20 : 20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                {/* Level Card */}
                                <div className={`
                                    relative p-1 rounded-[2.5rem] transition-all duration-500
                                    ${isLocked ? 'grayscale opacity-50' : 'hover:scale-105 active:scale-95'}
                                `}>
                                    {/* Neon Outer Edge */}
                                    <div className={`absolute inset-0 rounded-[2.5rem] blur-[2px] ${isCompleted ? 'bg-secondary' : isLocked ? 'bg-white/5' : 'bg-primary'
                                        }`} />

                                    <button
                                        disabled={isLocked}
                                        onClick={() => onSelectLevel(level.level)}
                                        className="relative w-24 h-24 rounded-[2.3rem] bg-[#0a0a0c] flex items-center justify-center overflow-hidden border border-white/10 z-10"
                                    >
                                        {/* Dynamic Background Effect */}
                                        {!isLocked && (
                                            <div className={`absolute inset-0 opacity-20 ${isCompleted ? 'bg-secondary animate-pulse' : 'bg-primary animate-pulse'}`} />
                                        )}

                                        <div className="relative z-10 flex flex-col items-center">
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">LVL {level.level}</p>
                                            {isCompleted ? (
                                                <Trophy className="text-secondary" size={28} />
                                            ) : isLocked ? (
                                                <Lock className="text-white/20" size={24} />
                                            ) : (
                                                <Star className="text-primary animate-pulse" size={28} />
                                            )}
                                        </div>

                                        {/* Status Glow */}
                                        {isCurrent && (
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 bg-primary rounded-full blur-2xl"
                                            />
                                        )}
                                    </button>
                                </div>

                                {/* Label Content */}
                                <div className={`
                                    absolute top-1/2 -translate-y-1/2 w-48
                                    ${isEven ? 'left-32 text-left' : 'right-32 text-right'}
                                    hidden md:block
                                `}>
                                    <h3 className={`font-display font-bold text-xl leading-tight ${isLocked ? 'text-white/20' : 'text-white'}`}>
                                        {level.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2 opacity-60">
                                        <Sparkles size={12} className="text-primary" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase">
                                            {isCompleted ? 'MISSION SUCCESS' : isLocked ? 'ENCRYPTED' : 'SYSTEM OPTIMIZED'}
                                        </span>
                                    </div>
                                    {isCurrent && (
                                        <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit">
                                            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                            <span className="text-[9px] font-bold text-primary uppercase">Active Session</span>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Label */}
                                <div className="mt-4 text-center md:hidden">
                                    <h3 className={`font-display font-bold text-sm ${isLocked ? 'text-white/20' : 'text-white'}`}>{level.title}</h3>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

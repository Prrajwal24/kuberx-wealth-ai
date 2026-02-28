import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lock, Map, Star, Coins, Crown, Briefcase, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';
import { AcademyLevel } from '@/lib/academyData';
import { UserProfile } from '@/lib/mockData';

interface AcademyRoadmapProps {
    levels: AcademyLevel[];
    user: UserProfile;
    onSelectLevel: (level: number) => void;
}

export default function AcademyRoadmap({ levels, user, onSelectLevel }: AcademyRoadmapProps) {

    // Reverse levels so Level 5 is at the top, Level 1 at the bottom (like climbing a mountain)
    // Wait, typical progression is top to bottom. Let's keep it top down for scrolling ease.

    // Helper to get thematic icon per level
    const getLevelIcon = (levelNum: number) => {
        switch (levelNum) {
            case 1: return <Coins size={24} />;
            case 2: return <Briefcase size={24} />;
            case 3: return <ShieldCheck size={24} />;
            case 4: return <TrendingUp size={24} />;
            case 5: return <Landmark size={24} />;
            default: return <Star size={24} />;
        }
    };

    return (
        <div className="relative py-20 px-4 flex flex-col items-center w-full max-w-2xl mx-auto overflow-hidden min-h-[800px]">
            {/* Background Map Elements */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                <Map size={400} className="text-primary" />
            </div>

            {/* SVG Path connecting the nodes */}
            <div className="absolute top-[80px] bottom-[160px] left-1/2 -translate-x-1/2 w-[120px] pointer-events-none z-0">
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 1000">
                    <path
                        d="M 50,0 Q 100,100 50,200 T 50,400 T 50,600 T 50,800 T 50,1000"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="10 15"
                    />
                    <path
                        d="M 50,0 Q 100,100 50,200 T 50,400 T 50,600 T 50,800 T 50,1000"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="text-primary/40 glow-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all"
                        style={{ strokeDasharray: '1000', strokeDashoffset: `${1000 - (user.completedAcademyLevels.length / levels.length) * 1000}` }}
                    />
                </svg>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center gap-24">
                {levels.map((level, idx) => {
                    const isCompleted = user.completedAcademyLevels.includes(level.level);
                    const prevLevelCompleted = level.level === 1 || user.completedAcademyLevels.includes(level.level - 1);
                    const isLocked = !prevLevelCompleted;
                    const isCurrent = prevLevelCompleted && !isCompleted;

                    // Stagger nodes left and right for the journey effect
                    const xOffset = idx % 2 === 0 ? '-x-[30px]' : 'x-[30px]';
                    let alignmentClass = '';
                    if (idx % 2 === 0) alignmentClass = '-translate-x-8 md:-translate-x-12';
                    else alignmentClass = 'translate-x-8 md:translate-x-12';
                    if (idx === levels.length - 1) alignmentClass = ''; // Center the last node

                    return (
                        <motion.div
                            key={level.level}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className={`relative flex flex-col items-center group w-full ${alignmentClass}`}
                        >
                            {/* Decorative Elements around active nodes */}
                            {isCompleted && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -left-10 top-0 text-success opacity-40 animate-pulse"
                                >
                                    <Star size={20} />
                                </motion.div>
                            )}

                            {/* Node Label (floating above/beside) */}
                            <div className={`absolute -top-10 whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border backdrop-blur-md shadow-xl transition-all
                                ${isCompleted ? 'bg-success/20 border-success/50 text-success' :
                                    isCurrent ? 'bg-primary/20 border-primary text-primary glow-primary' :
                                        'bg-sidebar/80 border-white/10 text-muted-foreground'}
                            `}>
                                Level {level.level}
                            </div>

                            {/* Circular Node Button */}
                            <button
                                disabled={isLocked}
                                onClick={() => onSelectLevel(level.level)}
                                className={`
                                    relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl z-20 
                                    ${isCompleted ? 'bg-[#1a2e21] border-4 border-success text-success hover:scale-105' :
                                        isCurrent ? 'gold-gradient border-4 border-white text-primary-foreground hover:scale-110 ring-4 ring-primary/30 ring-offset-4 ring-offset-background' :
                                            'bg-secondary/50 border-4 border-white/10 text-muted-foreground grayscale cursor-not-allowed'}
                                `}
                            >
                                {/* Inner Node Icon */}
                                <div className={`transition-transform duration-300 ${!isLocked && 'group-hover:scale-110'} ${isCurrent && 'animate-bounce-subtle'}`}>
                                    {isLocked ? <Lock size={28} className="opacity-50" /> : getLevelIcon(level.level)}
                                </div>

                            </button>

                            {/* Node Title & Description under the node */}
                            <div className="absolute top-[110px] sm:top-[120px] w-64 text-center pointer-events-none">
                                <h3 className={`font-display font-bold text-lg leading-tight drop-shadow-md ${isLocked ? 'text-muted-foreground opacity-50' : isCurrent ? 'text-primary' : 'text-foreground'}`}>
                                    {level.title}
                                </h3>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Final Destination Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 relative flex flex-col items-center drop-shadow-2xl z-20"
                >
                    <div className="absolute inset-0 bg-primary opacity-20 blur-3xl rounded-full scale-150 animate-pulse" />
                    <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 border-4 border-white/40 flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.5)] transform rotate-12 hover:rotate-0 transition-all duration-500 hover:scale-110">
                        <Crown size={64} className="text-yellow-950/80 drop-shadow-md" />
                    </div>
                    <h2 className="mt-6 text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 tracking-widest uppercase glow-gold">
                        Financial Master
                    </h2>
                    <p className="text-yellow-500/80 font-bold tracking-widest uppercase text-xs mt-2">Final Destination</p>
                </motion.div>

            </div>
        </div>
    );
}

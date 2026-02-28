import React, { useRef, useEffect, useState } from 'react';
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
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Helper to get thematic icon per level
    const getLevelIcon = (levelNum: number) => {
        switch (levelNum) {
            case 1: return <Coins size={24} />;
            case 2: return <Briefcase size={24} />;
            case 3: return <TrendingUp size={24} />;
            case 4: return <Landmark size={24} />;
            default: return <Star size={24} />;
        }
    };

    const completedRatio = user.completedAcademyLevels.length / levels.length;

    // HORIZONTAL SETTINGS (Desktop)
    const containerWidth = (levels.length + 1) * 300 + 400;

    // VERTICAL SETTINGS (Mobile)
    const containerHeight = (levels.length + 1) * 250 + 200;

    return (
        <div
            ref={scrollContainerRef}
            className={`relative w-full custom-scrollbar bg-card/10 ${isMobile ? 'overflow-x-hidden overflow-y-auto' : 'overflow-x-auto overflow-y-hidden'}`}
            style={{ height: isMobile ? '800px' : '600px', maxHeight: '80vh' }}
        >
            <div
                className={`relative flex items-center ${isMobile ? 'flex-col py-12 w-full mx-auto' : 'h-full px-12 md:px-24'}`}
                style={isMobile ? { height: `${containerHeight}px` } : { width: `${containerWidth}px` }}
            >
                {/* Background Map Elements */}
                <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-around overflow-hidden">
                    <Map size={400} className="text-primary" />
                    {!isMobile && <Map size={400} className="text-primary" />}
                </div>

                {/* SVG Path connecting the nodes */}
                <div className={`absolute pointer-events-none z-0 ${isMobile ? 'top-0 bottom-0 left-1/2 -translate-x-1/2 w-[120px]' : 'left-0 right-0 h-[200px] top-1/2 -translate-y-1/2 px-24'}`}>
                    {isMobile ? (
                        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox={`0 0 100 ${containerHeight}`}>
                            <path
                                d={`M 50,50 
                                    ${levels.map((_, i) => {
                                    const y1 = i * 250 + 175;
                                    const x = i % 2 === 0 ? 100 : 0;
                                    const y2 = (i + 1) * 250 + 50;
                                    return `Q ${x},${y1} 50,${y2}`;
                                }).join(' ')}
                                    Q ${levels.length % 2 === 0 ? 100 : 0},${levels.length * 250 + 175} 50,${levels.length * 250 + 300}
                                `}
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="10 15"
                            />
                            <path
                                d={`M 50,50 
                                    ${levels.map((_, i) => {
                                    const y1 = i * 250 + 175;
                                    const x = i % 2 === 0 ? 100 : 0;
                                    const y2 = (i + 1) * 250 + 50;
                                    return `Q ${x},${y1} 50,${y2}`;
                                }).join(' ')}
                                    Q ${levels.length % 2 === 0 ? 100 : 0},${levels.length * 250 + 175} 50,${levels.length * 250 + 300}
                                `}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeLinecap="round"
                                className="text-primary/40 glow-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all"
                                style={{ strokeDasharray: '4000', strokeDashoffset: `${4000 - (completedRatio * 4000)}` }}
                            />
                        </svg>
                    ) : (
                        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox={`0 0 ${containerWidth} 200`}>
                            <path
                                d={`M 0,100 
                                    ${levels.map((_, i) => {
                                    const x1 = i * 300 + 150;
                                    const y = i % 2 === 0 ? 0 : 200;
                                    const x2 = (i + 1) * 300;
                                    return `Q ${x1},${y} ${x2},100`;
                                }).join(' ')}
                                    Q ${levels.length * 300 + 150},200 ${levels.length * 300 + 300},100
                                `}
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="10 15"
                            />
                            <path
                                d={`M 0,100 
                                    ${levels.map((_, i) => {
                                    const x1 = i * 300 + 150;
                                    const y = i % 2 === 0 ? 0 : 200;
                                    const x2 = (i + 1) * 300;
                                    return `Q ${x1},${y} ${x2},100`;
                                }).join(' ')}
                                    Q ${levels.length * 300 + 150},200 ${levels.length * 300 + 300},100
                                `}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeLinecap="round"
                                className="text-primary/40 glow-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all"
                                style={{ strokeDasharray: '4000', strokeDashoffset: `${4000 - (completedRatio * 4000)}` }}
                            />
                        </svg>
                    )}
                </div>

                {/* Nodes Container */}
                <div className={`relative z-10 flex ${isMobile ? 'flex-col items-center w-full h-full' : 'items-center h-full w-full'}`}>
                    {levels.map((level, idx) => {
                        const isCompleted = user.completedAcademyLevels.includes(level.level);
                        const prevLevelCompleted = level.level === 1 || user.completedAcademyLevels.includes(level.level - 1);
                        const isLocked = !prevLevelCompleted;
                        const isCurrent = prevLevelCompleted && !isCompleted;

                        // Layout staggering
                        const desktopYOffset = idx % 2 === 0 ? '-translate-y-24' : 'translate-y-24';
                        const mobileXOffset = idx % 2 === 0 ? '-translate-x-12' : 'translate-x-12';

                        return (
                            <motion.div
                                key={level.level}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className={`absolute flex flex-col items-center group`}
                                style={isMobile ? { top: `${idx * 250 + 50}px` } : { left: `${idx * 300}px` }}
                            >
                                <div className={`flex flex-col items-center ${isMobile ? mobileXOffset : desktopYOffset}`}>
                                    {/* Decorative Elements around active nodes */}
                                    {isCompleted && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-6 -right-6 text-success opacity-40 animate-pulse"
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
                                            relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl z-20 shrink-0
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
                                    <div className="absolute top-[120px] w-64 text-center pointer-events-none">
                                        <h3 className={`font-display font-bold text-lg leading-tight drop-shadow-md ${isLocked ? 'text-muted-foreground opacity-50' : isCurrent ? 'text-primary' : 'text-foreground'}`}>
                                            {level.title}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Final Destination Badge - Appears at the very end of the track */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="absolute flex flex-col items-center drop-shadow-2xl z-20"
                        style={isMobile ? { top: `${levels.length * 250 + 100}px` } : { left: `${levels.length * 300}px` }}
                    >
                        <div className={`flex flex-col items-center ${isMobile ? '' : '-translate-y-6'}`}>
                            <div className="absolute inset-0 bg-primary opacity-20 blur-3xl rounded-full scale-150 animate-pulse" />
                            <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 border-4 border-white/40 flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.5)] transform rotate-12 hover:rotate-0 transition-all duration-500 hover:scale-110 shrink-0">
                                <Crown size={64} className="text-yellow-950/80 drop-shadow-md" />
                            </div>
                            <div className="w-64 text-center mt-6">
                                <h2 className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 tracking-widest uppercase glow-gold">
                                    Financial Master
                                </h2>
                                <p className="text-yellow-500/80 font-bold tracking-widest uppercase text-xs mt-2">Final Destination</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Add custom scrollbar styles to global css or here
export function injectScrollbarStyles() {
    return (
        <style dangerouslySetInnerHTML={{
            __html: `
            .custom-scrollbar::-webkit-scrollbar {
                height: 8px;
                width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(var(--primary), 0.5);
                border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(var(--primary), 0.8);
            }
        `}} />
    )
}

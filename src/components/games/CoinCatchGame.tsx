import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, Receipt, ShoppingCart, Award, Zap, Activity, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Item {
    id: number;
    type: 'coin' | 'bill';
    x: number;
    y: number;
    speed: number;
    rotation: number;
}

export default function CoinCatchGame({ onComplete }: { onComplete: (score: number) => void }) {
    const [basketX, setBasketX] = useState(50);
    const [items, setItems] = useState<Item[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
    const [lastCatch, setLastCatch] = useState<'success' | 'fail' | null>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gameStarted || gameOver || timeLeft <= 0) {
            if (timeLeft === 0) setGameOver(true);
            return;
        }

        const itemInterval = setInterval(() => {
            const newItem: Item = {
                id: Math.random(),
                type: Math.random() > 0.3 ? 'coin' : 'bill',
                x: Math.random() * 90 + 5,
                y: -15,
                speed: Math.random() * 2 + 2.5,
                rotation: Math.random() * 360,
            };
            setItems(prev => [...prev, newItem]);
        }, 600);

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        const moveInterval = setInterval(() => {
            setItems(prev => {
                const updated = prev.map(item => ({
                    ...item,
                    y: item.y + item.speed,
                    rotation: item.rotation + 2
                }));

                // Catch detection
                const caught = updated.filter(item => {
                    const isAtBasketHeight = item.y > 82 && item.y < 92;
                    const isAtBasketX = Math.abs(item.x - basketX) < 12;
                    return isAtBasketHeight && isAtBasketX;
                });

                if (caught.length > 0) {
                    caught.forEach(item => {
                        if (item.type === 'coin') {
                            setScore(s => s + 10);
                            setLastCatch('success');
                        } else {
                            setScore(s => Math.max(0, s - 25));
                            setLastCatch('fail');
                        }
                    });

                    // Clear feedback after 300ms
                    setTimeout(() => setLastCatch(null), 300);
                }

                return updated.filter(item => item.y < 110 && !caught.find(c => c.id === item.id));
            });
        }, 20);

        return () => {
            clearInterval(itemInterval);
            clearInterval(moveInterval);
            clearInterval(timer);
        };
    }, [gameStarted, gameOver, timeLeft, basketX]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!gameContainerRef.current) return;
        const rect = gameContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setBasketX(Math.max(8, Math.min(92, x)));
    };

    if (!gameStarted) {
        return (
            <div className="text-center space-y-8 p-10 glass-cyber border neon-border-violet rounded-[2rem]">
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_30px_rgba(192,132,252,0.2)]">
                    <IndianRupee className="text-primary w-12 h-12" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Coin <span className="text-primary">Catch</span> Alpha</h2>
                    <p className="text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">
                        Intercept <span className="text-success font-bold">Capital Cores</span> (+10) and avoid <span className="text-pink-500 font-bold">Debt Relics</span> (-25) to stabilize your wealth lattice.
                    </p>
                </div>
                <Button onClick={() => setGameStarted(true)} className="w-full h-16 bg-primary text-black font-display font-black text-xl rounded-2xl shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_40px_rgba(192,132,252,0.5)] transition-all">
                    INITIALIZE LINK
                </Button>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="text-center space-y-8 p-10 glass-cyber border neon-border-violet rounded-[2rem]">
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20">
                    <Award className="text-primary w-12 h-12" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Session <span className="text-primary">Terminated</span></h2>
                    <p className="text-muted-foreground text-lg font-bold">Wealth Accumulated: <span className="text-white font-black text-2xl">₹{score}</span></p>
                </div>
                <Button onClick={() => onComplete(score)} className="w-full h-16 bg-primary text-black font-display font-black text-xl rounded-2xl shadow-[0_0_20px_rgba(192,132,252,0.3)]">
                    EXTRACT REWARDS
                </Button>
            </div>
        );
    }

    return (
        <div
            ref={gameContainerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[500px] glass-cyber rounded-[2.5rem] border neon-border-violet overflow-hidden cursor-none"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="absolute top-6 left-6 flex gap-6 z-20">
                <div className="glass-cyber px-5 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <Activity size={16} className="text-primary" />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Score</span>
                        <span className="text-lg font-display font-black text-white tracking-tight">₹{score}</span>
                    </div>
                </div>
                <div className="glass-cyber px-5 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <Timer size={16} className={`${timeLeft < 10 ? 'text-pink-500 animate-pulse' : 'text-secondary'}`} />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Uptime</span>
                        <span className={`text-lg font-display font-black ${timeLeft < 10 ? 'text-pink-500' : 'text-white'} tracking-tight`}>{timeLeft}s</span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {items.map(item => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: item.rotation }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute"
                        style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}
                    >
                        {item.type === 'coin' ? (
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary blur-md opacity-40 group-hover:opacity-100 transition-opacity rounded-full" />
                                <div className="relative w-10 h-10 rounded-full bg-primary border-2 border-white/50 flex items-center justify-center shadow-[0_0_20px_rgba(192,132,252,0.5)]">
                                    <IndianRupee size={20} className="text-black" />
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="absolute inset-0 bg-pink-500 blur-md opacity-30 rounded-lg" />
                                <div className="relative w-12 h-12 bg-pink-500/80 backdrop-blur-md rounded-lg flex items-center justify-center border-2 border-white/30 shadow-[0_0_20px_rgba(244,114,182,0.3)]">
                                    <Receipt size={24} className="text-white" />
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Target Catcher */}
            <motion.div
                animate={{
                    scale: lastCatch === 'success' ? 1.2 : lastCatch === 'fail' ? 0.8 : 1,
                    borderColor: lastCatch === 'success' ? 'rgb(34, 197, 94)' : lastCatch === 'fail' ? 'rgb(244, 114, 182)' : 'rgb(192, 132, 252)'
                }}
                className="absolute bottom-8 w-32 h-16 glass-cyber border-2 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-colors duration-200"
                style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
            >
                <div className="absolute inset-0 bg-primary/5 rounded-[1.5rem]" />
                <ShoppingCart size={32} className={`relative z-10 ${lastCatch === 'success' ? 'text-success' : lastCatch === 'fail' ? 'text-pink-500' : 'text-primary'} transition-colors`} />

                {/* Holographic scanner effect above catcher */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-6 bg-gradient-to-t from-primary/20 to-transparent blur-sm rounded-t-full" />
                <div className="absolute -top-1 left-4 right-4 h-[1px] bg-primary/40 animate-pulse" />
            </motion.div>

            {/* Catch Feedback Text */}
            <AnimatePresence>
                {lastCatch && (
                    <motion.div
                        key={Date.now()}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: -60 }}
                        exit={{ opacity: 0 }}
                        className={`absolute bottom-20 font-display font-black text-2xl tracking-tighter pointer-events-none`}
                        style={{ left: `${basketX}%`, transform: 'translateX(-50%)', color: lastCatch === 'success' ? '#22c55e' : '#f472b6' }}
                    >
                        {lastCatch === 'success' ? '+₹10' : '-₹25'}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

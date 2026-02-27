import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, Receipt, ShoppingCart, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Item {
    id: number;
    type: 'coin' | 'bill';
    x: number;
    y: number;
    speed: number;
}

export default function CoinCatchGame({ onComplete }: { onComplete: (score: number) => void }) {
    const [basketX, setBasketX] = useState(50);
    const [items, setItems] = useState<Item[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
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
                y: -10,
                speed: Math.random() * 2 + 2,
            };
            setItems(prev => [...prev, newItem]);
        }, 800);

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        const moveInterval = setInterval(() => {
            setItems(prev => {
                const updated = prev.map(item => ({ ...item, y: item.y + item.speed }));

                // Catch detection
                const caught = updated.filter(item => {
                    const isAtBasketHeight = item.y > 85 && item.y < 95;
                    const isAtBasketX = Math.abs(item.x - basketX) < 10;
                    return isAtBasketHeight && isAtBasketX;
                });

                caught.forEach(item => {
                    if (item.type === 'coin') setScore(s => s + 10);
                    else setScore(s => Math.max(0, s - 20));
                });

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
        setBasketX(Math.max(5, Math.min(95, x)));
    };

    if (!gameStarted) {
        return (
            <div className="text-center space-y-6 p-8">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <IndianRupee className="text-primary w-10 h-10" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">Catch the Coins!</h2>
                <p className="text-muted-foreground">
                    Move your mouse/basket to catch <span className="text-success font-bold">Gold Coins</span> (+10)
                    and avoid <span className="text-destructive font-bold">Bills</span> (-20)!
                </p>
                <Button onClick={() => setGameStarted(true)} className="w-full gold-gradient py-6 text-lg font-bold">
                    Start Game
                </Button>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="text-center space-y-6 p-8">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Award className="text-primary w-10 h-10" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">Time's Up!</h2>
                <p className="text-muted-foreground text-lg">Final Earnings: <span className="text-primary font-bold">₹{score}</span></p>
                <Button onClick={() => onComplete(score)} className="w-full gold-gradient py-6 font-bold">
                    Finish & Earn XP
                </Button>
            </div>
        );
    }

    return (
        <div
            ref={gameContainerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[400px] bg-secondary/20 rounded-2xl border border-border overflow-hidden cursor-none"
        >
            <div className="absolute top-4 left-4 flex gap-4 z-10">
                <div className="bg-background/80 backdrop-blur px-3 py-1 rounded-full border border-border">
                    <span className="text-xs font-bold text-muted-foreground mr-2">SCORE</span>
                    <span className="text-primary font-bold">₹{score}</span>
                </div>
                <div className="bg-background/80 backdrop-blur px-3 py-1 rounded-full border border-border">
                    <span className="text-xs font-bold text-muted-foreground mr-2">TIME</span>
                    <span className={`${timeLeft < 10 ? 'text-destructive' : 'text-foreground'} font-bold`}>{timeLeft}s</span>
                </div>
            </div>

            <AnimatePresence>
                {items.map(item => (
                    <div
                        key={item.id}
                        className="absolute"
                        style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}
                    >
                        {item.type === 'coin' ? (
                            <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shadow-lg border-2 border-primary-foreground/20">
                                <IndianRupee size={16} className="text-primary-foreground" />
                            </div>
                        ) : (
                            <div className="w-10 h-10 bg-destructive/80 rounded shadow-lg flex items-center justify-center border-2 border-white/20">
                                <Receipt size={20} className="text-white" />
                            </div>
                        )}
                    </div>
                ))}
            </AnimatePresence>

            <div
                className="absolute bottom-5 w-20 h-12 bg-primary/20 border-t-4 border-primary rounded-b-xl flex items-center justify-center"
                style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
            >
                <ShoppingCart size={24} className="text-primary" />
            </div>
        </div>
    );
}

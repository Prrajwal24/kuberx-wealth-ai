import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, IndianRupee, BarChart3, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const assets = [
    { id: 'stocks', name: 'Tech Stocks', risk: 'High', volatility: 15 },
    { id: 'gold', name: 'Digital Gold', risk: 'Low', volatility: 5 },
    { id: 'funds', name: 'Mutual Funds', risk: 'Medium', volatility: 8 },
];

export default function InvestmentSimGame({ onComplete }: { onComplete: (score: number) => void }) {
    const [balance, setBalance] = useState(10000);
    const [portfolio, setPortfolio] = useState<Record<string, number>>({ stocks: 0, gold: 0, funds: 0 });
    const [round, setRound] = useState(1);
    const [history, setHistory] = useState<{ round: number; value: number }[]>([]);
    const [marketMood, setMarketMood] = useState<'bull' | 'bear' | 'neutral'>('neutral');
    const [isFinished, setIsFinished] = useState(false);

    const totalValue = balance + Object.entries(portfolio).reduce((acc, [id, qty]) => acc + (qty), 0);

    const nextRound = () => {
        if (round >= 5) {
            setIsFinished(true);
            return;
        }

        const mood = Math.random() > 0.6 ? 'bull' : Math.random() > 0.4 ? 'bear' : 'neutral';
        setMarketMood(mood);

        setPortfolio(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(id => {
                const asset = assets.find(a => a.id === id)!;
                const change = (Math.random() * asset.volatility * (mood === 'bull' ? 1.5 : mood === 'bear' ? -1.5 : 1)) / 100;
                updated[id] = Math.round(updated[id] * (1 + change));
            });
            return updated;
        });

        setHistory(prev => [...prev, { round, value: totalValue }]);
        setRound(r => r + 1);
    };

    const invest = (id: string, amount: number) => {
        if (balance >= amount) {
            setBalance(b => b - amount);
            setPortfolio(prev => ({ ...prev, [id]: prev[id] + amount }));
        }
    };

    if (isFinished) {
        const profit = totalValue - 10000;
        return (
            <div className="text-center space-y-6 p-8">
                <h2 className="text-2xl font-display font-bold text-foreground">Simulation Complete</h2>
                <div className="bg-secondary/30 border border-border rounded-2xl p-6">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Final Portfolio Value</p>
                    <p className="text-4xl font-display font-bold gold-text mt-1">₹{totalValue.toLocaleString()}</p>
                    <p className={`text-sm font-bold mt-2 ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {profit >= 0 ? '▲ Profit' : '▼ Loss'}: ₹{Math.abs(profit).toLocaleString()}
                    </p>
                </div>
                <Button onClick={() => onComplete(Math.max(10, Math.floor(totalValue / 100)))} className="w-full gold-gradient py-6 font-bold uppercase">Claim XP Rewards</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-4">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Round {round}/5</p>
                    <h3 className="text-2xl font-display font-bold text-foreground">₹{totalValue.toLocaleString()}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 border ${marketMood === 'bull' ? 'bg-success/10 border-success text-success' :
                    marketMood === 'bear' ? 'bg-destructive/10 border-destructive text-destructive' :
                        'bg-secondary border-border text-muted-foreground'
                    }`}>
                    {marketMood === 'bull' ? <TrendingUp size={12} /> : marketMood === 'bear' ? <TrendingDown size={12} /> : <BarChart3 size={12} />}
                    Market: {marketMood}
                </div>
            </div>

            <div className="space-y-3">
                {assets.map(asset => (
                    <div key={asset.id} className="glass-card border border-border rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="font-bold text-foreground">{asset.name}</p>
                            <p className="text-[10px] text-muted-foreground">Risk: <span className={asset.risk === 'High' ? 'text-destructive' : asset.risk === 'Medium' ? 'text-warning' : 'text-success'}>{asset.risk}</span></p>
                            <p className="text-sm font-mono text-primary mt-1">Invested: ₹{portfolio[asset.id].toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => invest(asset.id, 500)} disabled={balance < 500} className="text-xs h-8">+₹500</Button>
                            <Button size="sm" variant="outline" onClick={() => invest(asset.id, 2000)} disabled={balance < 2000} className="text-xs h-8">+₹2k</Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-secondary/50 rounded-xl p-4 flex justify-between items-center border border-border">
                <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Available Cash</p>
                    <p className="text-lg font-bold text-foreground">₹{balance.toLocaleString()}</p>
                </div>
                <Button onClick={nextRound} className="gold-gradient px-8 py-4 font-bold h-12">
                    {round < 5 ? 'Next Round' : 'Finish Sim'}
                </Button>
            </div>

            <div className="flex items-start gap-2 bg-primary/5 p-3 rounded-lg border border-primary/20">
                <Info className="text-primary shrink-0 mt-0.5" size={14} />
                <p className="text-[10px] text-muted-foreground leading-tight">
                    Invest your available cash among different assets. Bull markets boost returns, Bear markets cause losses. Diversify to manage risk!
                </p>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, IndianRupee, BarChart3, Info, Zap, Activity, Cpu, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const assets = [
    { id: 'stocks', name: 'Tech Aggregates', risk: 'High', volatility: 15, color: '#c084fc' },
    { id: 'gold', name: 'Digital Bullion', risk: 'Low', volatility: 5, color: '#fde047' },
    { id: 'funds', name: 'Neural Indices', risk: 'Medium', volatility: 8, color: '#3b82f6' },
];

export default function InvestmentSimGame({ onComplete }: { onComplete: (score: number) => void }) {
    const [balance, setBalance] = useState(10000);
    const [portfolio, setPortfolio] = useState<Record<string, number>>({ stocks: 0, gold: 0, funds: 0 });
    const [round, setRound] = useState(1);
    const [history, setHistory] = useState<{ round: number; value: number }[]>([]);
    const [marketMood, setMarketMood] = useState<'bull' | 'bear' | 'neutral'>('neutral');
    const [isFinished, setIsFinished] = useState(false);

    const totalValue = balance + Object.entries(portfolio).reduce((acc, [_, qty]) => acc + (qty), 0);

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
            <div className="text-center space-y-8 p-10 glass-cyber border neon-border-violet rounded-[2rem]">
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_30px_rgba(192,132,252,0.2)]">
                    <BarChart3 className="text-primary w-12 h-12" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-display font-black text-white uppercase">Simulation <span className="text-primary">Node Closed</span></h2>
                    <div className="bg-black/40 border border-white/5 rounded-2xl p-8 space-y-2">
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em]">Temporal Portfolio Value</p>
                        <p className="text-5xl font-display font-black text-white">₹{totalValue.toLocaleString()}</p>
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black shadow-lg ${profit >= 0 ? 'bg-success/20 text-success border border-success/30' : 'bg-pink-500/20 text-pink-500 border border-pink-500/30'}`}>
                            {profit >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {profit >= 0 ? 'DELTA POSITIVE' : 'DELTA NEGATIVE'}: ₹{Math.abs(profit).toLocaleString()}
                        </div>
                    </div>
                </div>
                <Button onClick={() => onComplete(Math.max(10, Math.floor(totalValue / 100)))} className="w-full h-16 bg-primary text-black font-display font-black text-xl rounded-2xl shadow-[0_0_20px_rgba(192,132,252,0.3)]">
                    SYNC XP DATA
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-2 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />

            <div className="flex justify-between items-end relative z-10">
                <div className="space-y-1">
                    <p className="text-[10px] text-primary/60 uppercase font-black tracking-[0.4em]">Temporal Cycle {round}/5</p>
                    <h3 className="text-4xl font-display font-black text-white tracking-tighter">₹{totalValue.toLocaleString()}</h3>
                </div>
                <div className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border shadow-xl transition-all duration-500 ${marketMood === 'bull' ? 'bg-success/20 border-success/40 text-success shadow-success/10' :
                        marketMood === 'bear' ? 'bg-pink-500/20 border-pink-500/40 text-pink-500 shadow-pink-500/10' :
                            'bg-white/5 border-white/10 text-white/50'
                    }`}>
                    {marketMood === 'bull' ? <TrendingUp size={14} className="animate-bounce" /> : marketMood === 'bear' ? <TrendingDown size={14} className="animate-bounce" /> : <Activity size={14} />}
                    Sentiment: {marketMood}
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                {assets.map((asset, idx) => (
                    <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-cyber border border-white/5 rounded-[2rem] p-6 flex items-center justify-between group hover:border-primary/20 transition-all"
                    >
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full`} style={{ background: asset.color, boxShadow: `0 0 8px ${asset.color}` }} />
                                <p className="font-black text-white uppercase tracking-wider">{asset.name}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">Risk: <span className={asset.risk === 'High' ? 'text-pink-500' : asset.risk === 'Medium' ? 'text-secondary' : 'text-success'}>{asset.risk}</span></p>
                                <div className="w-[1px] h-3 bg-white/10" />
                                <p className="text-[10px] font-mono text-primary font-bold">NODE_VALUE: ₹{portfolio[asset.id].toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => invest(asset.id, 500)} disabled={balance < 500} className="h-10 px-4 bg-white/5 border-white/5 hover:bg-primary hover:text-black hover:border-primary text-[10px] font-black rounded-xl transition-all">+₹500</Button>
                            <Button variant="outline" onClick={() => invest(asset.id, 2000)} disabled={balance < 2000} className="h-10 px-4 bg-white/5 border-white/5 hover:bg-primary hover:text-black hover:border-primary text-[10px] font-black rounded-xl transition-all">+₹2K</Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-cyber border neon-border-violet rounded-[2rem] p-6 flex justify-between items-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-[0.05] pointer-events-none group-hover:rotate-12 transition-transform">
                    <IndianRupee size={80} />
                </div>
                <div className="space-y-1 relative z-10">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest flex items-center gap-2"><Zap size={10} className="text-primary" /> LIQUID_RESERVES</p>
                    <p className="text-3xl font-display font-black text-white tracking-tighter">₹{balance.toLocaleString()}</p>
                </div>
                <Button onClick={nextRound} className="h-16 px-10 bg-primary text-black font-display font-black text-lg rounded-2xl shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_40px_rgba(192,132,252,0.5)] transition-all active:scale-[0.98] z-10">
                    {round < 5 ? (
                        <div className="flex items-center gap-2">EXECUTE CYCLE <ArrowRight size={20} /></div>
                    ) : 'CLOSE SIMULATION'}
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                    <Info className="text-primary" size={20} />
                </div>
                <p className="text-[10px] text-muted-foreground font-medium leading-relaxed uppercase tracking-widest">
                    Strategy Advisory: Diversify across nodes. <span className="text-white font-bold">Market Phase Bull</span> catalyzes rapid expansion, while <span className="text-white font-bold">Bear Phase</span> triggers capital contraction.
                </p>
            </div>
        </div>
    );
}

const ArrowRight = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

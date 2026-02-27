import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, DollarSign, Target, PieChart, Info, ShieldCheck, CheckCircle2, ArrowRight, Activity, Zap, Cpu, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        age: '', occupation: '', location: '',
        income: '', expenses: '', savings: '',
        investments: [] as string[],
        goals: [] as string[],
        targetAmount: '', timeline: '',
        quizAnswers: [] as string[]
    });

    const { updateOnboarding } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleComplete = async () => {
        const score = calculateHealthScore(data);
        await updateOnboarding({ ...data, healthScore: score });
        toast({
            title: "NEURAL PROFILE SECURED",
            description: "Financial health score calibrated at " + score + "/100"
        });
        navigate('/');
    };

    const calculateHealthScore = (d: typeof data) => {
        let s = 50;
        const inc = parseInt(d.income) || 0;
        const exp = parseInt(d.expenses) || 0;
        const sav = parseInt(d.savings) || 0;

        if (inc > 0 && exp / inc < 0.5) s += 15;
        if (sav > inc * 3) s += 20;
        if (d.investments.length > 2) s += 15;
        return Math.min(100, s);
    };

    return (
        <div className="min-h-screen w-full bg-[#050507] flex flex-col items-center py-16 px-6 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-3xl relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                        <Cpu size={12} /> Neural Calibration Phase
                    </div>
                    <h1 className="text-5xl font-display font-black text-white tracking-tighter uppercase whitespace-pre-wrap">Initialize <span className="text-primary glow-text-violet">Identity</span></h1>
                    <p className="text-muted-foreground font-medium max-w-xl mx-auto italic">Synchronize your financial lattice with the KuberX engine for optimal wealth projection.</p>
                </div>

                {/* Cyber Progress Matrix */}
                <div className="flex justify-between mb-20 relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0" />
                    <motion.div
                        initial={{ width: 0 }} animate={{ width: `${(step - 1) * 50}%` }}
                        className="absolute top-1/2 left-0 h-[1px] bg-primary shadow-[0_0_10px_rgba(192,132,252,0.8)] -translate-y-1/2 z-10 transition-all duration-700"
                    />

                    {[1, 2, 3].map((s) => (
                        <div key={s} className="relative z-20 flex flex-col items-center gap-4 group">
                            <motion.div
                                animate={{
                                    scale: step === s ? 1.2 : 1,
                                    borderColor: step >= s ? '#c084fc' : 'rgba(255,255,255,0.05)',
                                    backgroundColor: step > s ? '#c084fc' : 'rgba(10, 10, 12, 0.8)'
                                }}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 backdrop-blur-xl shadow-2xl
                                  ${step === s ? 'neon-border-violet' : ''}
                               `}
                            >
                                {step > s ? <CheckCircle2 size={24} className="text-black" /> : (
                                    <span className={`text-xl font-display font-black ${step >= s ? 'text-white' : 'text-white/20'}`}>0{s}</span>
                                )}
                            </motion.div>
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${step >= s ? 'text-primary' : 'text-white/20'}`}>
                                {s === 1 ? 'BIO_METRIC' : s === 2 ? 'FLOW_ANALYSIS' : 'DESTINATION'}
                            </span>
                        </div>
                    ))}
                </div>

                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-cyber border neon-border-violet rounded-[3rem] p-10 sm:p-14 relative overflow-hidden"
                >
                    {/* Interior Scan Effect */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <div className="space-y-10 relative z-10">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">Subject Verification</h2>
                                    <p className="text-muted-foreground font-medium">Input biometric identifiers for regional calibration.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">Temporal Age</label>
                                        <Input
                                            placeholder="E.g. 24"
                                            value={data.age}
                                            onChange={e => setData({ ...data, age: e.target.value })}
                                            className="h-16 bg-black/40 border-white/5 rounded-2xl text-white font-bold text-lg focus:border-primary/40 transition-all font-mono"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">Operational Sector</label>
                                        <select
                                            className="w-full h-16 bg-black/40 border-white/5 border rounded-2xl px-6 text-lg font-bold text-white focus:ring-2 focus:ring-primary/40 outline-none appearance-none cursor-pointer"
                                            value={data.occupation}
                                            onChange={e => setData({ ...data, occupation: e.target.value })}
                                        >
                                            <option value="" className="bg-black">SELECT_SECTOR</option>
                                            <option value="Student" className="bg-black">ACADEMIA</option>
                                            <option value="Salaried" className="bg-black">CORPORATE_ENTITY</option>
                                            <option value="Freelancer" className="bg-black">INDEPENDENT_NODE</option>
                                            <option value="Business Owner" className="bg-black">SYSTEM_ARCHITECT</option>
                                        </select>
                                    </div>
                                    <div className="sm:col-span-2 space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">Neural Link coordinates (City)</label>
                                        <Input
                                            placeholder="E.g. Mumbai, India"
                                            value={data.location}
                                            onChange={e => setData({ ...data, location: e.target.value })}
                                            className="h-16 bg-black/40 border-white/5 rounded-2xl text-white font-bold text-lg focus:border-primary/40 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-10 relative z-10">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">Capital Flow Analysis</h2>
                                    <p className="text-muted-foreground font-medium">Map your current liquidity vectors for optimization.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">Monthly Inflow (₹)</label>
                                        <Input
                                            placeholder="E.g. 50000"
                                            type="number"
                                            value={data.income}
                                            onChange={e => setData({ ...data, income: e.target.value })}
                                            className="h-16 bg-black/40 border-white/5 rounded-2xl text-white font-bold text-lg focus:border-primary/40 transition-all font-mono"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">Structural Outflow (₹)</label>
                                        <Input
                                            placeholder="E.g. 20000"
                                            type="number"
                                            value={data.expenses}
                                            onChange={e => setData({ ...data, expenses: e.target.value })}
                                            className="h-16 bg-black/40 border-white/5 rounded-2xl text-white font-bold text-lg focus:border-primary/40 transition-all font-mono"
                                        />
                                    </div>
                                    <div className="sm:col-span-2 space-y-6">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">Active Asset Nodes</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {['Stocks', 'Mutual Funds', 'Gold', 'Crypto', 'FD', 'None'].map(inv => (
                                                <button
                                                    key={inv}
                                                    onClick={() => {
                                                        const list = data.investments.includes(inv)
                                                            ? data.investments.filter(i => i !== inv)
                                                            : [...data.investments, inv];
                                                        setData({ ...data, investments: list });
                                                    }}
                                                    className={`h-14 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all duration-300
                                                      ${data.investments.includes(inv)
                                                            ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(192,132,252,0.4)]'
                                                            : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'}
                                                    `}
                                                >
                                                    {inv}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-10 relative z-10">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">Temporal Objectives</h2>
                                    <p className="text-muted-foreground font-medium">Define your target wealth destination.</p>
                                </div>
                                <div className="space-y-10">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {['Car', 'House', 'Travel', 'Emergency', 'Retirement', 'Education'].map(goal => (
                                            <button
                                                key={goal}
                                                onClick={() => {
                                                    const list = data.goals.includes(goal)
                                                        ? data.goals.filter(i => i !== goal)
                                                        : [...data.goals, goal];
                                                    setData({ ...data, goals: list });
                                                }}
                                                className={`h-14 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all
                                                  ${data.goals.includes(goal)
                                                        ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(192,132,252,0.4)]'
                                                        : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'}
                                                `}
                                            >
                                                {goal}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">Target Accumulation (₹)</label>
                                            <Input
                                                placeholder="E.g. 1000000"
                                                type="number"
                                                value={data.targetAmount}
                                                onChange={e => setData({ ...data, targetAmount: e.target.value })}
                                                className="h-16 bg-black/40 border-white/5 rounded-2xl text-white font-bold text-lg focus:border-primary/40 transition-all font-mono"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">Temporal Window (Years)</label>
                                            <Input
                                                placeholder="E.g. 5"
                                                type="number"
                                                value={data.timeline}
                                                onChange={e => setData({ ...data, timeline: e.target.value })}
                                                className="h-16 bg-black/40 border-white/5 rounded-2xl text-white font-bold text-lg focus:border-primary/40 transition-all font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                    <div className="mt-16 flex justify-between items-center gap-6 relative z-10">
                        <Button
                            variant="outline"
                            onClick={() => step > 1 && setStep(step - 1)}
                            disabled={step === 1}
                            className={`h-16 px-10 border-white/10 bg-white/5 hover:bg-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${step === 1 ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
                        >
                            PREVIOUS_STATE
                        </Button>

                        <Button
                            onClick={() => step < 3 ? setStep(step + 1) : handleComplete()}
                            className="h-16 px-12 bg-primary text-black rounded-2xl font-display font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(192,132,252,0.3)] hover:shadow-[0_0_50px_rgba(192,132,252,0.5)] transition-all group active:scale-[0.98]"
                        >
                            {step === 3 ? 'FINALIZE_SYNCHRONIZATION' : 'ACCESS_NEXT_NODE'}
                            <ArrowRight size={20} className="ml-3 group-hover:translate-x-1.5 transition-transform" />
                        </Button>
                    </div>
                </motion.div>

                {/* Secure Footer */}
                <div className="mt-20 flex flex-col items-center gap-3 py-6 border-t border-white/5 opacity-40">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-primary" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Fintech Grade Encryption</span>
                        </div>
                        <div className="w-[1px] h-4 bg-white/10" />
                        <div className="flex items-center gap-2">
                            <Globe size={16} className="text-secondary" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Global Node Stable</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

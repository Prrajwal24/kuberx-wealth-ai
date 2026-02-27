import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, DollarSign, Target, PieChart, Info, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
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
        // Calculate initial health score logic
        const score = calculateHealthScore(data);
        await updateOnboarding({ ...data, healthScore: score });
        toast({ title: "Profile Secured!", description: "Your financial health score is " + score + "/100" });
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
        <div className="min-h-screen w-full bg-[#0A0A0B] flex flex-col items-center py-12 px-6">
            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="flex justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-xl
                ${step >= s ? 'gold-gradient border-white/20 text-primary-foreground' : 'bg-secondary border-white/5 text-muted-foreground'}
                ${step === s ? 'glow-gold scale-110' : ''}
              `}>
                                {step > s ? <CheckCircle2 size={20} /> : s}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-primary' : 'text-muted-foreground'}`}>
                                {s === 1 ? 'Personal' : s === 2 ? 'Financial' : 'Goal'}
                            </span>
                        </div>
                    ))}
                </div>

                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card border border-primary/10 rounded-[40px] p-8 sm:p-12 shadow-2xl"
                >
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <div className="space-y-8">
                                <div className="text-center sm:text-left">
                                    <h2 className="text-3xl font-display font-bold text-foreground">Tell us about yourself</h2>
                                    <p className="text-muted-foreground mt-2">Help us customize your wealth journey.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Age</label>
                                        <Input placeholder="E.g. 24" value={data.age} onChange={e => setData({ ...data, age: e.target.value })} className="h-12 bg-secondary/50 border-white/5 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Occupation</label>
                                        <select
                                            className="w-full h-12 bg-secondary/50 border-white/5 border rounded-xl px-4 text-sm text-foreground focus:ring-1 focus:ring-primary/40 outline-none"
                                            value={data.occupation}
                                            onChange={e => setData({ ...data, occupation: e.target.value })}
                                        >
                                            <option value="">Select...</option>
                                            <option value="Student">Student</option>
                                            <option value="Salaried">Salaried</option>
                                            <option value="Freelancer">Freelancer</option>
                                            <option value="Business Owner">Business Owner</option>
                                        </select>
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Location (City/Country)</label>
                                        <Input placeholder="E.g. Mumbai, India" value={data.location} onChange={e => setData({ ...data, location: e.target.value })} className="h-12 bg-secondary/50 border-white/5 rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8">
                                <div className="text-center sm:text-left">
                                    <h2 className="text-3xl font-display font-bold text-foreground">Financial Profile</h2>
                                    <p className="text-muted-foreground mt-2">Your data is securely encrypted.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Monthly Income (₹)</label>
                                        <Input placeholder="E.g. 50000" type="number" value={data.income} onChange={e => setData({ ...data, income: e.target.value })} className="h-12 bg-secondary/50 border-white/5 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Monthly Expenses (₹)</label>
                                        <Input placeholder="E.g. 20000" type="number" value={data.expenses} onChange={e => setData({ ...data, expenses: e.target.value })} className="h-12 bg-secondary/50 border-white/5 rounded-xl" />
                                    </div>
                                    <div className="sm:col-span-2 space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Current Investments</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {['Stocks', 'Mutual Funds', 'Gold', 'Crypto', 'FD', 'None'].map(inv => (
                                                <button
                                                    key={inv}
                                                    onClick={() => {
                                                        const list = data.investments.includes(inv)
                                                            ? data.investments.filter(i => i !== inv)
                                                            : [...data.investments, inv];
                                                        setData({ ...data, investments: list });
                                                    }}
                                                    className={`px-4 py-3 rounded-xl border text-xs font-bold transition-all duration-300
                              ${data.investments.includes(inv)
                                                            ? 'gold-gradient border-white/20 text-primary-foreground'
                                                            : 'bg-secondary/30 border-white/5 text-muted-foreground hover:bg-secondary/50'}
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
                            <div className="space-y-8">
                                <div className="text-center sm:text-left">
                                    <h2 className="text-3xl font-display font-bold text-foreground">Financial Goals</h2>
                                    <p className="text-muted-foreground mt-2">What are we building for?</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {['Car', 'House', 'Travel', 'Emergency', 'Retirement', 'Education'].map(goal => (
                                            <button
                                                key={goal}
                                                onClick={() => {
                                                    const list = data.goals.includes(goal)
                                                        ? data.goals.filter(i => i !== goal)
                                                        : [...data.goals, goal];
                                                    setData({ ...data, goals: list });
                                                }}
                                                className={`px-4 py-3 rounded-xl border text-xs font-bold transition-all
                              ${data.goals.includes(goal)
                                                        ? 'gold-gradient border-white/20 text-primary-foreground'
                                                        : 'bg-secondary/30 border-white/5 text-muted-foreground hover:bg-secondary/50'}
                            `}
                                            >
                                                {goal}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Target Amount (₹)</label>
                                            <Input placeholder="E.g. 1000000" type="number" value={data.targetAmount} onChange={e => setData({ ...data, targetAmount: e.target.value })} className="h-12 bg-secondary/50 border-white/5 rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Timeline (Years)</label>
                                            <Input placeholder="E.g. 5" type="number" value={data.timeline} onChange={e => setData({ ...data, timeline: e.target.value })} className="h-12 bg-secondary/50 border-white/5 rounded-xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                    <div className="mt-12 flex justify-between items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => step > 1 && setStep(step - 1)}
                            disabled={step === 1}
                            className="h-12 px-8 border-white/5 bg-secondary/30 rounded-xl font-bold uppercase tracking-widest text-[10px] disabled:opacity-0"
                        >
                            Back
                        </Button>

                        <Button
                            onClick={() => step < 3 ? setStep(step + 1) : handleComplete()}
                            className="h-12 px-10 gold-gradient rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg group"
                        >
                            {step === 3 ? 'FINALIZE PROFILE' : 'NEXT STEP'}
                            <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </motion.div>

                <div className="mt-12 flex items-center justify-center gap-3 text-muted-foreground/30 grayscale">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest italic pt-0.5">Fintech Grade Security</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Github, Chrome, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            toast({
                title: "Welcome back!",
                description: "Successfully logged into your treasury.",
            });
            navigate('/');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Please check your credentials.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0A0A0B] overflow-hidden">
            {/* Left Side: Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-warning/5 rounded-full blur-[120px]" />
                    <GoldParticles />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 flex flex-col items-center text-center"
                >
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center shadow-2xl glow-gold">
                            <span className="text-primary-foreground font-display font-bold text-3xl">K</span>
                        </div>
                        <div className="text-left">
                            <h1 className="font-display font-bold text-4xl text-foreground">KuberX</h1>
                            <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase">Wealth Intelligence</p>
                        </div>
                    </div>

                    {/* Yaksha Mascot Animation */}
                    <div className="relative mb-12">
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <YakshaAvatar />
                        </motion.div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/20 blur-xl rounded-full" />
                    </div>

                    <h2 className="text-3xl font-display font-bold text-foreground mb-4">Master Money. Build Wealth.</h2>
                    <p className="text-muted-foreground max-w-md leading-relaxed">
                        Your intelligent guide to learning finance, building wealth, and making smarter financial decisions.
                    </p>
                </motion.div>

                {/* Floating Stats or Graphs Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="absolute bottom-12 left-12 right-12 z-10"
                >
                    <div className="flex justify-between items-end gap-1 h-20 opacity-30">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                                className="flex-1 bg-primary rounded-t-sm"
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative overflow-hidden">
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg">
                        <span className="text-primary-foreground font-bold text-xl">K</span>
                    </div>
                    <h1 className="font-display font-bold text-2xl text-foreground">KuberX</h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md glass-card border border-primary/10 rounded-[32px] p-8 sm:p-10 shadow-2xl relative z-10"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <h3 className="text-2xl font-display font-bold text-foreground mb-2">Login to KuberX</h3>
                        <p className="text-muted-foreground text-sm">Welcome back to your financial treasury.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="pl-10 h-12 bg-secondary/50 border-white/5 focus-visible:ring-primary/20 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</label>
                                <Link to="#" className="text-[11px] font-bold text-primary hover:underline uppercase tracking-tighter">Forgot Password?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 h-12 bg-secondary/50 border-white/5 focus-visible:ring-primary/20 rounded-xl"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-1">
                            <input type="checkbox" id="remember" className="rounded border-white/10 bg-secondary accent-primary" />
                            <label htmlFor="remember" className="text-xs text-muted-foreground">Remember me for 30 days</label>
                        </div>

                        <Button type="submit" className="w-full h-12 gold-gradient shadow-lg shadow-primary/20 rounded-xl font-bold gap-2 group transition-all duration-300 active:scale-[0.98]" disabled={isLoading}>
                            {isLoading ? "AUTHENTICATING..." : "LOGIN TO DASHBOARD"}
                            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>

                    <div className="my-8 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/30">
                        <div className="flex-1 h-[1px] bg-white/5" />
                        OR CONTINUE WITH
                        <div className="flex-1 h-[1px] bg-white/5" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 border-white/5 bg-secondary/30 hover:bg-secondary/50 rounded-xl gap-2 text-xs font-bold tracking-wider">
                            <Chrome size={18} /> GOOGLE
                        </Button>
                        <Button variant="outline" className="h-12 border-white/5 bg-secondary/30 hover:bg-secondary/50 rounded-xl gap-2 text-xs font-bold tracking-wider">
                            <Phone size={18} /> PHONE
                        </Button>
                    </div>

                    <p className="mt-10 text-center text-sm text-muted-foreground">
                        New to KuberX? <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
                    </p>

                    <div className="mt-12 flex items-center justify-center gap-2 text-[10px] text-muted-foreground/50 uppercase tracking-widest font-bold">
                        <ShieldCheck size={14} className="text-primary/50" />
                        Your financial data is securely encrypted
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function GoldParticles() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        x: Math.random() * 500,
                        y: Math.random() * 800
                    }}
                    animate={{
                        opacity: [0, 0.4, 0],
                        y: [null, '-=100'],
                        x: [null, `+=${(Math.random() - 0.5) * 50}`]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
                />
            ))}
        </div>
    );
}

function YakshaAvatar() {
    return (
        <div className="w-48 h-48 rounded-full gold-gradient shadow-[0_0_80px_rgba(251,191,36,0.3)] flex items-center justify-center p-8 border-4 border-white/20 glow-gold">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <defs>
                    <filter id="glow-yaksha">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
                <path d="M50 15C30 15 20 30 20 45C20 65 50 85 50 85C50 85 80 65 80 45C80 30 70 15 50 15Z" fill="white" filter="url(#glow-yaksha)" opacity="0.9" />
                <circle cx="40" cy="40" r="4" fill="#6B21A8" />
                <circle cx="60" cy="40" r="4" fill="#6B21A8" />
                <path d="M42 52Q50 60 58 52" stroke="#6B21A8" strokeWidth="4" strokeLinecap="round" />
                <motion.circle cx="15" cy="25" r="3" fill="#FDE68A" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="85" cy="30" r="3" fill="#FDE68A" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
            </svg>
        </div>
    );
}

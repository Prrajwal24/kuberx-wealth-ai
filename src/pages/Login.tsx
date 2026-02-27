import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Chrome, Phone, ArrowRight, ShieldCheck, Cpu, Database, Zap } from 'lucide-react';
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
                title: "Neural Link Established",
                description: "Successfully synchronized with your financial treasury.",
            });
            navigate('/');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Authentication Failed",
                description: "Security protocol rejected the provided credentials.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#050507] overflow-hidden selection:bg-primary selection:text-black">
            {/* Left Side: Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden border-r border-white/5">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
                    <SpectralParticles />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 flex flex-col items-center text-center"
                >
                    <div className="flex items-center gap-5 mb-16">
                        <div className="w-20 h-20 rounded-[2rem] glass-cyber border neon-border-violet flex items-center justify-center shadow-2xl group transition-all duration-500 hover:scale-110">
                            <span className="text-white font-display font-black text-4xl group-hover:glow-text-violet transition-all">K</span>
                        </div>
                        <div className="text-left">
                            <h1 className="font-display font-black text-5xl text-white tracking-tighter uppercase whitespace-nowrap">Kuber<span className="text-primary glow-text-violet">X</span></h1>
                            <div className="flex items-center gap-2">
                                <div className="h-[1px] w-4 bg-primary/40" />
                                <p className="text-[10px] text-primary/70 font-black tracking-[0.4em] uppercase">Wealth Intelligence</p>
                            </div>
                        </div>
                    </div>

                    {/* Yaksha Mascot Animation - Spectral Version */}
                    <div className="relative mb-16 group">
                        <motion.div
                            animate={{ y: [0, -25, 0], rotate: [0, 2, 0, -2, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <YakshaAvatarSpectral />
                        </motion.div>
                        {/* Shadow/Glow Base */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-8 bg-primary/20 blur-2xl rounded-[100%] scale-x-150 animate-pulse" />
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <h2 className="text-4xl font-display font-black text-white tracking-tighter uppercase leading-tight">Master Money. <br /><span className="text-primary glow-text-violet">Build Wealth.</span></h2>
                        <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                            Your neural interface for financial mastery. Securely manage, optimize, and expand your capital through advanced AI guardianship.
                        </p>
                    </div>
                </motion.div>

                {/* Cyber Data Visualization */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md opacity-20 pointer-events-none">
                    <div className="flex items-end gap-1.5 h-16">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [`${10 + Math.random() * 80}%`, `${10 + Math.random() * 80}%`] }}
                                transition={{ duration: 1.5 + Math.random(), repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
                                className="flex-1 bg-primary/40 rounded-t-sm"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative overflow-hidden">
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center gap-4 mb-16">
                    <div className="w-12 h-12 rounded-2xl glass-cyber border-primary/40 flex items-center justify-center shadow-lg">
                        <span className="text-primary font-black text-2xl">K</span>
                    </div>
                    <h1 className="font-display font-black text-3xl text-white tracking-tighter">KUBERX</h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', damping: 25 }}
                    className="w-full max-w-md glass-cyber border neon-border-violet rounded-[3rem] p-10 sm:p-12 relative z-10 overflow-hidden"
                >
                    {/* Interior Atmosphere */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

                    <div className="mb-12 relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Secure Gateway</p>
                        </div>
                        <h3 className="text-3xl font-display font-black text-white tracking-tighter uppercase">Subject Identification</h3>
                        <p className="text-muted-foreground font-medium text-sm mt-1">Authenticate neural link to access your treasury.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8 relative z-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                <Database size={12} className="text-primary" /> EMAIL_IDENTIFIER
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-all group-focus-within:scale-110" size={20} />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter identifier..."
                                    className="pl-14 h-16 bg-black/40 border-white/5 focus-visible:ring-primary/40 focus-visible:border-primary/40 rounded-2xl text-white font-medium transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                    <Lock size={12} className="text-primary" /> SECURITY_PASSPHRASE
                                </label>
                                <Link to="#" className="text-[10px] font-black text-primary/60 hover:text-primary uppercase tracking-widest transition-colors">Recover Keys</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-all group-focus-within:scale-110" size={20} />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-14 pr-14 h-16 bg-black/40 border-white/5 focus-visible:ring-primary/40 focus-visible:border-primary/40 rounded-2xl text-white font-medium transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-1">
                            <div className="relative flex items-center justify-center">
                                <input type="checkbox" id="remember" className="peer appearance-none w-5 h-5 rounded-md border border-white/10 bg-black/40 checked:bg-primary checked:border-primary transition-all cursor-pointer" />
                                <div className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-black font-bold text-xs transition-opacity">✓</div>
                            </div>
                            <label htmlFor="remember" className="text-[10px] font-black text-muted-foreground uppercase tracking-widest cursor-pointer select-none">Maintain persistent link (30 cycles)</label>
                        </div>

                        <Button type="submit" className="w-full h-16 bg-primary text-black font-display font-black text-xl shadow-[0_0_30px_rgba(192,132,252,0.3)] hover:shadow-[0_0_50px_rgba(192,132,252,0.5)] rounded-2xl transition-all active:scale-[0.98] group relative overflow-hidden" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-3">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                                    SYNCHRONIZING...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    AUTH_CONNECT
                                    <ArrowRight size={24} className="group-hover:translate-x-1.5 transition-transform" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        </Button>
                    </form>

                    <div className="my-10 flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/10">
                        <div className="flex-1 h-[1px] bg-white/5" />
                        Alternative Nodes
                        <div className="flex-1 h-[1px] bg-white/5" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-14 glass-cyber border border-white/5 hover:border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-white/5">
                            <Chrome size={20} className="text-white/60" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Google_Sync</span>
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-14 glass-cyber border border-white/5 hover:border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-white/5">
                            <Phone size={20} className="text-white/60" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Bio_Link</span>
                        </motion.button>
                    </div>

                    <p className="mt-12 text-center text-sm text-muted-foreground font-medium">
                        Unknown Identifier? <Link to="/signup" className="text-primary font-black hover:glow-text-violet transition-all underline decoration-primary/30">Generate Node</Link>
                    </p>

                    <div className="mt-12 flex items-center justify-center gap-3 py-4 border-t border-white/5 opacity-50">
                        <ShieldCheck size={16} className="text-primary" />
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">Neural-Link Encryption Active</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function SpectralParticles() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        x: Math.random() * 800,
                        y: Math.random() * 1000
                    }}
                    animate={{
                        opacity: [0, 0.6, 0],
                        y: [null, '-=150'],
                        x: [null, `+=${(Math.random() - 0.5) * 100}`],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 6 + Math.random() * 6,
                        repeat: Infinity,
                        delay: Math.random() * 10
                    }}
                    className="absolute w-1 h-1 bg-primary/40 rounded-full shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                />
            ))}
        </div>
    );
}

function YakshaAvatarSpectral() {
    return (
        <div className="w-56 h-56 rounded-[3rem] glass-cyber border-2 neon-border-violet flex items-center justify-center p-10 shadow-[0_0_100px_rgba(192,132,252,0.1)] group transition-all duration-700 hover:rotate-2 hover:scale-105">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="relative z-10 filter drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]">
                <defs>
                    <linearGradient id="cyberGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fde047" />
                        <stop offset="50%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <filter id="spectral_glow">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Main Body - Spectral Pulse */}
                <motion.path
                    d="M50 15C30 15 20 30 20 45C20 65 50 85 50 85C50 85 80 65 80 45C80 30 70 15 50 15Z"
                    fill="url(#cyberGold)"
                    filter="url(#spectral_glow)"
                    animate={{
                        fillOpacity: [0.3, 0.7, 0.3],
                        strokeWidth: [1, 3, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="stroke-white/20"
                />

                {/* Eyes - Neural Pulse */}
                <circle cx="40" cy="40" r="4.5" fill="white" className="animate-pulse" />
                <circle cx="60" cy="40" r="4.5" fill="white" className="animate-pulse" />

                {/* Mouth - Cyber Smile */}
                <path d="M42 54Q50 62 58 54" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

                {/* Data Particles */}
                <motion.circle cx="15" cy="25" r="2.5" fill="#fde047" animate={{ y: [-5, 5, -5], opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
                <motion.circle cx="85" cy="30" r="2.5" fill="#3b82f6" animate={{ y: [5, -5, 5], opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
                <motion.circle cx="50" cy="10" r="1.5" fill="#c084fc" animate={{ scale: [1, 2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            </svg>

            {/* Spinning Neural Ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-[2.5rem] border border-dashed border-primary/20 pointer-events-none"
            />
        </div>
    );
}

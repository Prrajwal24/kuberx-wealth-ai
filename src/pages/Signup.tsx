import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
    const [step, setStep] = useState(1); // 1: Info, 2: OTP
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [otp, setOtp] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast({ variant: "destructive", title: "Passwords match fail", description: "Ensure both passwords are identical." });
            return;
        }
        setStep(2);
        toast({ title: "OTP Sent", description: "Use 123456 for this demo." });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp !== '123456') {
            toast({ variant: "destructive", title: "Invalid OTP", description: "Please enter the correct verification code." });
            return;
        }
        try {
            await signup(formData);
            toast({ title: "Account Created!", description: "Welcome to KuberX. Let's personalize your journey." });
            navigate('/onboarding');
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Could not create account." });
        }
    };

    const getPasswordStrength = () => {
        if (formData.password.length === 0) return 0;
        if (formData.password.length < 6) return 30;
        if (formData.password.length < 10) return 60;
        return 100;
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0A0B] p-6">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-warning/5 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass-card border border-primary/10 rounded-[32px] p-8 sm:p-10 shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gold-gradient mb-4">
                        <span className="text-primary-foreground font-bold text-2xl">K</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground">Create Account</h3>
                    <p className="text-muted-foreground text-sm mt-2">Join the treasury of wealth intelligence.</p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.form
                            key="info"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleNext}
                            className="space-y-4"
                        >
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                    <Input
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Arjun Sharma"
                                        className="pl-10 h-11 bg-secondary/50 border-white/5 rounded-xl"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="arjun@example.com"
                                        className="pl-10 h-11 bg-secondary/50 border-white/5 rounded-xl"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                    <Input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+91 98765 43210"
                                        className="pl-10 h-11 bg-secondary/50 border-white/5 rounded-xl"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                    <Input
                                        type="password"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="pl-10 h-11 bg-secondary/50 border-white/5 rounded-xl"
                                        required
                                    />
                                </div>
                                {formData.password && (
                                    <div className="px-1 mt-2">
                                        <div className="flex justify-between text-[9px] font-bold uppercase tracking-tighter text-muted-foreground mb-1">
                                            <span>Strength</span>
                                            <span className={getPasswordStrength() === 100 ? 'text-green-500' : 'text-primary'}>
                                                {getPasswordStrength() < 60 ? 'Weak' : getPasswordStrength() < 100 ? 'Medium' : 'Strong'}
                                            </span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${getPasswordStrength()}%` }}
                                                className={`h-full ${getPasswordStrength() < 60 ? 'bg-destructive' : getPasswordStrength() < 100 ? 'bg-primary' : 'bg-green-500'}`}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                    <Input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="••••••••"
                                        className="pl-10 h-11 bg-secondary/50 border-white/5 rounded-xl"
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-12 gold-gradient rounded-xl font-bold mt-4 shadow-lg active:scale-[0.98]">
                                CONTINUE TO VERIFY
                            </Button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="otp"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleSignup}
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                    <Phone className="text-primary" size={24} />
                                </div>
                                <h4 className="font-bold text-foreground">Verify Your Phone</h4>
                                <p className="text-xs text-muted-foreground mt-1">Enter the 6-digit code sent to {formData.phone}</p>
                            </div>

                            <div className="flex justify-center gap-2">
                                <Input
                                    maxLength={6}
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    className="text-center text-2xl font-display tracking-[0.5em] h-16 bg-secondary/50 border-white/5 rounded-xl focus-visible:ring-primary/20"
                                    placeholder="000000"
                                    required
                                />
                            </div>

                            <div className="text-center">
                                <button type="button" className="text-xs font-bold text-primary hover:underline">RESEND CODE</button>
                            </div>

                            <Button type="submit" className="w-full h-12 gold-gradient rounded-xl font-bold shadow-lg active:scale-[0.98]">
                                VERIFY & COMPLETE
                            </Button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Go back to edit info
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                    Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
                </p>
            </motion.div>
        </div>
    );
}

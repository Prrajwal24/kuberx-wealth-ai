import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, AlertTriangle, CheckCircle, Info,
  HeartPulse, ShieldCheck, Umbrella, Activity,
  ArrowUpRight, Bot, Zap, Plus, Minus,
  Lock, AlertCircle, Sparkles
} from "lucide-react";
import { mockUser } from "@/lib/mockData";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function Emergency() {
  const [hasHealthInsurance, setHasHealthInsurance] = useState(true);
  const [hasLifeInsurance, setHasLifeInsurance] = useState(false);
  const [hasAccidentalCover, setHasAccidentalCover] = useState(false);

  const survivalMonths = Math.round((mockUser.currentSavings / mockUser.monthlyExpenses) * 10) / 10;
  const targetMonths = 6;
  const targetAmount = mockUser.monthlyExpenses * targetMonths;
  const fundPct = Math.min((mockUser.currentSavings / targetAmount) * 100, 100);

  const shieldScore = useMemo(() => {
    let score = (fundPct * 0.6); // 60% weight to emergency fund
    if (hasHealthInsurance) score += 20; // 20% weight to health insurance
    if (hasLifeInsurance) score += 10; // 10% weight to life insurance
    if (hasAccidentalCover) score += 10; // 10% weight to accidental cover
    return Math.round(score);
  }, [fundPct, hasHealthInsurance, hasLifeInsurance, hasAccidentalCover]);

  const getScoreColor = (score: number) => {
    if (score > 80) return "text-success";
    if (score > 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score > 80) return "bg-success";
    if (score > 50) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="space-y-10 max-w-[1400px] mx-auto pb-20 px-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground tracking-tight flex items-center gap-4">
            Shield <Shield className="text-primary w-10 h-10 md:w-16 md:h-16" />
          </h1>
          <p className="text-primary font-medium mt-3 text-lg">
            Your financial safety net & protection analysis
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 flex items-center gap-6 backdrop-blur-md relative overflow-hidden group">
          <div className="relative z-10 text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Protection Score</p>
            <div className={`text-4xl font-black ${getScoreColor(shieldScore)}`}>{shieldScore}%</div>
          </div>
          <div className={`w-16 h-16 rounded-2xl ${getScoreBg(shieldScore)}/20 flex items-center justify-center relative z-10 border border-white/10 group-hover:scale-110 transition-transform`}>
            <ShieldCheck className={getScoreColor(shieldScore)} size={32} />
          </div>
          {/* Glow effect */}
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-[40px] opacity-20 ${getScoreBg(shieldScore)}`} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Emergency Fund Tracker */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-12"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 relative z-10">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground">Emergency Fund</h2>
                  <p className="text-muted-foreground mt-2 italic">A true shield protects you when the unexpected strikes.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end px-1">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Survival Capacity</p>
                      <p className="text-5xl font-display font-black text-foreground mt-1">{survivalMonths} <span className="text-lg text-muted-foreground font-medium uppercase tracking-tighter">Months</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">Target: 6 Months</p>
                      <p className="text-xl font-bold text-primary">₹{targetAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="h-6 bg-white/5 rounded-full overflow-hidden p-1.5 border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fundPct}%` }}
                      transition={{ duration: 1.5 }}
                      className={`h-full rounded-full shadow-[0_0_20px_rgba(192,132,252,0.3)] ${fundPct >= 100 ? 'bg-success' : fundPct > 50 ? 'bg-primary' : 'bg-destructive'}`}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-1">
                    <span>Vulnerable (0)</span>
                    <span>Safe (6M)</span>
                    <span>Invincible (12M+)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Lock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Fund</p>
                      <p className="text-lg font-bold">₹{mockUser.currentSavings.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Shortfall</p>
                      <p className="text-lg font-bold text-destructive">₹{Math.max(0, targetAmount - mockUser.currentSavings).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center items-center">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-primary/20 border-dashed relative flex items-center justify-center"
                >
                  <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center relative shadow-[0_0_60px_rgba(192,132,252,0.1)]">
                    <Shield size={100} className="text-primary opacity-20" />
                  </div>
                </motion.div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Fund Status</p>
                  <h4 className={`text-3xl font-display font-black uppercase italic ${fundPct >= 100 ? 'text-success' : fundPct > 50 ? 'text-warning' : 'text-destructive'}`}>
                    {fundPct >= 100 ? 'Reinforced' : fundPct > 50 ? 'Resilient' : 'Fragile'}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Insurance Coverage Grid */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-success/10 text-success">
                  <HeartPulse size={24} />
                </div>
                <Switch checked={hasHealthInsurance} onCheckedChange={setHasHealthInsurance} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Health Insurance</h3>
                <p className="text-xs text-muted-foreground mt-1">Shields you from critical medical inflation and hospital bills.</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-muted-foreground uppercase tracking-widest font-black">Status</span>
              {hasHealthInsurance ? (
                <span className="text-success font-bold flex items-center gap-1">ACTIVE <CheckCircle size={12} /></span>
              ) : (
                <span className="text-destructive font-bold flex items-center gap-1">MISSING <AlertTriangle size={12} /></span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Umbrella size={24} />
                </div>
                <Switch checked={hasLifeInsurance} onCheckedChange={setHasLifeInsurance} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Term Life Cover</h3>
                <p className="text-xs text-muted-foreground mt-1">Protects your family's future in your absence.</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-muted-foreground uppercase tracking-widest font-black">Status</span>
              {hasLifeInsurance ? (
                <span className="text-primary font-bold flex items-center gap-1">ACTIVE <CheckCircle size={12} /></span>
              ) : (
                <span className="text-destructive font-bold flex items-center gap-1">MISSING <AlertTriangle size={12} /></span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-warning/10 text-warning">
                  <Activity size={24} />
                </div>
                <Switch checked={hasAccidentalCover} onCheckedChange={setHasAccidentalCover} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Accidental Shield</h3>
                <p className="text-xs text-muted-foreground mt-1">Crucial income replacement during recovery.</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-muted-foreground uppercase tracking-widest font-black">Status</span>
              {hasAccidentalCover ? (
                <span className="text-warning font-bold flex items-center gap-1">ACTIVE <CheckCircle size={12} /></span>
              ) : (
                <span className="text-destructive font-bold flex items-center gap-1">MISSING <AlertTriangle size={12} /></span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: AI Warnings & Yaksha Wisdom */}
        <div className="lg:col-span-8">
          <div className="glass-card rounded-2xl p-8 border border-white/10 h-full">
            <h3 className="text-2xl font-display font-bold text-foreground flex items-center gap-3 mb-6">
              <Sparkles className="text-primary" size={24} /> Protection Analysis
            </h3>

            <div className="space-y-4">
              {!hasHealthInsurance && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 active:scale-[0.99] transition-transform">
                  <AlertTriangle className="text-destructive mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-destructive underline uppercase tracking-tighter decoration-dotted">Critical Gap: No Health Insurance</p>
                    <p className="text-sm text-foreground/80 mt-1">Hospital costs in India are rising at 14% annually. A ₹5 Lakh cover is non-negotiable for a 26-year-old.</p>
                  </div>
                </div>
              )}
              {!hasLifeInsurance && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-warning/10 border border-warning/20">
                  <Info className="text-warning mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-warning underline uppercase tracking-tighter decoration-dotted">Action Required: Life Coverage</p>
                    <p className="text-sm text-foreground/80 mt-1">As a high-earner, your family depends on your income. A Term Plan costs less than a coffee per day.</p>
                  </div>
                </div>
              )}
              {fundPct < 100 && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <Activity className="text-primary mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-primary underline uppercase tracking-tighter decoration-dotted">Building Resilience</p>
                    <p className="text-sm text-foreground/80 mt-1">You are ₹{Math.round(targetAmount - mockUser.currentSavings).toLocaleString()} away from your target. Consistency is key.</p>
                  </div>
                </div>
              )}
              {hasHealthInsurance && hasLifeInsurance && hasAccidentalCover && fundPct >= 100 && (
                <div className="flex items-start gap-4 p-6 rounded-xl bg-success/10 border border-success/20">
                  <ShieldCheck className="text-success mt-1 shrink-0" size={24} />
                  <div>
                    <p className="text-xl font-display font-black text-success italic uppercase tracking-widest">Fortress Secures</p>
                    <p className="text-base text-foreground/80 mt-2 font-medium">Your financial shield is complete. You can now take aggressive investment risks knowing you are protected.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="glass-card rounded-2xl p-8 border border-primary/20 bg-primary/5 flex flex-col items-center text-center gap-6 relative overflow-hidden h-full">
            <div className="w-20 h-20 rounded-2xl gold-gradient flex items-center justify-center shadow-xl relative z-10">
              <Bot className="text-primary-foreground" size={40} />
            </div>
            <div className="relative z-10 space-y-3">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-primary italic">Yaksha's Shield Lore</p>
              <p className="text-lg font-medium text-foreground leading-tight italic font-display">
                "A shield is not built when the war begins, but in the long days of peace. Your emergency fund is the peace you buy for your future self."
              </p>
            </div>
            <motion.div
              animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none"
            >
              <Shield size={200} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

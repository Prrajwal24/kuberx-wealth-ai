import { motion } from "framer-motion";
import { Wallet, TrendingUp, PiggyBank, Sparkles, IndianRupee, AlertTriangle, Shield, Activity, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import KuberScoreRing from "@/components/KuberScoreRing";
import MetricCard from "@/components/MetricCard";
import { mockUser, calculateKuberScore, getScoreCategory, calculateSalaryAllocation, monthlyExpenseData, mockMarketData } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const activeUser = user?.financialProfile ? {
    ...mockUser,
    name: user.name,
    monthlySalary: parseInt(user.financialProfile.income) || mockUser.monthlySalary,
    monthlyExpenses: parseInt(user.financialProfile.expenses) || mockUser.monthlyExpenses,
    currentSavings: parseInt(user.financialProfile.savings) || mockUser.currentSavings,
  } : mockUser;

  const kuberScore = user?.financialProfile?.healthScore || calculateKuberScore(activeUser);
  const scoreCategory = getScoreCategory(kuberScore);
  const allocation = calculateSalaryAllocation(activeUser);
  const emergencyMonths = Math.round((activeUser.currentSavings / activeUser.monthlyExpenses) * 10) / 10;

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Futuristic Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 text-primary font-display text-sm font-semibold tracking-[0.2em] uppercase mb-2">
            <Activity size={14} className="animate-pulse" />
            System Active
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Command <span className="text-primary glow-text-violet">Center</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-body text-lg">
            Welcome back, <span className="text-white font-medium">{activeUser.name.split(' ')[0]}</span>. Your AI wealth engine is optimized.
          </p>
        </motion.div>

        <div className="flex items-center gap-4">
          <div className="h-12 w-[1px] bg-white/10 hidden md:block" />
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Market Status</p>
            <div className="flex items-center gap-2 text-success font-display font-bold">
              <Zap size={14} fill="currentColor" />
              BULLISH
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid: Score + Net Worth */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kuber Score Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 glass-cyber rounded-3xl p-8 neon-border-violet flex flex-col items-center justify-center relative overflow-hidden active:scale-[0.99] transition-transform"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Activity className="text-primary animate-pulse" />
          </div>
          <KuberScoreRing score={kuberScore} label={scoreCategory.label} />
          <p className="text-xs text-muted-foreground mt-8 text-center leading-relaxed font-body">
            System analysis: Your <span className="text-primary">{(activeUser.monthlySalary - activeUser.monthlyExpenses) > 0 ? 'Surplus' : 'Deficit'}</span> and <span className="text-secondary">{emergencyMonths}m buffer</span> driving current rating.
          </p>
        </motion.div>

        {/* Net Worth Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-8 glass-cyber rounded-3xl p-8 neon-border-blue relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display font-bold text-xl text-white">Net Worth Trend</h3>
              <p className="text-xs text-muted-foreground">Historical wealth projection</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded border border-success/20">+12.4%</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyExpenseData}>
              <defs>
                <linearGradient id="cyberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c084fc" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000)}k`} />
              <Tooltip
                contentStyle={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                itemStyle={{ color: '#c084fc' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#c084fc" fill="url(#cyberGrad)" strokeWidth={3} animationDuration={2000} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Revenue", value: activeUser.monthlySalary, icon: IndianRupee, glow: "neon-border-violet" },
          { label: "Burn Rate", value: activeUser.monthlyExpenses, icon: Activity, glow: "neon-border-pink" },
          { label: "Reserve", value: activeUser.currentSavings, icon: Shield, glow: "neon-border-blue" },
          { label: "Assets", value: activeUser.currentSavings * 1.5, icon: TrendingUp, glow: "neon-border-violet" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className={`glass-cyber rounded-2xl p-6 ${m.glow} flex items-center justify-between group cursor-pointer hover:-translate-y-1 transition-all`}
          >
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{m.label}</p>
              <h4 className="text-xl font-display font-bold text-white">₹{Math.round(m.value).toLocaleString()}</h4>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/5 group-hover:border-primary/50 transition-all">
              <m.icon size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Markets Heatmap Mock */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-cyber rounded-3xl p-8 neon-border-violet"
      >
        <h3 className="font-display font-bold text-xl text-white mb-6">Market Pulsar</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Object.entries(mockMarketData).map(([name, data]: [string, any]) => (
            <div key={name} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{name}</span>
                <span className={`text-[10px] font-bold ${data.change >= 0 ? 'text-success' : 'text-accent'}`}>
                  {data.change}%
                </span>
              </div>
              <p className="text-lg font-display font-bold text-white group-hover:text-primary transition-colors">
                {typeof data.price === 'number' ? `₹${data.price.toLocaleString()}` : data.price}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

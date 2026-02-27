import { motion } from "framer-motion";
import { Wallet, TrendingUp, PiggyBank, Sparkles, IndianRupee, AlertTriangle, Shield } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import KuberScoreRing from "@/components/KuberScoreRing";
import MetricCard from "@/components/MetricCard";
import { mockUser, calculateKuberScore, getScoreCategory, calculateSalaryAllocation, monthlyExpenseData, mockMarketData } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  // Use real user data or fall back to mock
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome back, <span className="gold-text">{activeUser.name.split(' ')[0]}</span>
        </h1>
        <p className="text-muted-foreground mt-1">Your financial intelligence at a glance</p>
      </motion.div>

      {/* Score + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center border border-primary/20 glow-gold"
        >
          <KuberScoreRing score={kuberScore} label={scoreCategory.label} />
          <p className="text-xs text-muted-foreground mt-4 text-center max-w-[200px]">
            Your savings rate of {Math.round(((activeUser.monthlySalary - activeUser.monthlyExpenses) / activeUser.monthlySalary) * 100)}% and {emergencyMonths} months emergency fund contribute to your score.
          </p>
        </motion.div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <MetricCard icon={IndianRupee} label="Monthly Salary" value={`₹${activeUser.monthlySalary.toLocaleString()}`} variant="gold" />
          <MetricCard icon={Wallet} label="Expenses" value={`₹${activeUser.monthlyExpenses.toLocaleString()}`} sub={`${Math.round((activeUser.monthlyExpenses / activeUser.monthlySalary) * 100)}% of salary`} variant="warning" />
          <MetricCard icon={PiggyBank} label="Savings" value={`₹${activeUser.currentSavings.toLocaleString()}`} sub={`${emergencyMonths} months buffer`} variant="success" />
          <MetricCard icon={Shield} label="EMIs" value={`₹${activeUser.existingEMIs.toLocaleString()}`} sub={`${Math.round((activeUser.existingEMIs / activeUser.monthlySalary) * 100)}% of salary`} variant="destructive" />
        </div>
      </div>

      {/* Expense Trend + Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Expense Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyExpenseData}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 10%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} tickFormatter={(v) => `₹${(v / 1000)}k`} />
              <Tooltip contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: '8px', color: 'hsl(40, 20%, 95%)' }} />
              <Area type="monotone" dataKey="amount" stroke="hsl(43, 96%, 56%)" fill="url(#goldGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-6 border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Smart Salary Split</h3>
          <div className="space-y-4">
            {[
              { label: 'Essentials', amount: allocation.essentials, pct: allocation.essentials / activeUser.monthlySalary, color: 'bg-primary' },
              { label: 'Investments', amount: allocation.investments, pct: allocation.investments / activeUser.monthlySalary, color: 'bg-success' },
              { label: 'Savings', amount: allocation.savings, pct: allocation.savings / activeUser.monthlySalary, color: 'bg-chart-3' },
              { label: 'Lifestyle', amount: allocation.lifestyle, pct: allocation.lifestyle / activeUser.monthlySalary, color: 'bg-chart-4' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground font-medium">₹{item.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Market Glance */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-6 border border-border">
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" /> Market Pulse
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(mockMarketData).map(([key, data]) => (
            <div key={key} className="bg-secondary/50 rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{key}</p>
              <p className="text-xl font-display font-bold text-foreground mt-1">
                {key === 'nifty' || key === 'sensex' ? data.price.toLocaleString() : `₹${data.price.toLocaleString()}`}
                {data.unit && <span className="text-xs text-muted-foreground font-normal ml-1">{data.unit}</span>}
              </p>
              <span className={`text-xs font-medium ${data.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                {data.change >= 0 ? '▲' : '▼'} {Math.abs(data.change)}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

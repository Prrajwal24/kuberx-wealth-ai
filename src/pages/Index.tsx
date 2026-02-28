import { motion } from "framer-motion";
import { Wallet, TrendingUp, PiggyBank, Sparkles, IndianRupee, AlertTriangle, Shield, Target, ShieldCheck, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import KuberScoreRing from "@/components/KuberScoreRing";
import MetricCard from "@/components/MetricCard";
import { mockUser, calculateKuberScore, getScoreCategory, calculateSalaryAllocation, monthlyExpenseData, mockMarketData, mockGoals } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";
import { Progress } from "@/components/ui/progress";

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

  const recommendedEmergencyFund = activeUser.monthlyExpenses * 6;
  const emergencyProgress = Math.min(100, (activeUser.currentSavings / recommendedEmergencyFund) * 100);

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

      {/* Goal Progress + Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Target size={18} className="text-primary" /> Goal Progress Tracker
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Active Goals</span>
          </div>

          <div className="space-y-6 max-h-[280px] overflow-y-auto pr-2 no-scrollbar">
            {mockGoals.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{goal.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-tight">
                        Target: ₹{goal.targetAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-primary">₹{goal.currentAmount.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">({Math.round(progress)}%)</span>
                    </div>
                  </div>
                  <Progress value={progress} className="h-1.5 bg-secondary" />
                </div>
              );
            })}
          </div>
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

      {/* Emergency Fund Status */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-6 border border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ShieldCheck size={120} className="text-success" />
        </div>

        <h3 className="font-display font-semibold text-foreground mb-6 flex items-center gap-2">
          <ShieldCheck size={18} className="text-success" /> Emergency Fund Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Monthly Expense</p>
              <p className="text-2xl font-display font-bold text-foreground">₹{activeUser.monthlyExpenses.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recommended Fund (6x)</p>
              <p className="text-2xl font-display font-bold text-success">₹{recommendedEmergencyFund.toLocaleString()}</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Current Saved</p>
                <p className="text-4xl font-display font-bold text-foreground">₹{activeUser.currentSavings.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-full inline-block">
                  {Math.round(emergencyProgress)}% Complete
                </p>
              </div>
            </div>

            <div className="relative pt-2">
              <Progress value={emergencyProgress} className="h-4 bg-secondary shadow-inner" />
              <div className="flex justify-between mt-2 text-[9px] font-bold uppercase tracking-tighter text-muted-foreground px-1">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            {emergencyProgress >= 100 ? (
              <div className="flex items-center gap-2 text-success text-xs font-bold mt-2">
                <CheckCircle2 size={14} /> You have reached your recommended emergency fund goal!
              </div>
            ) : (
              <div className="flex items-center gap-2 text-warning text-xs font-bold mt-2">
                <AlertTriangle size={14} /> You need ₹{(recommendedEmergencyFund - activeUser.currentSavings).toLocaleString()} more for full security.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

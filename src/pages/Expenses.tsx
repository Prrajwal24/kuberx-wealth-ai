import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { AlertTriangle, Lightbulb, TrendingUp, IndianRupee, MinusCircle, PlusCircle } from "lucide-react";
import { expenseByCategory, mockUser, mockExpenses } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

export default function Expenses() {
  const [expenses, setExpenses] = useState(expenseByCategory);
  const [reductionPct, setReductionPct] = useState([0]);

  const totalExpenses = useMemo(() => expenses.reduce((sum, e) => sum + e.value, 0), [expenses]);
  const monthlyIncome = mockUser.monthlySalary;
  const remainingIncome = monthlyIncome - totalExpenses;

  const handleExpenseChange = (name: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setExpenses(prev => prev.map(e => e.name === name ? { ...e, value: numValue } : e));
  };

  const insights = useMemo(() => {
    const list = [];

    // Rule 1: Category > 30% of income
    expenses.forEach(e => {
      if (e.value > monthlyIncome * 0.3) {
        list.push({
          type: 'warning',
          icon: AlertTriangle,
          color: 'text-pink-500',
          bgColor: 'bg-pink-500/10',
          borderColor: 'border-pink-500/20',
          text: `${e.name} spending is higher than recommended levels (>${Math.round((e.value / monthlyIncome) * 100)}% of income)`
        });
      }
    });

    // Rule 2: Remaining Income > 0
    if (remainingIncome > 0) {
      list.push({
        type: 'suggestion',
        icon: Lightbulb,
        color: 'text-violet-400',
        bgColor: 'bg-violet-400/10',
        borderColor: 'border-violet-400/20',
        text: `You can potentially save ₹${remainingIncome.toLocaleString()} per month`
      });
    }

    // Rule 3: Discretionary > 25% (Shopping + Food Delivery + Lifestyle)
    const discretionaryKeys = ['Shopping', 'Food Delivery', 'Lifestyle'];
    const discretionaryTotal = expenses
      .filter(e => discretionaryKeys.includes(e.name))
      .reduce((sum, e) => sum + e.value, 0);

    if (discretionaryTotal > monthlyIncome * 0.25) {
      list.push({
        type: 'opportunity',
        icon: TrendingUp,
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        borderColor: 'border-blue-400/20',
        text: `Reducing discretionary spending could significantly boost savings`
      });
    }

    return list;
  }, [expenses, monthlyIncome, remainingIncome]);

  const discretionaryTotal = expenses
    .filter(e => ['Shopping', 'Food Delivery', 'Lifestyle'].includes(e.name))
    .reduce((sum, e) => sum + e.value, 0);

  const potentialMonthlySavings = Math.round((discretionaryTotal * reductionPct[0]) / 100);
  const yearlySavings = potentialMonthlySavings * 12;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">Expense Advisor</h1>
        <p className="text-muted-foreground mt-1">Optimize your outflow with AI-powered intelligence</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Input Grid */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-2xl p-6 border border-white/10 h-full">
          <h3 className="font-display font-semibold text-foreground mb-6 flex items-center gap-2">
            <IndianRupee size={18} className="text-primary" /> Modify Expenses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expenses.map((e) => (
              <div key={e.name} className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">{e.name}</label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: e.fill }} />
                  <Input
                    type="number"
                    value={e.value}
                    onChange={(evt) => handleExpenseChange(e.name, evt.target.value)}
                    className="pl-8 h-10 bg-white/5 border-white/5 focus-visible:ring-primary/20 rounded-xl font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider text-primary">
              <span>Total Expenses</span>
              <span>₹{totalExpenses.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Pie Chart */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center relative z-10">
          <h3 className="font-display font-semibold text-foreground mb-4 self-start">Interactive Breakdown</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={expenses}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={110}
                paddingAngle={4}
                strokeWidth={0}
                animationDuration={1000}
                activeShape={{
                  stroke: "#c084fc",
                  strokeWidth: 3,
                }}
              >
                {expenses.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a0a0c",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  backdropFilter: "blur(10px)",
                  color: "#ffffff"
                }}
                labelStyle={{ color: "#c084fc" }}
                itemStyle={{ color: "#ffffff", fontSize: '12px', fontWeight: 'bold' }}
                formatter={(value: number) => {
                  const percentage = ((value / totalExpenses) * 100).toFixed(1);
                  return [`₹${value.toLocaleString()} (${percentage}%)`, 'Amount'];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 px-4">
            {expenses.map((e) => (
              <div key={e.name} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                <div className="w-2 h-2 rounded-full" style={{ background: e.fill }} />
                {e.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insights Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key="insights"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-8 border border-white/10 backdrop-blur-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Lightbulb size={120} className="text-violet-400" />
          </div>

          <h3 className="text-xl font-display font-bold text-foreground mb-8 flex items-center gap-3">
            <Sparkles className="text-violet-400 animate-pulse" size={24} /> AI Spending Insights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.length > 0 ? insights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 rounded-2xl border ${insight.borderColor} ${insight.bgColor} flex items-start gap-4`}
              >
                <div className={`p-2 rounded-xl bg-white/5 ${insight.color}`}>
                  <insight.icon size={20} />
                </div>
                <p className="text-sm font-medium leading-relaxed text-foreground/90">{insight.text}</p>
              </motion.div>
            )) : (
              <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-muted-foreground italic">Analyzing your spending patterns... Start tweaking the values above!</p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* What-If Simulator */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-3xl p-8 border border-white/10 bg-white/[0.02]">
        <div className="flex flex-col md:row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">What If Savings Simulator</h3>
            <p className="text-sm text-muted-foreground mt-1">See how much you could save by cutting discretionary spends</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Potential Yearly Savings</p>
            <p className="text-4xl font-display font-bold gold-text">₹{yearlySavings.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                <MinusCircle size={14} className="text-destructive" /> Reduce discretionary spending
              </span>
              <span className="text-2xl font-bold text-primary">{reductionPct[0]}%</span>
            </div>
            <Slider
              value={reductionPct}
              onValueChange={setReductionPct}
              max={50}
              step={1}
              className="py-4 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
              <span>0% Reduction</span>
              <span>25% Optimization</span>
              <span>50% Max Saving</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center shadow-lg">
                <TrendingUp className="text-primary-foreground" size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Discretionary Spend Impact</p>
                <p className="text-xs text-muted-foreground">Cutting ₹{discretionaryTotal.toLocaleString()} by {reductionPct[0]}%</p>
              </div>
            </div>
            <div className="h-px w-full md:w-20 bg-white/10 hidden md:block" />
            <div className="text-center md:text-right">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">New Monthly Surplus</p>
              <p className="text-xl font-display font-bold text-success">₹{(remainingIncome + potentialMonthlySavings).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Sparkles({ className, size }: { className?: string, size?: number }) {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}


import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";
import { AlertTriangle, TrendingDown, CreditCard, Wallet, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { expenseByCategory, monthlyExpenseData, mockExpenses } from "@/lib/mockData";

const leaks = [
  { label: "Food delivery spending is ₹6,000/mo — 14% of expenses", severity: "high" },
  { label: "Savings rate below 50% threshold", severity: "medium" },
  { label: "Subscription costs could be optimized", severity: "low" },
];

export default function Expenses() {
  const total = expenseByCategory.reduce((s, e) => s + e.value, 0);

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 px-4">
      {/* Header */}
      <div className="relative">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 bg-primary rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Financial Intelligence</span>
          </div>
          <h1 className="text-5xl font-display font-black text-white tracking-tighter uppercase">Finance <span className="glow-text-violet">Tracker</span></h1>
          <p className="text-muted-foreground text-lg font-medium max-w-2xl">Real-time expenditure analysis and neural leak detection for capital preservation.</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-cyber rounded-3xl p-6 border neon-border-violet group hover:bg-white/5 transition-all">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">Total Monthly Burn</p>
          <p className="text-3xl font-display font-black text-white flex items-baseline gap-2">
            ₹{total.toLocaleString()}
            <span className="text-xs font-bold text-destructive flex items-center gap-1 bg-destructive/10 px-1.5 py-0.5 rounded">
              <ArrowUpRight size={12} /> 12%
            </span>
          </p>
          <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-primary" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-cyber rounded-3xl p-6 border neon-border-blue group hover:bg-white/5 transition-all">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-secondary transition-colors">Average Daily Spend</p>
          <p className="text-3xl font-display font-black text-white flex items-baseline gap-2">
            ₹{(total / 30).toFixed(0).toLocaleString()}
            <span className="text-xs font-bold text-success flex items-center gap-1 bg-success/10 px-1.5 py-0.5 rounded">
              <ArrowDownRight size={12} /> 4%
            </span>
          </p>
          <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-secondary" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-cyber rounded-3xl p-6 border neon-border-pink group hover:bg-white/5 transition-all">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-accent transition-colors">Net Capital Growth</p>
          <p className="text-3xl font-display font-black text-white flex items-baseline gap-2 tracking-tighter">
            POSITIVE
            <Activity size={24} className="text-accent ml-2 animate-pulse" />
          </p>
          <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-accent shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-cyber rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <CreditCard size={120} />
          </div>
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-xl font-display font-bold text-white tracking-wide">Category Allocation</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono text-primary/70">REAL-TIME DATA</span>
            </div>
          </div>

          <div className="relative">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={expenseByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  strokeWidth={0}
                >
                  {expenseByCategory.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} className="hover:opacity-80 transition-opacity outline-none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10, 10, 12, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    backdropBlur: '12px',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                  formatter={(v: number) => `₹${v.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Aggregate</p>
              <p className="text-3xl font-display font-black text-white">₹{total.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {expenseByCategory.map((e) => (
              <div key={e.name} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                <div className="w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]" style={{ background: e.fill, color: e.fill }} />
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-tighter truncate">{e.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bar Chart Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-cyber rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <TrendingDown size={120} />
          </div>
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-xl font-display font-bold text-white tracking-wide">Temporal Progression</h3>
            <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
              <TrendingDown size={18} className="text-secondary" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyExpenseData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity={1} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.3)"
                fontSize={10}
                className="font-bold uppercase tracking-widest"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                fontSize={10}
                tickFormatter={(v) => `₹${v / 1000}k`}
                tickLine={false}
                axisLine={false}
                className="font-bold"
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 12 }}
                contentStyle={{
                  background: 'rgba(10, 10, 12, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  backdropBlur: '12px'
                }}
                itemStyle={{ color: '#c084fc', fontSize: '14px', fontWeight: 'bold' }}
              />
              <Bar dataKey="amount" fill="url(#barGradient)" radius={[10, 10, 4, 4]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Expenses List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-8 glass-cyber rounded-[2.5rem] p-8 border border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-display font-bold text-white tracking-wide">Ledger Synchronization</h3>
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 transition-all">Export Report</button>
          </div>

          <div className="space-y-4">
            {mockExpenses.slice(0, 7).map((e, idx) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx }}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                    {/* Replace with category icons if available */}
                    <Wallet size={20} className="text-primary/70" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{e.name}</p>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{e.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-display font-black text-white group-hover:scale-110 origin-right transition-transform">₹{e.amount.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground font-medium italic">Synchronized 2h ago</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leak Detection Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-4 glass-cyber rounded-[2.5rem] p-8 border neon-border-pink relative overflow-hidden h-fit"
        >
          <div className="absolute -top-10 -right-10 p-10 opacity-10 bg-destructive/20 rounded-full blur-3xl animate-pulse" />

          <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3 relative z-10">
            <AlertTriangle size={24} className="text-pink-500" /> NEURAL LEAKS
          </h3>

          <div className="space-y-5 relative z-10">
            {leaks.map((leak, i) => (
              <div key={i} className={`p-5 rounded-2xl border transition-all hover:translate-x-1 ${leak.severity === 'high' ? 'bg-destructive/10 border-destructive/20' :
                  leak.severity === 'medium' ? 'bg-warning/10 border-warning/20' : 'bg-white/5 border-white/10'
                }`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${leak.severity === 'high' ? 'text-destructive bg-destructive' :
                      leak.severity === 'medium' ? 'text-warning bg-warning' : 'text-blue-400 bg-blue-400'
                    }`} />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">{leak.severity} PRIORITY</span>
                </div>
                <p className="text-sm text-white/90 font-medium leading-relaxed">{leak.label}</p>
              </div>
            ))}
          </div>

          <Button className="w-full mt-8 h-14 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(244,114,182,0.3)] group transition-all">
            Initialize Wealth Optimizer
            <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Wallet, Activity, Target, Zap, ShieldCheck, ArrowRight, PieChart as PieIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockUser, calculateSalaryAllocation } from "@/lib/mockData";

const allocation = calculateSalaryAllocation(mockUser);
const data = [
  { name: 'Essentials', value: allocation.essentials, fill: '#3b82f6' },
  { name: 'Investments', value: allocation.investments, fill: '#c084fc' },
  { name: 'Savings', value: allocation.savings, fill: '#22c55e' },
  { name: 'Lifestyle', value: allocation.lifestyle, fill: '#f472b6' },
];

const rules = [
  { text: "Emergency fund < 6 months → Savings increased by 5%", icon: <ShieldCheck size={14} className="text-success" /> },
  { text: "EMI burden moderate → Lifestyle reduced by 3%", icon: <Zap size={14} className="text-primary" /> },
  { text: "Goal timeline < 3 years detected → Investment weight maintained", icon: <Target size={14} className="text-secondary" /> },
];

export default function Allocation() {
  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20 px-4">
      {/* Header */}
      <div className="relative space-y-4">
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-10 bg-primary/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Capital Distribution Matrix</span>
            </div>
            <h1 className="text-5xl font-display font-black text-white tracking-tighter uppercase">Smart <span className="text-primary glow-text-violet">Allocation</span></h1>
            <p className="text-muted-foreground text-lg font-medium">Neural split of ₹{mockUser.monthlySalary.toLocaleString()} monthly inflow for optimal wealth construction.</p>
          </div>

          <div className="glass-cyber px-6 py-3 rounded-2xl border neon-border-blue flex items-center gap-4">
            <div className="text-right">
              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Target Yield</p>
              <p className="text-xl font-display font-black text-white">12.4% <span className="text-xs text-primary">APV</span></p>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <PieIcon className="text-primary" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Visualization Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-7 glass-cyber rounded-[3rem] p-10 border neon-border-violet relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[400px]">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={110}
                  outerRadius={150}
                  paddingAngle={8}
                  strokeWidth={0}
                >
                  {data.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.fill}
                      className="hover:opacity-80 transition-all duration-300 outline-none"
                      style={{ filter: `drop-shadow(0 0 10px ${entry.fill}44)` }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10, 10, 12, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1.5rem',
                    backdropBlur: '12px',
                    boxShadow: '0 0 30px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'black' }}
                  formatter={(v: number) => [`₹${v.toLocaleString()}`, 'VALUE']}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-1">Monthly Peak</p>
              <p className="text-4xl font-display font-black text-white tracking-tighter">₹{mockUser.monthlySalary.toLocaleString()}</p>
              <div className="mt-2 h-[1px] w-20 bg-primary/20" />
            </div>
          </div>
        </motion.div>

        {/* Data Col */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            {data.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-cyber rounded-2xl p-6 border border-white/5 flex items-center justify-between group hover:border-white/10 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor]" style={{ background: item.fill, color: item.fill }} />
                  <div>
                    <p className="text-xs font-black text-white uppercase tracking-widest">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.1em]">{Math.round((item.value / mockUser.monthlySalary) * 100)}% Allocation Share</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display font-black text-white group-hover:scale-110 origin-right transition-transform">₹{item.value.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-cyber rounded-[2.5rem] p-8 border neon-border-blue relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Activity size={80} className="text-secondary" />
            </div>

            <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <ShieldCheck size={14} /> Applied Strategic Protocols
            </h3>

            <div className="space-y-4">
              {rules.map((r, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                  <div className="mt-1 transition-transform group-hover:rotate-12">{r.icon}</div>
                  <p className="text-xs text-white/70 font-bold uppercase tracking-tight leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

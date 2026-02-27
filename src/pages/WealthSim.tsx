import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Zap, Activity, Target, Shield, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calculateFutureWealth, mockUser } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function WealthSim() {
  const [salary, setSalary] = useState(mockUser.monthlySalary.toString());
  const [increment, setIncrement] = useState("10");
  const [sip, setSip] = useState("15000");
  const [inflation, setInflation] = useState("6");
  const [data, setData] = useState(calculateFutureWealth(mockUser.monthlySalary, 10, 15000, 6, 20));

  const handleSimulate = () => {
    setData(calculateFutureWealth(Number(salary), Number(increment), Number(sip), Number(inflation), 20));
  };

  const milestones = [5, 10, 20].map(y => {
    const point = data.find(d => d.year === y);
    return { year: y, nominal: point?.nominal || 0, real: point?.real || 0 };
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 px-4 relative">
      {/* Background Atmosphere */}
      <div className="absolute -top-40 -left-60 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary border border-primary/20 font-bold tracking-widest uppercase">Neural Simulation Engine</div>
            <div className="h-[1px] w-12 bg-primary/20" />
          </div>
          <h1 className="text-5xl font-display font-black text-white tracking-tighter uppercase whitespace-pre-wrap">Wealth <span className="glow-text-violet">Projection</span></h1>
          <p className="text-muted-foreground text-lg font-medium max-w-2xl">Execute temporal simulations of capital growth under various inflationary vectors.</p>
        </div>

        <div className="glass-cyber p-4 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Zap size={24} className="text-primary fill-current" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Projection Speed</p>
            <p className="text-sm font-bold text-white uppercase italic">Instantaneous</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Parameters Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 glass-cyber rounded-[2.5rem] p-8 border neon-border-violet relative overflow-hidden group"
        >
          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-display font-black text-white tracking-wide flex items-center gap-2">
                <Activity size={20} className="text-primary" /> PARAMETERS
              </h3>
              <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            </div>

            <div className="space-y-6">
              {[
                { label: "Monthly Base Salary (₹)", value: salary, set: setSalary, icon: <Activity size={12} /> },
                { label: "Annual Increment Rate (%)", value: increment, set: setIncrement, icon: <TrendingUp size={12} /> },
                { label: "Strategic SIP (₹)", value: sip, set: setSip, icon: <Target size={12} /> },
                { label: "Inflation Deflator (%)", value: inflation, set: setInflation, icon: <Shield size={12} /> },
              ].map((f) => (
                <div key={f.label} className="space-y-3 group/field">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2 group-hover/field:text-primary transition-colors">
                    {f.icon} {f.label}
                  </label>
                  <div className="relative">
                    <Input
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      type="number"
                      className="h-14 bg-black/40 border-white/10 text-white rounded-xl text-lg font-bold focus:border-primary/40 transition-all font-mono pl-4"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/20">INPUT_OK</div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleSimulate}
              className="w-full h-16 rounded-2xl bg-primary text-black font-display font-black text-xl shadow-[0_0_30px_rgba(192,132,252,0.3)] hover:shadow-[0_0_50px_rgba(192,132,252,0.5)] transition-all active:scale-[0.98] mt-4"
            >
              GENERATE PROJECTION
            </Button>
          </div>
        </motion.div>

        {/* Chart Viewport */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 glass-cyber rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden group flex flex-col"
        >
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity">
            <TrendingUp size={240} />
          </div>

          <div className="flex items-center justify-between mb-10 relative z-10">
            <div className="space-y-1">
              <h3 className="text-2xl font-display font-black text-white tracking-wide">Growth Trajectory</h3>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">Temporal Delta Resolution</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_rgba(192,132,252,0.5)]" />
                <span className="text-[10px] font-black text-white/50 uppercase">Nominal Capital</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] font-black text-white/50 uppercase">Real Power</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="nomGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis
                  dataKey="year"
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={10}
                  className="font-bold uppercase tracking-widest"
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={10}
                  tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                  className="font-bold"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10, 10, 12, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    backdropBlur: '12px'
                  }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'black' }}
                  formatter={(v: number) => `₹${v.toLocaleString()}`}
                />
                <Area type="monotone" dataKey="nominal" name="Nominal Value" stroke="#c084fc" fill="url(#nomGrad)" strokeWidth={4} animationDuration={2000} />
                <Area type="monotone" dataKey="real" name="Purchasing Power" stroke="#22c55e" fill="url(#realGrad)" strokeWidth={4} animationDuration={2500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Milestone Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {milestones.map((m, idx) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (idx * 0.1) }}
            className="glass-cyber rounded-[2rem] p-8 border border-white/5 relative group hover:border-primary/20 transition-all cursor-default"
          >
            {/* Holographic Badge */}
            <div className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-white/60">
              Temporal Milestone
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">Year {m.year}</p>
                <ArrowUpRight size={18} className="text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <div className="space-y-1">
                <p className="text-4xl font-display font-black text-white tracking-tighter">
                  ₹{(m.nominal / 100000).toFixed(1)}L
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Power:</span>
                  <span className="text-xs font-bold text-success">₹{(m.real / 100000).toFixed(1)}L Real</span>
                </div>
              </div>

              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                  className="h-full bg-primary/40 group-hover:bg-primary transition-colors"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Advisory Message */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="glass-cyber rounded-[2.5rem] p-10 border border-white/5 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="w-16 h-16 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center shrink-0">
          <Shield size={32} className="text-success" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-xl font-display font-black text-white uppercase tracking-wide">Projection Integrity Secure</h4>
          <p className="text-muted-foreground font-medium max-w-3xl">This simulation utilizes the <span className="text-white font-bold">Kuber-Delta v4.2</span> algorithm. Note: Projections are mathematical extrusions and do not account for external market phase-shifts or neural link interruptions.</p>
        </div>
      </motion.div>
    </div>
  );
}

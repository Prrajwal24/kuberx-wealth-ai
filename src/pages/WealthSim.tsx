import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Zap, Target, Shield, Rocket, Flame, ArrowUpRight, Info } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calculateFutureWealth, mockUser } from "@/lib/mockData";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WealthSim() {
  const [salary, setSalary] = useState([mockUser.monthlySalary]);
  const [increment, setIncrement] = useState([10]);
  const [sip, setSip] = useState([15000]);
  const [inflation, setInflation] = useState([6]);

  const data = useMemo(() => {
    return calculateFutureWealth(salary[0], increment[0], sip[0], inflation[0], 25);
  }, [salary, increment, sip, inflation]);

  const milestones = [5, 10, 25].map(y => {
    const point = data.find(d => d.year === y);
    return { year: y, nominal: point?.nominal || 0, real: point?.real || 0 };
  });

  const setScenario = (type: 'fire' | 'aggressive' | 'stable') => {
    switch (type) {
      case 'fire':
        setIncrement([15]);
        setSip([Math.round(salary[0] * 0.4)]);
        break;
      case 'aggressive':
        setIncrement([12]);
        setSip([Math.round(salary[0] * 0.25)]);
        break;
      case 'stable':
        setIncrement([8]);
        setSip([Math.round(salary[0] * 0.15)]);
        break;
    }
  };

  return (
    <div className="space-y-10 max-w-[1400px] mx-auto pb-20 px-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground tracking-tight">
            Wealth Sim
          </h1>
          <p className="text-primary font-medium mt-3 text-lg">
            Visualize your journey to financial freedom
          </p>
        </div>
        <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
          <Button variant="ghost" size="sm" onClick={() => setScenario('stable')} className="rounded-xl px-4 text-xs font-bold hover:bg-white/10">Defensive</Button>
          <Button variant="ghost" size="sm" onClick={() => setScenario('aggressive')} className="rounded-xl px-4 text-xs font-bold hover:bg-white/10">Aggressive</Button>
          <Button variant="ghost" size="sm" onClick={() => setScenario('fire')} className="rounded-xl px-4 text-xs font-bold bg-primary/20 text-primary border border-primary/20">F.I.R.E</Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-3xl p-8 border border-white/10 space-y-10">
            <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              <Zap size={20} className="text-primary" /> Parameters
            </h3>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Monthly Salary</label>
                  <span className="text-lg font-black text-primary">₹{salary[0].toLocaleString()}</span>
                </div>
                <Slider value={salary} onValueChange={setSalary} max={500000} min={10000} step={5000} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Annual Increment</label>
                  <span className="text-lg font-black text-primary">{increment[0]}%</span>
                </div>
                <Slider value={increment} onValueChange={setIncrement} max={50} min={0} step={1} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Monthly SIP</label>
                  <span className="text-lg font-black text-secondary">₹{sip[0].toLocaleString()}</span>
                </div>
                <Slider value={sip} onValueChange={setSip} max={200000} min={1000} step={1000} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Inflation Rate</label>
                  <span className="text-lg font-black text-muted-foreground">{inflation[0]}%</span>
                </div>
                <Slider value={inflation} onValueChange={setInflation} max={15} min={0} step={0.5} />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <Info size={16} className="text-primary shrink-0" />
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Calculations assume a standard **12% annual return** on your SIP investments.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Projection Column */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-display font-bold text-foreground">Wealth Projection</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Nominal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">In Today's Value</span>
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="nomGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c084fc" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#c084fc" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="year"
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `Year ${v}`}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => (v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` : `₹${(v / 100000).toFixed(0)}L`)}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#0a0a0c',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(v: number) => `₹${v.toLocaleString()}`}
                  />
                  <Area type="monotone" dataKey="nominal" name="Nominal Wealth" stroke="#c084fc" fill="url(#nomGrad)" strokeWidth={3} />
                  <Area type="monotone" dataKey="real" name="Inflation Adjusted" stroke="#22c55e" fill="url(#realGrad)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Milestones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="glass-card rounded-2xl p-6 border border-white/5 relative group hover:border-primary/30 transition-all"
              >
                <div className="absolute top-4 right-4 text-white/5 group-hover:text-primary/20 transition-colors">
                  {m.year === 5 ? <Target size={32} /> : m.year === 10 ? <Shield size={32} /> : <Rocket size={32} />}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">In {m.year} Years</p>
                <p className="text-3xl font-display font-black text-foreground">
                  {m.nominal >= 10000000 ? `₹${(m.nominal / 10000000).toFixed(1)} Cr` : `₹${(m.nominal / 100000).toFixed(1)} L`}
                </p>
                <div className="mt-4 flex flex-col gap-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Real Value (Adjusted)</p>
                  <p className="text-sm font-bold text-success">
                    {m.real >= 10000000 ? `₹${(m.real / 10000000).toFixed(1)} Cr` : `₹${(m.real / 100000).toFixed(1)} L`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

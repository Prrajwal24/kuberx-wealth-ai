import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calculateFutureWealth, mockUser } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
          <TrendingUp className="text-primary" /> Future Wealth Simulator
        </h1>
        <p className="text-muted-foreground mt-1">See your net worth grow over time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-6 border border-border space-y-4">
          <h3 className="font-display font-semibold text-foreground">Parameters</h3>
          {[
            { label: "Monthly Salary (₹)", value: salary, set: setSalary },
            { label: "Annual Increment (%)", value: increment, set: setIncrement },
            { label: "Monthly SIP (₹)", value: sip, set: setSip },
            { label: "Inflation (%)", value: inflation, set: setInflation },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
              <Input value={f.value} onChange={(e) => f.set(e.target.value)} type="number" className="bg-secondary border-border text-foreground" />
            </div>
          ))}
          <Button onClick={handleSimulate} className="w-full gold-gradient text-primary-foreground font-semibold">
            Simulate
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass-card rounded-2xl p-6 border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Wealth Growth Projection</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="nomGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="year" stroke="hsl(220, 10%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: '8px', color: 'hsl(40, 20%, 95%)' }} formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Legend />
              <Area type="monotone" dataKey="nominal" name="Nominal" stroke="hsl(43, 96%, 56%)" fill="url(#nomGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="real" name="Inflation-adjusted" stroke="hsl(142, 71%, 45%)" fill="url(#realGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {milestones.map((m) => (
          <motion.div key={m.year} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5 border border-border text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">In {m.year} years</p>
            <p className="text-xl font-display font-bold gold-text mt-1">₹{(m.nominal / 100000).toFixed(1)}L</p>
            <p className="text-xs text-muted-foreground">Real: ₹{(m.real / 100000).toFixed(1)}L</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

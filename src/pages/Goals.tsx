import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockGoals } from "@/lib/mockData";

function projectGrowth(current: number, monthly: number, years: number, rate: number) {
  const data = [];
  let val = current;
  for (let y = 0; y <= years; y++) {
    data.push({ year: y, value: Math.round(val) });
    val = (val + monthly * 12) * (1 + rate);
  }
  return data;
}

export default function Goals() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Goal Planner</h1>
        <p className="text-muted-foreground mt-1">Plan and track your financial milestones</p>
      </div>

      {mockGoals.map((goal, idx) => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        const conservative = projectGrowth(goal.currentAmount, goal.monthlyRequired, goal.timeline, 0.08);
        const balanced = projectGrowth(goal.currentAmount, goal.monthlyRequired, goal.timeline, 0.12);
        const aggressive = projectGrowth(goal.currentAmount, goal.monthlyRequired, goal.timeline, 0.15);

        return (
          <motion.div key={goal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.15 }} className="glass-card rounded-2xl p-6 border border-border">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-foreground">{goal.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">Target: ₹{goal.targetAmount.toLocaleString()} in {goal.timeline} years</p>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full gold-gradient" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.5 }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Saved</p>
                    <p className="text-lg font-display font-bold text-foreground">₹{goal.currentAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Monthly SIP</p>
                    <p className="text-lg font-display font-bold text-primary">₹{goal.monthlyRequired.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                    <XAxis dataKey="year" stroke="hsl(220, 10%, 55%)" fontSize={12} />
                    <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: '8px', color: 'hsl(40, 20%, 95%)' }} formatter={(v: number) => `₹${v.toLocaleString()}`} />
                    <Legend />
                    <Line data={conservative} type="monotone" dataKey="value" name="8% Conservative" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} />
                    <Line data={balanced} type="monotone" dataKey="value" name="12% Balanced" stroke="hsl(43, 96%, 56%)" strokeWidth={2} dot={false} />
                    <Line data={aggressive} type="monotone" dataKey="value" name="15% Aggressive" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

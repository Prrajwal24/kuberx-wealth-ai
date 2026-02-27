import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockUser, calculateSalaryAllocation } from "@/lib/mockData";

const allocation = calculateSalaryAllocation(mockUser);
const data = [
  { name: 'Essentials', value: allocation.essentials, fill: 'hsl(43, 96%, 56%)' },
  { name: 'Investments', value: allocation.investments, fill: 'hsl(142, 71%, 45%)' },
  { name: 'Savings', value: allocation.savings, fill: 'hsl(217, 91%, 60%)' },
  { name: 'Lifestyle', value: allocation.lifestyle, fill: 'hsl(280, 65%, 60%)' },
];

const rules = [
  "Emergency fund < 6 months → Savings increased by 5%",
  "EMI burden moderate → Lifestyle reduced by 3%",
  "Goal timeline < 3 years detected → Investment weight maintained",
];

export default function Allocation() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
          <Wallet className="text-primary" /> Smart Salary Allocation
        </h1>
        <p className="text-muted-foreground mt-1">AI-powered salary split for ₹{mockUser.monthlySalary.toLocaleString()}/month</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-6 border border-primary/20 glow-gold">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} strokeWidth={0}>
                {data.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: '8px', color: 'hsl(40, 20%, 95%)' }} formatter={(v: number) => `₹${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="space-y-3">
          {data.map((item, idx) => (
            <motion.div key={item.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="glass-card rounded-xl p-4 border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ background: item.fill }} />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{Math.round((item.value / mockUser.monthlySalary) * 100)}% of salary</p>
                </div>
              </div>
              <p className="text-lg font-display font-bold text-foreground">₹{item.value.toLocaleString()}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-6 border border-border">
        <h3 className="font-display font-semibold text-foreground mb-3">AI Allocation Rules Applied</h3>
        <div className="space-y-2">
          {rules.map((r, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="text-primary mt-0.5">→</span> {r}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

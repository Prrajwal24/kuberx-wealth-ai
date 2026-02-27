import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AlertTriangle } from "lucide-react";
import { expenseByCategory, monthlyExpenseData, mockExpenses } from "@/lib/mockData";

const leaks = [
  { label: "Food delivery spending is ₹6,000/mo — 14% of expenses", severity: "high" },
  { label: "Savings rate below 50% threshold", severity: "medium" },
  { label: "Subscription costs could be optimized", severity: "low" },
];

export default function Expenses() {
  const total = expenseByCategory.reduce((s, e) => s + e.value, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Expense Tracker</h1>
        <p className="text-muted-foreground mt-1">Track, analyze, and optimize your spending</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-6 border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={expenseByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} strokeWidth={0}>
                {expenseByCategory.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: '8px', color: 'hsl(40, 20%, 95%)' }} formatter={(v: number) => `₹${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {expenseByCategory.map((e) => (
              <div key={e.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: e.fill }} />
                {e.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trend */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyExpenseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 10%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: '8px', color: 'hsl(40, 20%, 95%)' }} />
              <Bar dataKey="amount" fill="hsl(43, 96%, 56%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Leak alerts */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 border border-destructive/20">
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-destructive" /> Wealth Leak Alerts
        </h3>
        <div className="space-y-3">
          {leaks.map((leak, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${leak.severity === 'high' ? 'bg-destructive/10' : leak.severity === 'medium' ? 'bg-warning/10' : 'bg-secondary'}`}>
              <div className={`w-2 h-2 rounded-full mt-1.5 ${leak.severity === 'high' ? 'bg-destructive' : leak.severity === 'medium' ? 'bg-warning' : 'bg-muted-foreground'}`} />
              <p className="text-sm text-foreground">{leak.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-6 border border-border">
        <h3 className="font-display font-semibold text-foreground mb-4">Recent Expenses</h3>
        <div className="space-y-2">
          {mockExpenses.slice(0, 6).map((e) => (
            <div key={e.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{e.name}</p>
                <p className="text-xs text-muted-foreground">{e.category}</p>
              </div>
              <span className="text-sm font-semibold text-foreground">₹{e.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

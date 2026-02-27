import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { mockUser } from "@/lib/mockData";

export default function Emergency() {
  const survivalMonths = Math.round((mockUser.currentSavings / mockUser.monthlyExpenses) * 10) / 10;
  const maxMonths = 12;
  const pct = Math.min((survivalMonths / maxMonths) * 100, 100);

  const getStatus = () => {
    if (survivalMonths < 3) return { label: 'Critical', color: 'destructive', desc: 'You need to build an emergency fund immediately.' };
    if (survivalMonths < 6) return { label: 'At Risk', color: 'warning', desc: 'You are below the recommended 6-month buffer.' };
    return { label: 'Safe', color: 'success', desc: 'Your emergency fund covers 6+ months. Well done!' };
  };

  const status = getStatus();

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
          <Shield className="text-primary" /> Emergency Survival
        </h1>
        <p className="text-muted-foreground mt-1">How long can you survive without income?</p>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`glass-card rounded-2xl p-10 border border-${status.color}/30 text-center`}>
        <motion.p className="text-7xl font-display font-bold text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {survivalMonths}
        </motion.p>
        <p className="text-lg text-muted-foreground mt-2">months of survival</p>

        <div className="mt-6 max-w-xs mx-auto">
          <div className="h-4 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${status.color === 'success' ? 'bg-success' : status.color === 'warning' ? 'bg-warning' : 'bg-destructive'}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>6 (recommended)</span>
            <span>12+</span>
          </div>
        </div>

        <div className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
          status.color === 'success' ? 'bg-success/15 text-success' :
          status.color === 'warning' ? 'bg-warning/15 text-warning' :
          'bg-destructive/15 text-destructive'
        }`}>
          {status.label}
        </div>
        <p className="text-sm text-muted-foreground mt-3">{status.desc}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 border border-border">
        <h3 className="font-display font-semibold text-foreground mb-3">Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Total Savings</p>
            <p className="text-xl font-display font-bold text-foreground">₹{mockUser.currentSavings.toLocaleString()}</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Monthly Expenses</p>
            <p className="text-xl font-display font-bold text-foreground">₹{mockUser.monthlyExpenses.toLocaleString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  variant?: 'default' | 'gold' | 'success' | 'warning' | 'destructive';
}

const variantStyles = {
  default: "border-border",
  gold: "border-primary/30 glow-gold",
  success: "border-success/30 glow-success",
  warning: "border-warning/30",
  destructive: "border-destructive/30 glow-destructive",
};

const iconVariants = {
  default: "bg-secondary text-secondary-foreground",
  gold: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  destructive: "bg-destructive/15 text-destructive",
};

export default function MetricCard({ icon: Icon, label, value, sub, variant = 'default' }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card rounded-xl p-5 border ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl font-display font-bold text-foreground">{value}</p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconVariants[variant]}`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}

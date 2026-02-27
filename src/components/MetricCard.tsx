import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  variant?: 'default' | 'violet' | 'blue' | 'pink';
}

const variantStyles = {
  default: "neon-border-violet",
  violet: "neon-border-violet",
  blue: "neon-border-blue",
  pink: "neon-border-pink",
};

const iconStyles = {
  default: "text-primary bg-primary/10 border-primary/20",
  violet: "text-primary bg-primary/10 border-primary/20",
  blue: "text-secondary bg-secondary/10 border-secondary/20",
  pink: "text-accent bg-accent/10 border-accent/20",
};

export default function MetricCard({ icon: Icon, label, value, sub, variant = 'default' }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`glass-cyber rounded-2xl p-6 border ${variantStyles[variant]} group cursor-default transition-all duration-300 relative overflow-hidden`}
    >
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold group-hover:text-primary transition-colors">
            {label}
          </p>
          <p className="text-2xl font-display font-bold text-white tracking-tight">
            {value}
          </p>
          {sub && (
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-1 h-1 rounded-full bg-primary/50" />
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{sub}</p>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-lg ${iconStyles[variant]}`}>
          <Icon size={22} strokeWidth={2.5} />
        </div>
      </div>

      {/* Subtle Scanning Light Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ top: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-[-45deg]"
        />
      </div>
    </motion.div>
  );
}

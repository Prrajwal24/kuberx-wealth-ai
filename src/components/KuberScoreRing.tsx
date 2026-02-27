import { motion } from "framer-motion";

interface KuberScoreProps {
  score: number;
  label: string;
}

export default function KuberScoreRing({ score, label }: KuberScoreProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score < 40) return "#f472b6"; // Accent Pink
    if (score < 70) return "#3b82f6"; // Cyber Blue
    return "#c084fc"; // Electric Violet
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer Scanning Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
        />

        {/* Outer Scanning Ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[8px] border border-dashed border-secondary/30 rounded-full"
        />

        {/* Inner Glow */}
        <div className="absolute inset-[15px] rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-xl" />

        {/* Main Progress Ring */}
        <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 100 100">
          {/* Background Ring */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />

          {/* Progress Ring */}
          <motion.circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2.5, ease: "circOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${getColor()})` }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <span className="text-4xl font-display font-bold text-white tracking-tighter glow-text-violet block">
              {score}
            </span>
            <span className="text-[10px] text-muted-foreground font-body uppercase tracking-[0.2em]">Kuber Score</span>
          </motion.div>
        </div>
      </div>

      {/* Category Shield */}
      <div className="flex items-center gap-2 px-4 py-1.5 glass-cyber rounded-full neon-border-violet group hover:neon-border-blue transition-all duration-500">
        <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: getColor() }} />
        <span className="text-xs font-display font-medium text-white/90 uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
}

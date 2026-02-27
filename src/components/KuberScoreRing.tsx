import { motion } from "framer-motion";

interface KuberScoreProps {
  score: number;
  label: string;
}

export default function KuberScoreRing({ score, label }: KuberScoreProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score < 40) return "hsl(0, 72%, 51%)";
    if (score < 70) return "hsl(38, 92%, 50%)";
    return "hsl(142, 71%, 45%)";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-40 h-40 score-ring">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(220, 14%, 18%)" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-display font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {score}
          </motion.span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Kuber Score</span>
        </div>
      </div>
      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${score < 40 ? 'bg-destructive/20 text-destructive' :
          score < 70 ? 'bg-warning/20 text-warning' :
            'bg-success/20 text-success'
        }`}>
        {label}
      </span>
    </div>
  );
}

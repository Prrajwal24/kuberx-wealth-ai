import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const lessons = [
  { id: 1, title: "Credit vs Debit", xp: 50, completed: true, content: "A credit card lets you borrow money to pay later, while a debit card deducts directly from your bank. Credit builds credit score but risks debt if not paid in full." },
  { id: 2, title: "Simple vs Compound Interest", xp: 75, completed: true, content: "Simple interest is calculated on the principal only. Compound interest is calculated on principal + accumulated interest. Compounding is the 8th wonder of the world!" },
  { id: 3, title: "Understanding Inflation", xp: 60, completed: false, content: "Inflation means your money buys less over time. At 6% inflation, ₹1 lakh today is worth only ₹55,839 in 10 years. Always invest above inflation!" },
  { id: 4, title: "Tax Basics for Salaried", xp: 80, completed: false, content: "India uses a progressive tax slab system. Section 80C allows ₹1.5L deduction. New regime has lower rates but fewer deductions." },
  { id: 5, title: "How Banks Operate", xp: 65, completed: false, content: "Banks take deposits at low interest and lend at higher rates. The difference (spread) is their profit. RBI regulates all banking operations." },
  { id: 6, title: "Stock Market Basics", xp: 90, completed: false, content: "Stocks represent ownership in companies. BSE and NSE are India's exchanges. Long-term equity investing has historically beaten inflation." },
];

export default function Learn() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const completedCount = lessons.filter(l => l.completed).length;
  const totalXP = lessons.filter(l => l.completed).reduce((s, l) => s + l.xp, 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
          <GraduationCap className="text-primary" /> Financial Academy
        </h1>
        <p className="text-muted-foreground mt-1">Master money with bite-sized lessons</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-4 border border-primary/20 text-center">
          <p className="text-2xl font-display font-bold gold-text">{totalXP}</p>
          <p className="text-xs text-muted-foreground">Total XP</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-border text-center">
          <p className="text-2xl font-display font-bold text-foreground">{completedCount}/{lessons.length}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-border text-center">
          <p className="text-2xl font-display font-bold text-foreground">🔥 2</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, idx) => (
          <motion.div key={lesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <button
              onClick={() => setSelectedLesson(selectedLesson === lesson.id ? null : lesson.id)}
              className={`w-full text-left glass-card rounded-xl p-5 border transition-all ${
                selectedLesson === lesson.id ? 'border-primary/40 glow-gold' : 'border-border hover:border-primary/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {lesson.completed ? (
                    <CheckCircle size={20} className="text-success" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">+{lesson.xp} XP</p>
                  </div>
                </div>
              </div>

              {selectedLesson === lesson.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">{lesson.content}</p>
                  {!lesson.completed && (
                    <Button className="mt-3 gold-gradient text-primary-foreground text-sm" size="sm">
                      Mark Complete
                    </Button>
                  )}
                </motion.div>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

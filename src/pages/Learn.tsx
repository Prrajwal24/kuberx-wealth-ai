import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Trophy, Star, TrendingUp, Users, Target, Zap, IndianRupee, Medal, Award, Flame, Sparkles, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { academyLevels, AcademyLevel } from "@/lib/academyData";
import { mockUser as initialUser, UserProfile } from "@/lib/mockData";
import AcademyRoadmap from "@/components/AcademyRoadmap";
import AcademyLesson from "@/components/AcademyLesson";
import AcademyQuiz from "@/components/AcademyQuiz";
import { useAuth } from "@/context/AuthContext";

// Game Imports
import CoinCatchGame from "@/components/games/CoinCatchGame";
import BankManagerGame from "@/components/games/BankManagerGame";
import ExpenseSortGame from "@/components/games/ExpenseSortGame";
import InvestmentSimGame from "@/components/games/InvestmentSimGame";
import MazeGame from "@/components/games/MazeGame";

export default function Learn() {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<UserProfile>(initialUser);

  const activeUser = authUser?.name ? {
    ...user,
    name: authUser.name
  } : user;

  const [activeTab, setActiveTab] = useState("roadmap");
  const [selectedLevel, setSelectedLevel] = useState<AcademyLevel | null>(null);
  const [modalType, setModalType] = useState<'lesson' | 'game' | 'quiz' | null>(null);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);

  // Persistence effect (simulated)
  useEffect(() => {
    const saved = localStorage.getItem('kuberx_academy_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const saveUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('kuberx_academy_user', JSON.stringify(updatedUser));
  };

  const handleLevelSelect = (levelNum: number) => {
    const level = academyLevels.find(l => l.level === levelNum);
    if (level) {
      setSelectedLevel(level);
      setModalType('lesson');
      setCurrentLessonIdx(0);
    }
  };

  const completeLesson = () => {
    if (!selectedLevel) return;
    const lesson = selectedLevel.lessons[currentLessonIdx];

    const updatedUser = { ...user };
    if (!updatedUser.completedLessons.includes(lesson.id)) {
      updatedUser.completedLessons.push(lesson.id);
      updatedUser.xp += lesson.xpValue;
    }

    if (currentLessonIdx < selectedLevel.lessons.length - 1) {
      setCurrentLessonIdx(prev => prev + 1);
    } else {
      setModalType('game');
    }
    saveUser(updatedUser);
  };

  const completeGame = (score: number) => {
    if (!selectedLevel) return;
    const updatedUser = { ...user };
    updatedUser.xp += selectedLevel.game.xpValue;
    updatedUser.coins += score;
    setModalType('quiz');
    saveUser(updatedUser);
  };

  const completeQuiz = (score: number) => {
    if (!selectedLevel) return;
    const updatedUser = { ...user };
    updatedUser.xp += selectedLevel.quiz.xpValue;

    // Level Completion Logic
    if (!updatedUser.completedAcademyLevels.includes(selectedLevel.level)) {
      updatedUser.completedAcademyLevels.push(selectedLevel.level);
      updatedUser.xp += selectedLevel.rewardNodes.xp;
      updatedUser.coins += selectedLevel.rewardNodes.coins;
      if (selectedLevel.rewardNodes.badge && !updatedUser.badges.includes(selectedLevel.rewardNodes.badge)) {
        updatedUser.badges.push(selectedLevel.rewardNodes.badge);
      }

      // Yaksha Celebration!
      window.dispatchEvent(new CustomEvent('yaksha-celebrate', {
        detail: { message: `Incredible! You've mastered Level ${selectedLevel.level}: ${selectedLevel.title}. Your treasury of knowledge grows!` }
      }));
    }

    setModalType(null);
    setSelectedLevel(null);
    saveUser(updatedUser);
  };

  const renderGame = () => {
    if (!selectedLevel) return null;

    // Yaksha game instructions
    let instruction = "";
    switch (selectedLevel.game.type) {
      case 'coins': instruction = "Catch coins to increase your wealth but avoid falling bills!"; break;
      case 'simulation': instruction = "Review each loan request carefully. Approve the wise, reject the risky!"; break;
      case 'sorting': instruction = "Drag items to their correct category: Needs, Wants, or Savings."; break;
      case 'investment': instruction = "Allocate your capital across stocks, gold, and fixed deposits. Watch the market cycles!"; break;
      case 'maze': instruction = "Solve financial questions to unlock the path and find the exit!"; break;
    }

    if (instruction) {
      window.dispatchEvent(new CustomEvent('yaksha-celebrate', {
        detail: { message: instruction }
      }));
    }

    switch (selectedLevel.game.type) {
      case 'coins': return <CoinCatchGame onComplete={completeGame} />;
      case 'simulation': return <BankManagerGame onComplete={completeGame} />;
      case 'sorting': return <ExpenseSortGame onComplete={completeGame} />;
      case 'investment': return <InvestmentSimGame onComplete={completeGame} />;
      case 'maze': return <MazeGame onComplete={completeGame} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 pb-20">
      {/* Academy Header / Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-primary font-display text-sm font-semibold tracking-[0.2em] uppercase mb-2">
            <GraduationCap size={14} className="animate-pulse" />
            Neural Training Active
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Knowledge <span className="text-primary glow-text-violet">Nexus</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-body text-lg max-w-lg">
            Master the architecture of wealth. Complete modules to unlock advanced financial nodes.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {[
            { label: "Neural XP", value: user.xp, color: "neon-border-violet", icon: Sparkles },
            { label: "Credits", value: user.coins, color: "neon-border-blue", icon: IndianRupee },
            { label: "Sync Streak", value: "5 Days", color: "neon-border-pink", icon: Zap },
          ].map((stat) => (
            <div key={stat.label} className={`glass-cyber px-5 py-3 rounded-2xl ${stat.color} flex items-center gap-4 group cursor-default`}>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-lg font-display font-bold text-white leading-none">{stat.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex gap-4 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit mx-auto mb-12 backdrop-blur-xl">
          <TabsTrigger value="roadmap" className="px-8 py-2.5 rounded-xl text-sm font-bold transition-all data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_0_15px_rgba(192,132,252,0.2)]">
            Mission Map
          </TabsTrigger>
          <TabsTrigger value="stats" className="px-8 py-2.5 rounded-xl text-sm font-bold transition-all data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_0_15px_rgba(192,132,252,0.2)]">
            Intelligence Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="mt-0 outline-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-cyber rounded-[3rem] border border-white/10 bg-black/20 overflow-hidden min-h-[700px] relative"
          >
            {/* Holographic background element */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />

            <AcademyRoadmap
              levels={academyLevels}
              user={user}
              onSelectLevel={handleLevelSelect}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="stats" className="mt-0 outline-none space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Col: Progress */}
            <div className="md:col-span-8 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-cyber rounded-3xl p-8 neon-border-blue"
              >
                <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                  <Activity className="text-secondary" size={20} /> Subsystem Progress
                </h3>
                <div className="grid gap-8">
                  {academyLevels.map((lvl, i) => {
                    const lessonsCount = lvl.lessons.length;
                    const completed = lvl.lessons.filter(l => user.completedLessons.includes(l.id)).length;
                    const pct = (completed / lessonsCount) * 100;
                    const isAllDone = user.completedAcademyLevels.includes(lvl.level);

                    return (
                      <div key={lvl.level}>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="font-display font-bold text-white/90">Sector {lvl.level}: {lvl.title}</span>
                          <span className={`${isAllDone ? 'text-secondary' : 'text-primary'} font-bold`}>{isAllDone ? 'SECURED' : `${Math.round(pct)}%`}</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: isAllDone ? '100%' : `${pct}%` }}
                            className={`h-full rounded-full transition-all duration-1000 ${isAllDone ? 'bg-secondary shadow-[0_0_10px_#3b82f6]' : 'bg-primary shadow-[0_0_10px_#c084fc]'}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-cyber rounded-3xl p-8 neon-border-violet"
              >
                <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                  <Medal className="text-primary" size={20} /> Knowledge Artifacts
                </h3>
                <div className="flex flex-wrap gap-8">
                  {user.badges.map((badge, i) => (
                    <motion.div
                      key={badge}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-primary to-secondary p-0.5 shadow-lg group-hover:shadow-primary/30 transition-all">
                        <div className="w-full h-full rounded-[2rem] bg-[#0a0a0c] flex items-center justify-center">
                          <Award className="text-primary" size={40} />
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{badge}</p>
                    </motion.div>
                  ))}
                  {user.badges.length === 0 && <p className="text-sm text-muted-foreground italic">No neural artifacts recovered. Complete sectors to earn them.</p>}
                </div>
              </motion.div>
            </div>

            {/* Right Col: Leaderboard */}
            <div className="md:col-span-4 h-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-cyber rounded-3xl p-8 neon-border-pink h-full bg-black/40"
              >
                <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                  <Users className="text-accent" size={20} /> High Command
                </h3>
                <div className="space-y-6">
                  {[
                    { name: 'Rahul.eth', xp: 1450 },
                    { name: 'S_Neh.a', xp: 1280 },
                    { name: 'Kuber_01', xp: 1100 },
                    { name: activeUser.name, xp: user.xp, me: true },
                    { name: 'Priya_V', xp: 950 },
                  ].sort((a, b) => b.xp - a.xp).map((item, idx) => (
                    <div key={item.name} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${item.me ? 'border-primary/50 bg-primary/10 shadow-[0_0_20px_rgba(192,132,252,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-primary text-white shadow-[0_0_10px_rgba(192,132,252,0.5)]' : 'bg-white/10 text-muted-foreground'}`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${item.me ? 'text-primary' : 'text-white'}`}>{item.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.xp} Neural XP</p>
                      </div>
                      {idx < 3 && <Trophy size={16} className="text-primary/50" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Daily Challenge Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-cyber border-2 border-primary/30 rounded-[2.5rem] p-8 bg-gradient-to-r from-primary/10 to-transparent flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[2rem] bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(192,132,252,0.2)]">
            <Zap size={32} />
          </div>
          <div>
            <h4 className="text-2xl font-display font-bold text-white leading-none">Flash Mission</h4>
            <p className="text-muted-foreground mt-2 font-body">Download the latest knowledge packet today to earn <span className="text-primary font-bold">+50 Neural XP</span>.</p>
          </div>
        </div>
        <button className="px-10 py-4 bg-primary text-black font-display font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(192,132,252,0.4)]">
          EXECUTE
        </button>
      </motion.div>


      {/* LEVEL MODALS */}
      <Dialog open={!!selectedLevel} onOpenChange={(open) => !open && setSelectedLevel(null)}>
        <DialogContent className="max-w-2xl bg-background border-primary/20 shadow-2xl overflow-hidden p-0">
          <div className="gold-gradient h-2" />
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                {modalType === 'lesson' ? `Lesson ${currentLessonIdx + 1}: ${selectedLevel?.lessons[currentLessonIdx].title}` :
                  modalType === 'game' ? `Level ${selectedLevel?.level} Challenge: ${selectedLevel?.game.name}` :
                    `Final Quiz: ${selectedLevel?.title}`}
              </DialogTitle>
            </DialogHeader>

            {selectedLevel && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${modalType}-${currentLessonIdx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {modalType === 'lesson' && (
                    <AcademyLesson
                      lesson={selectedLevel.lessons[currentLessonIdx]}
                      isCompleted={user.completedLessons.includes(selectedLevel.lessons[currentLessonIdx].id)}
                      onComplete={completeLesson}
                    />
                  )}

                  {modalType === 'game' && renderGame()}

                  {modalType === 'quiz' && (
                    <AcademyQuiz
                      quiz={selectedLevel.quiz}
                      onComplete={completeQuiz}
                      onClose={() => setModalType(null)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Trophy, Star, TrendingUp, Users, Target, Zap, IndianRupee, Medal, Award, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { academyLevels, AcademyLevel } from "@/lib/academyData";
import { mockUser as initialUser, UserProfile } from "@/lib/mockData";
import AcademyRoadmap from "@/components/AcademyRoadmap";
import AcademyLesson from "@/components/AcademyLesson";
import AcademyQuiz from "@/components/AcademyQuiz";

// Game Imports
import CoinCatchGame from "@/components/games/CoinCatchGame";
import BankManagerGame from "@/components/games/BankManagerGame";
import ExpenseSortGame from "@/components/games/ExpenseSortGame";
import InvestmentSimGame from "@/components/games/InvestmentSimGame";
import MazeGame from "@/components/games/MazeGame";

export default function Learn() {
  const [user, setUser] = useState<UserProfile>(initialUser);
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
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header / Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <GraduationCap className="text-primary size-10" /> KuberX Academy
          </h1>
          <p className="text-muted-foreground mt-1">From Money Basics to Financial Freedom</p>
        </div>

        <div className="flex gap-3">
          <div className="glass-card rounded-2xl px-4 py-2 border border-primary/20 flex items-center gap-3 active:scale-95 transition-transform cursor-default">
            <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-bold text-xs shadow-lg">XP</div>
            <div>
              <p className="text-sm font-bold text-foreground leading-none">{user.xp.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total XP</p>
            </div>
          </div>
          <div className="glass-card rounded-2xl px-4 py-2 border border-border flex items-center gap-3 active:scale-95 transition-transform cursor-default">
            <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center text-warning font-bold shadow-sm">
              <IndianRupee size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground leading-none">{user.coins.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Coins</p>
            </div>
          </div>
          <div className="glass-card rounded-2xl px-4 py-2 border border-border flex items-center gap-3 active:scale-95 transition-transform cursor-default">
            <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center text-success font-bold shadow-sm">
              <Flame size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground leading-none">5</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Streak</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-12 mb-8 bg-secondary/50 border border-border rounded-xl">
          <TabsTrigger value="roadmap" className="rounded-lg data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground font-bold">
            Learning Journey
          </TabsTrigger>
          <TabsTrigger value="stats" className="rounded-lg data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground font-bold">
            My Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="mt-0 outline-none space-y-4">
          <div className="glass-card rounded-2xl p-4 md:p-6 border border-border/50 bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xl font-display font-bold text-foreground">Learning Progress</p>
              <p className="text-sm text-muted-foreground font-bold text-primary">{user.completedAcademyLevels.length} / {academyLevels.length} Levels Completed</p>
            </div>
            <div className="w-full md:w-1/2">
              <Progress value={(user.completedAcademyLevels.length / academyLevels.length) * 100} className="h-3 bg-secondary" />
            </div>
          </div>
          <div className="glass-card rounded-3xl border border-border/50 bg-secondary/10 overflow-hidden relative">
            {/* Top gradient blur for smooth scrolling effect */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background/80 to-transparent z-20 pointer-events-none" />

            <AcademyRoadmap
              levels={academyLevels}
              user={user}
              onSelectLevel={handleLevelSelect}
            />

            {/* Bottom gradient blur */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-0 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Col: Progress */}
            <div className="md:col-span-2 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="text-primary" size={20} /> My Progress
                </h3>
                <div className="space-y-6">
                  {academyLevels.map((lvl) => {
                    const lessonsCount = lvl.lessons.length;
                    const completed = lvl.lessons.filter(l => user.completedLessons.includes(l.id)).length;
                    const pct = (completed / lessonsCount) * 100;
                    const isAllDone = user.completedAcademyLevels.includes(lvl.level);

                    return (
                      <div key={lvl.level}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-bold text-foreground">Level {lvl.level}: {lvl.title}</span>
                          <span className="text-muted-foreground font-medium">{isAllDone ? '100%' : `${Math.round(pct)}%`}</span>
                        </div>
                        <Progress value={isAllDone ? 100 : pct} className="h-2 bg-secondary" />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Medal className="text-primary" size={20} /> My Badges
                </h3>
                <div className="flex flex-wrap gap-4">
                  {user.badges.map((badge) => (
                    <motion.div
                      key={badge}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="w-16 h-16 rounded-2xl gold-gradient p-0.5 shadow-lg group-hover:glow-gold transition-all">
                        <div className="w-full h-full rounded-2xl bg-sidebar flex items-center justify-center">
                          <Award className="text-primary" size={32} />
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-foreground uppercase tracking-wider">{badge}</p>
                    </motion.div>
                  ))}
                  {user.badges.length === 0 && <p className="text-sm text-muted-foreground italic">No badges earned yet. Complete levels to win them!</p>}
                </div>
              </div>
            </div>

            {/* Right Col: Leaderboard */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-border h-full bg-secondary/20">
                <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Users className="text-primary" size={20} /> Leaderboard
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Rahul M.', xp: 1450, rank: 1 },
                    { name: 'Sneha K.', xp: 1280, rank: 2 },
                    { name: 'Amit S.', xp: 1100, rank: 3 },
                    { name: 'Arjun S. (You)', xp: user.xp, rank: 4, me: true },
                    { name: 'Priya V.', xp: 950, rank: 5 },
                  ].sort((a, b) => b.xp - a.xp).map((item, idx) => (
                    <div key={item.name} className={`flex items-center gap-3 p-3 rounded-xl border ${item.me ? 'border-primary/40 bg-primary/5 glow-gold' : 'border-border bg-background'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${idx === 0 ? 'bg-warning text-warning-foreground' : 'bg-secondary text-muted-foreground'}`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground leading-none">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">{item.xp} XP</p>
                      </div>
                      {idx < 3 && <Trophy size={14} className="text-primary/70" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Daily Challenge Placeholder */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card border-2 border-primary/20 rounded-3xl p-6 bg-gradient-to-r from-primary/5 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="font-bold text-foreground leading-none">Daily Challenge</h4>
            <p className="text-sm text-muted-foreground mt-1">Complete a finance lesson today and earn 25 bonus XP!</p>
          </div>
        </div>
        <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">CLAIM</Button>
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

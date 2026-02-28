import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, AlertTriangle, CheckCircle, Clock,
  Smartphone, Gamepad2, Car, Palmtree, Shirt,
  BookOpen, Home, PiggyBank, Plus, Info, TrendingUp, Sparkles, Scale, Percent, MinusCircle, Lightbulb, Bot, Laptop, Watch, Headphones, Zap, Shirt as Clothes, Bike, Tv, Gift, Camera, Tablet, Mic, Diamond, History
} from "lucide-react";
import { mockUser, evaluatePurchase, purchaseCategories, PurchaseItem } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const GEN_Z_PURCHASES = [
  { label: "iPhone / Smartphone", icon: Smartphone, category: "Gadgets" },
  { label: "Laptop / MacBook", icon: Laptop, category: "Gadgets" },
  { label: "Gaming Console", icon: Gamepad2, category: "Entertainment" },
  { label: "Headphones / AirPods", icon: Headphones, category: "Gadgets" },
  { label: "Smart Watch", icon: Watch, category: "Gadgets" },
  { label: "Sneakers", icon: Zap, category: "Fashion" },
  { label: "Clothing / Fashion", icon: Clothes, category: "Fashion" },
  { label: "Bike / Scooter", icon: Bike, category: "Vehicle" },
  { label: "Car", icon: Car, category: "Vehicle" },
  { label: "Travel / Vacation", icon: Palmtree, category: "Travel" },
  { label: "Netflix / OTT Subscription", icon: Tv, category: "Subscription" },
  { label: "Gym Membership", icon: Heart, category: "Health & Fitness" },
  { label: "Online Course", icon: BookOpen, category: "Education" },
  { label: "Protein Supplements", icon: Zap, category: "Health & Fitness" },
  { label: "Home Setup / Desk", icon: Home, category: "Home" },
  { label: "Furniture", icon: Home, category: "Home" },
  { label: "Camera / Photography Gear", icon: Camera, category: "Gadgets" },
  { label: "Tablet / iPad", icon: Tablet, category: "Gadgets" },
  { label: "Streaming Equipment", icon: Mic, category: "Entertainment" },
  { label: "Luxury Purchase", icon: Diamond, category: "Luxury" },
  { label: "Other", icon: Plus, category: "Other" },
];

function Heart({ className, size }: { className?: string, size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function BuyCheck() {
  const [selectedItem, setSelectedItem] = useState("");
  const [customItem, setCustomItem] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState([5]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [impulseResult, setImpulseResult] = useState<any>(null);
  const [isAddedToWaitList, setIsAddedToWaitList] = useState(false);

  const monthlyDisposable = mockUser.monthlySalary - mockUser.monthlyExpenses - mockUser.existingEMIs;

  const handleItemSelect = (val: string) => {
    setSelectedItem(val);
    const item = GEN_Z_PURCHASES.find(i => i.label === val);
    if (item && item.category !== "Other") {
      setCategory(item.category);
    }
    if (val !== "Other") {
      setCustomItem("");
    }
  };

  const calculateImpulseScore = (priceVal: number, urgencyVal: number, cat: string) => {
    let riskFactor = 0;
    if (["Luxury", "Fashion", "Gadgets"].includes(cat)) riskFactor = 20;
    else if (["Entertainment"].includes(cat)) riskFactor = 15;
    else if (["Travel"].includes(cat)) riskFactor = 10;
    else if (["Education", "Health & Fitness"].includes(cat)) riskFactor = 5;

    const score = ((priceVal / monthlyDisposable) * 40) + (urgencyVal * 5) + riskFactor;
    return Math.min(100, Math.max(0, Math.round(score)));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setResult(null);
    setImpulseResult(null);
    setIsAddedToWaitList(false);

    setTimeout(() => {
      const priceVal = Number(price);
      const affordabilityPct = Math.min(100, (monthlyDisposable / priceVal) * 100);
      const urgencyVal = urgency[0];

      // Impulse Score Calculation
      const impulseScore = calculateImpulseScore(priceVal, urgencyVal, category);
      let impulseStatus = "Smart Purchase";
      let impulseDesc = "This purchase aligns with your financial health.";
      let impulseColor = "bg-success";
      let impulseTextColor = "text-success";
      let impulseYaksha = "Patience builds wealth. This purchase is reasonable.";

      if (impulseScore > 60) {
        impulseStatus = "Impulse Purchase";
        impulseDesc = "This purchase may be emotionally driven.";
        impulseColor = "bg-destructive";
        impulseTextColor = "text-destructive";
        impulseYaksha = "Impulse destroys wealth. Wait before buying this.";
      } else if (impulseScore > 30) {
        impulseStatus = "Think Twice";
        impulseDesc = "Consider waiting before making this purchase.";
        impulseColor = "bg-warning";
        impulseTextColor = "text-warning";
        impulseYaksha = "Think carefully. Delayed decisions create stronger finances.";
      }

      let recommendation = "THINK TWICE";
      let color = "text-warning";
      let bgColor = "bg-warning/10";
      let borderColor = "border-warning/20";
      let yakshaMsg = impulseYaksha; // Base on impulse
      let scoreColor = "bg-warning";
      let suggestion = "Save for 2 months before purchasing.";

      if (affordabilityPct >= 80 && urgencyVal > 7 && impulseScore < 50) {
        recommendation = "SAFE TO BUY";
        color = "text-success";
        bgColor = "bg-success/10";
        borderColor = "border-success/20";
        yakshaMsg = impulseYaksha;
        scoreColor = "bg-success";
        suggestion = "You have enough surplus. Go ahead if it truly adds value!";
      } else if (affordabilityPct < 40 || (priceVal > mockUser.currentSavings * 0.15) || impulseScore > 75) {
        recommendation = "BAD DECISION";
        color = "text-destructive";
        bgColor = "bg-destructive/10";
        borderColor = "border-destructive/20";
        yakshaMsg = impulseYaksha;
        scoreColor = "bg-destructive";
        suggestion = "Consider a cheaper alternative or wait until your savings grow by 20%.";
      }

      setResult({
        recommendation,
        color,
        bgColor,
        borderColor,
        yakshaMsg,
        affordabilityPct,
        scoreColor,
        suggestion,
        reason: `This purchase takes ${Math.round(100 - affordabilityPct)}% of your disposable monthly income buffer.`,
        priceRatio: (priceVal / monthlyDisposable).toFixed(1),
        savingsImpact: ((priceVal / mockUser.currentSavings) * 100).toFixed(1)
      });

      setImpulseResult({
        score: impulseScore,
        status: impulseStatus,
        desc: impulseDesc,
        color: impulseColor,
        textColor: impulseTextColor,
        yaksha: impulseYaksha
      });

      setIsAnalyzing(false);
    }, 1500);
  };

  const handleAddToWaitList = () => {
    const itemData = {
      name: selectedItem === "Other" ? customItem : selectedItem,
      price: price,
      timestamp: new Date().toISOString()
    };

    const currentWaitList = JSON.parse(localStorage.getItem('kuberx_72hr_waitlist') || '[]');
    localStorage.setItem('kuberx_72hr_waitlist', JSON.stringify([...currentWaitList, itemData]));

    setIsAddedToWaitList(true);
    toast.success("Item saved. Reconsider this purchase after 72 hours.");
  };

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto pb-20 px-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground tracking-tight">
          Should I Buy This?
        </h1>
        <p className="text-primary font-medium mt-3 text-lg md:text-xl">
          Make smarter purchase decisions with AI
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Inputs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/10 space-y-10 h-full">
            <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-3">
              <ShoppingBag className="text-primary" size={24} /> Purchase Form
            </h3>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Select Item (Common Purchases)</label>
                <Select value={selectedItem} onValueChange={handleItemSelect}>
                  <SelectTrigger className="h-16 bg-white/5 border-white/10 rounded-xl focus:ring-primary/40 text-lg">
                    <SelectValue placeholder="What are you buying?" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-white/10 max-h-[400px]">
                    {GEN_Z_PURCHASES.map(item => (
                      <SelectItem key={item.label} value={item.label} className="py-3">
                        <div className="flex items-center gap-3">
                          <item.icon size={18} className="text-primary" />
                          <span>{item.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedItem === "Other" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Custom Item Name</label>
                  <Input
                    value={customItem}
                    onChange={e => setCustomItem(e.target.value)}
                    placeholder="Enter item name..."
                    className="h-16 bg-white/5 border-white/10 focus-visible:ring-primary/40 rounded-xl text-lg"
                  />
                </motion.div>
              )}

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Price (₹)</label>
                <Input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="25000"
                  className="h-16 bg-white/5 border-white/10 focus-visible:ring-primary/40 rounded-xl font-bold text-xl text-primary"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Category Dropdown</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-16 bg-white/5 border-white/10 rounded-xl focus:ring-primary/40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-white/10">
                    {["Gadgets", "Fashion", "Vehicle", "Travel", "Subscription", "Education", "Health & Fitness", "Luxury", "Home", "Entertainment", "Other"].map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex justify-between items-end px-1">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Urgency Slider</label>
                  <span className="text-2xl font-black text-primary">{urgency[0]}<span className="text-xs text-muted-foreground ml-1">/ 10</span></span>
                </div>
                <Slider
                  value={urgency}
                  onValueChange={setUrgency}
                  max={10}
                  min={1}
                  step={1}
                  className="py-6"
                />
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">
                  <span>1 = Not needed</span>
                  <span>10 = Very important</span>
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!price || (!selectedItem && !customItem) || isAnalyzing}
                className="w-full h-16 bg-violet-600 hover:bg-violet-500 text-white font-black text-xl rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Sparkles size={24} />
                    </motion.div>
                    Crunching Data...
                  </div>
                ) : "Analyze Purchase"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Results */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result && !isAnalyzing ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[500px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <ShoppingBag className="text-white/20" size={48} />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground/50">Ready for Analysis</h3>
                <p className="text-muted-foreground max-w-xs mt-2">
                  Enter your purchase details on the left and our AI will evaluate the financial impact and behavioral risk.
                </p>
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[500px] glass-card rounded-3xl border border-white/10 flex flex-col items-center justify-center p-12 overflow-hidden relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-40 h-40 rounded-full border border-primary/20 flex items-center justify-center"
                >
                  <div className="w-32 h-32 rounded-full border border-primary/40 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="text-primary animate-pulse" size={32} />
                    </div>
                  </div>
                </motion.div>
                <div className="mt-8 space-y-2 text-center">
                  <h3 className="text-2xl font-display font-bold text-foreground uppercase tracking-widest">Calculating Risk</h3>
                  <div className="flex gap-1 justify-center">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-primary"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                {/* Decision Card */}
                <div className={`glass-card rounded-2xl border ${result.borderColor} ${result.bgColor} p-8 relative overflow-hidden`}>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      {result.recommendation.includes('SAFE') ? <CheckCircle className="text-success" size={32} /> :
                        result.recommendation.includes('THINK') ? <Clock className="text-warning" size={32} /> :
                          <AlertTriangle className="text-destructive" size={32} />}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">AI Recommendation</p>
                      <h2 className={`text-4xl font-display font-black tracking-tighter ${result.color}`}>{result.recommendation}</h2>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Reason:</p>
                      <p className="text-lg font-medium text-foreground italic">"{result.reason}"</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Suggestion:</p>
                      <p className="text-lg font-medium text-foreground italic">"{result.suggestion}"</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Affordability Meter */}
                  <div className="glass-card rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Affordability</h3>
                        <span className={`text-2xl font-black ${result.color}`}>{result.affordabilityPct.toFixed(0)}%</span>
                      </div>
                      <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.affordabilityPct}%` }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                          className={`h-full rounded-full ${result.scoreColor} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                        />
                      </div>
                      <div className="flex justify-between text-[8px] font-bold text-muted-foreground uppercase">
                        <span>Low Score</span>
                        <span>High Score</span>
                      </div>
                    </div>
                  </div>

                  {/* Impulse Purchase Detector */}
                  <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Impulse Detector</h3>
                        <p className="text-[10px] text-muted-foreground">Behavioral Risk Analysis</p>
                      </div>
                      <span className={`text-2xl font-black ${impulseResult.textColor}`}>{impulseResult.score}<span className="text-xs ml-1">/100</span></span>
                    </div>

                    <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${impulseResult.score}%` }}
                        transition={{ duration: 1.5, delay: 0.4 }}
                        className={`h-full rounded-full ${impulseResult.color} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                      />
                    </div>

                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                      <div>
                        <p className={`text-xs font-black uppercase ${impulseResult.textColor}`}>{impulseResult.status}</p>
                        <p className="text-[10px] text-muted-foreground leading-tight">{impulseResult.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 72-Hour Wait List Rule */}
                {impulseResult.score > 30 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card rounded-2xl p-6 border border-pink-500/20 bg-pink-500/5 flex flex-col md:flex-row items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                        <Clock size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-foreground uppercase tracking-widest">The 72-Hour Rule</h4>
                        <p className="text-xs text-muted-foreground">85% of impulse regret is avoided by waiting 3 days.</p>
                      </div>
                    </div>
                    {isAddedToWaitList ? (
                      <div className="flex items-center gap-2 text-success font-bold">
                        <CheckCircle size={18} />
                        <span>Added to Wait List</span>
                      </div>
                    ) : (
                      <Button
                        onClick={handleAddToWaitList}
                        className="bg-pink-500 hover:bg-pink-400 text-white font-bold h-12 px-8 rounded-xl"
                      >
                        Add to 72-Hour Wait List
                      </Button>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-8"
          >
            {/* Alternative Suggestions */}
            <div className="glass-card rounded-2xl p-8 border border-white/10">
              <h3 className="font-display font-bold text-2xl text-foreground flex items-center gap-3 mb-8">
                <LightbulbIcon className="text-primary" size={28} /> Alternative Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Wait for a discount", desc: "Seasonal sales can save up to 25% on this category.", icon: Clock },
                  { label: "Buy refurbished", desc: "Certified pre-owned offers 100% utility at 60% cost.", icon: Smartphone },
                  { label: "Check Second hand", desc: "High quality local listings often save 50%+.", icon: Scale },
                  { label: "Budget-match", desc: "Look for alternatives within the ₹{(Number(price)*0.7).toLocaleString()} range.", icon: PiggyBank },
                ].map((alt, i) => (
                  <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <alt.icon size={16} />
                      </div>
                      <p className="text-sm font-bold text-foreground">{alt.label}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">{alt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Yaksha Advice Card */}
            <div className="glass-card rounded-2xl p-8 border border-primary/20 bg-primary/5 flex items-start gap-8 relative overflow-hidden">
              <div className="w-20 h-20 rounded-2xl gold-gradient shrink-0 flex items-center justify-center shadow-xl">
                <Bot className="text-primary-foreground" size={40} />
              </div>
              <div className="space-y-2 py-1 flex-1">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-primary italic">Yaksha's Financial Wisdom</p>
                <h3 className="text-2xl font-medium text-foreground leading-tight max-w-3xl font-display">
                  "{result.yakshaMsg}"
                </h3>
              </div>
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1], y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 opacity-10"
              >
                <Bot size={160} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LightbulbIcon({ className, size }: { className?: string, size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

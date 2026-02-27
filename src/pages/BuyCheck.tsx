import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, AlertTriangle, CheckCircle, Clock,
  Smartphone, Gamepad2, Car, Palmtree, Shirt,
  BookOpen, Home, PiggyBank, Plus, Info, Zap, Search, Activity, Bot
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
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function BuyCheck() {
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const [customItemName, setCustomItemName] = useState<string>("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<ReturnType<typeof evaluatePurchase> | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const allItems = useMemo(() => {
    return purchaseCategories.flatMap(cat => cat.items);
  }, []);

  const selectedMetadata = useMemo(() => {
    if (isCustom) return undefined;
    return allItems.find(item => item.name === selectedItemName);
  }, [selectedItemName, allItems, isCustom]);

  const handleItemChange = (value: string) => {
    if (value === "custom") {
      setIsCustom(true);
      setSelectedItemName("");
      setPrice("");
    } else {
      setIsCustom(false);
      setSelectedItemName(value);
      const item = allItems.find(i => i.name === value);
      if (item) {
        setPrice(item.avgPrice.toString());
      }
    }
    setResult(null);
  };

  const handleQuickPick = (name: string, priceVal: number) => {
    const item = allItems.find(i => i.name.includes(name));
    setIsAnalyzing(true);
    setTimeout(() => {
      if (item) {
        setIsCustom(false);
        setSelectedItemName(item.name);
        setPrice(priceVal.toString());
        setResult(evaluatePurchase(priceVal, mockUser, item));
      } else {
        setIsCustom(true);
        setCustomItemName(name);
        setPrice(priceVal.toString());
        setResult(evaluatePurchase(priceVal, mockUser));
      }
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleCheck = () => {
    const finalPrice = Number(price);
    if (!finalPrice) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(evaluatePurchase(finalPrice, mockUser, selectedMetadata));
      setIsAnalyzing(false);
    }, 2000);
  };

  const getVerdictIcon = (verdict: string) => {
    if (verdict.includes('Approved')) return <CheckCircle className="text-success" size={32} />;
    if (verdict.includes('Delay')) return <Clock className="text-warning" size={32} />;
    return <AlertTriangle className="text-destructive" size={32} />;
  };

  const getVerdictGlow = (verdict: string) => {
    if (verdict.includes('Approved')) return 'neon-border-success lg:shadow-[0_0_50px_rgba(34,197,94,0.1)]';
    if (verdict.includes('Delay')) return 'neon-border-blue lg:shadow-[0_0_50px_rgba(59,130,246,0.1)]';
    return 'neon-border-pink lg:shadow-[0_0_50px_rgba(244,114,182,0.1)]';
  };

  const getCategoryIcon = (category: string) => {
    const cat = purchaseCategories.find(c => c.category === category || c.items.some(i => i.category === category));
    if (!cat) return <ShoppingBag size={18} />;
    switch (cat.icon) {
      case 'Smartphone': return <Smartphone size={18} />;
      case 'Gamepad2': return <Gamepad2 size={18} />;
      case 'Car': return <Car size={18} />;
      case 'Palmtree': return <Palmtree size={18} />;
      case 'Shirt': return <Shirt size={18} />;
      case 'BookOpen': return <BookOpen size={18} />;
      case 'Home': return <Home size={18} />;
      case 'PiggyBank': return <PiggyBank size={18} />;
      default: return <ShoppingBag size={18} />;
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20 relative px-4">
      {/* Background Atmosphere */}
      <div className="absolute -top-40 -left-60 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 -right-40 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary border border-primary/20 font-bold tracking-widest uppercase">AI Engine Active</div>
            <div className="h-[1px] w-12 bg-primary/20" />
          </div>
          <h1 className="text-5xl font-display font-bold text-white tracking-tight flex items-center gap-4">
            <span className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
              <ShoppingBag className="text-primary h-10 w-10" />
            </span>
            SHOULD I <span className="text-primary glow-text-violet">BUY</span> THIS?
          </h1>
          <p className="text-muted-foreground text-lg font-medium">Neural processing of financial decisions to optimize long-term wealth.</p>
        </div>

        <div className="flex flex-col gap-3 min-w-[280px]">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
            <Zap size={14} className="text-primary" /> Rapid Simulation
          </p>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all group"
              onClick={() => handleQuickPick("iPhone", 85000)}
            >
              <Smartphone className="w-4 h-4 text-primary group-hover:animate-pulse" />
              <span className="text-xs font-bold text-white/80">iPhone 15</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/40 hover:bg-secondary/5 transition-all group"
              onClick={() => handleQuickPick("Console", 55000)}
            >
              <Gamepad2 className="w-4 h-4 text-secondary group-hover:animate-pulse" />
              <span className="text-xs font-bold text-white/80">PS5 Pro</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Input Terminal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 glass-cyber rounded-[2.5rem] p-10 border neon-border-violet relative overflow-hidden group"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <div className="relative z-10 space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                <Activity size={24} className="text-primary" /> Decision Parameters
              </h2>
              <div className="text-[10px] font-mono text-primary animate-pulse">AWAITING INPUT...</div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Search size={14} /> Neural Asset Selection
                </label>
                <Select onValueChange={handleItemChange} value={isCustom ? "custom" : selectedItemName}>
                  <SelectTrigger className="h-16 bg-black/40 border-white/10 text-white rounded-2xl focus:ring-primary/40 text-lg font-medium group-hover:border-primary/20 transition-all">
                    <SelectValue placeholder="Identify asset to purchase..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0c] border-white/10 text-white rounded-2xl shadow-2xl overflow-hidden">
                    {purchaseCategories.map((cat) => (
                      <SelectGroup key={cat.category}>
                        <SelectLabel className="flex items-center gap-2 text-primary font-bold px-4 py-3 bg-white/5 text-[10px] uppercase tracking-widest">
                          {getCategoryIcon(cat.category)} {cat.category}
                        </SelectLabel>
                        {cat.items.map((item) => (
                          <SelectItem key={item.name} value={item.name} className="py-3 px-6 hover:bg-white/5 cursor-pointer text-sm font-medium">
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                    <SelectSeparator className="bg-white/5" />
                    <SelectItem value="custom" className="py-4 px-6 font-bold text-primary hover:bg-primary/5 cursor-pointer text-sm">
                      <div className="flex items-center gap-2">
                        <Plus size={16} /> UNLISTED ASSET
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isCustom && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Asset Name Override</label>
                  <Input
                    value={customItemName}
                    onChange={(e) => setCustomItemName(e.target.value)}
                    placeholder="Enter custom identifier..."
                    className="h-16 bg-black/40 border-white/10 text-white rounded-2xl text-lg font-medium focus:border-primary/40"
                  />
                </motion.div>
              )}

              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Capital Expenditure (₹)</label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 text-2xl font-display font-bold">₹</div>
                  <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    type="number"
                    className="h-20 bg-black/40 border-white/10 text-white rounded-2xl pl-12 text-3xl font-display font-bold focus:border-primary/40 transition-all"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/20 animate-ping" />
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCheck}
              disabled={!price || isAnalyzing}
              className="w-full h-20 rounded-2xl bg-primary text-black font-display font-black text-2xl shadow-[0_0_30px_rgba(192,132,252,0.3)] hover:shadow-[0_0_50px_rgba(192,132,252,0.5)] transition-all active:scale-[0.98] group relative overflow-hidden"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-4">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-6 w-6 border-4 border-black border-t-transparent rounded-full" />
                  ANALYZING...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  EXECUTE NEURAL EVALUATION
                  <Zap size={24} className="fill-current" />
                </div>
              )}

              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </div>
        </motion.div>

        {/* Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          <div className="glass-cyber rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden flex-1 active:scale-[0.99] transition-transform cursor-default">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Info size={160} />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary/20">
                  <Info size={20} className="text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold text-white tracking-wide">Market Intelligence</h3>
              </div>

              {selectedMetadata ? (
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">Analyzing historical data for <span className="text-white font-bold">{selectedMetadata.name}</span> in the <span className="text-primary font-bold">{selectedMetadata.category}</span> sector.</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-cyber bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.1em]">Volatility Impact</p>
                      <p className={`text-base font-bold ${selectedMetadata.financialImpact === 'High' ? 'text-destructive' : 'text-success'}`}>
                        {selectedMetadata.financialImpact}
                      </p>
                    </div>
                    <div className="glass-cyber bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.1em]">Asset Type</p>
                      <p className="text-base font-bold text-white capitalize">{selectedMetadata.type}</p>
                    </div>
                    <div className="glass-cyber bg-white/10 p-4 rounded-2xl border border-primary/20 col-span-2 flex items-center justify-between group">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.1em]">Retained Value</p>
                        <p className="text-xl font-display font-black text-primary">DEPRECIATING</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.1em]">Yield Potential</p>
                        <p className="text-xl font-display font-black text-secondary">0.00%</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2">Neural Observation</p>
                    <p className="text-xs text-white/80 italic font-medium">"Assets in this category typically reach peak regret within 90 days. Exercise neural caution."</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 flex flex-col items-center justify-center py-10 opacity-60">
                  <div className="relative">
                    <ShoppingBag size={80} className="text-white/10" />
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 flex items-center justify-center">
                      <Activity size={32} className="text-primary" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-center text-muted-foreground max-w-[220px]">Identify an asset to retrieve sector-specific financial metadata.</p>
                </div>
              )}
            </div>
          </div>

          <div className="glass-cyber rounded-[2.5rem] p-8 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center border border-secondary/30">
                <PiggyBank size={24} className="text-secondary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Liquid Reserves</p>
                <p className="text-xl font-display font-black text-white">₹{mockUser.currentSavings.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Budget Health</p>
              <p className="text-xl font-display font-black text-success">OPTIMAL</p>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="relative z-20">
            <Card className={`overflow-hidden p-0 rounded-[3rem] glass-cyber backdrop-blur-3xl border-2 transition-all duration-500 ${getVerdictGlow(result.verdict)}`}>
              {/* Scanning Light Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div animate={{ top: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-x-0 h-[20%] bg-gradient-to-b from-transparent via-white/10 to-transparent skew-y-12" />
              </div>

              <div className="p-10 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-12">
                  <div className="flex items-center gap-8">
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                      className={`p-6 rounded-[2rem] shadow-2xl ${result.verdict.includes('Approved') ? 'bg-success/20 border-2 border-success/40' :
                          result.verdict.includes('Delay') ? 'bg-secondary/20 border-2 border-secondary/40' : 'bg-destructive/20 border-2 border-destructive/40'
                        }`}
                    >
                      {getVerdictIcon(result.verdict)}
                    </motion.div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-0.5 rounded-full text-[10px] uppercase font-black tracking-widest ${result.verdict.includes('Approved') ? 'bg-success text-black' :
                            result.verdict.includes('Delay') ? 'bg-secondary text-black' : 'bg-destructive text-white'
                          }`}>NEURAL VERDICT</div>
                        <div className="h-[1px] w-8 bg-white/10" />
                      </div>
                      <h2 className="font-display text-5xl font-black text-white tracking-tighter">
                        {result.verdict.toUpperCase().split(' ')[0]}
                      </h2>
                      <p className="text-muted-foreground font-medium text-lg flex items-center gap-2">
                        {isCustom ? customItemName : selectedItemName} <span className="text-primary font-black">₹{Number(price).toLocaleString()}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center w-36 py-4 bg-white/5 rounded-2xl border border-white/10 glass-cyber">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Risk Index</p>
                      <p className={`text-2xl font-display font-black ${result.regretProbability > 50 ? 'text-destructive' : 'text-success'}`}>
                        {result.regretProbability > 65 ? 'CRITICAL' : result.regretProbability > 40 ? 'CAUTION' : 'SECURE'}
                      </p>
                    </div>
                    <div className="text-center w-36 py-4 bg-white/5 rounded-2xl border border-white/10 glass-cyber">
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Impact</p>
                      <p className={`text-2xl font-display font-black ${result.impactLevel === 'High' ? 'text-destructive' : 'text-success'}`}>
                        {result.impactLevel.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex justify-between items-end">
                      <h3 className="text-sm font-black text-white/60 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Activity size={16} className="text-primary" /> Regret Probability Engine
                      </h3>
                      <span className={`text-3xl font-display font-black ${result.regretProbability > 60 ? 'text-destructive' : result.regretProbability > 40 ? 'text-secondary' : 'text-success'}`}>
                        {result.regretProbability}% <span className="text-xs uppercase opacity-40 ml-1">Regret Rank</span>
                      </span>
                    </div>

                    <div className="relative h-6 bg-black/40 rounded-full p-1.5 border border-white/10 shadow-inner overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full relative ${result.regretProbability > 60 ? 'bg-destructive' : result.regretProbability > 40 ? 'bg-secondary' : 'bg-success'
                          }`}
                        initial={{ width: 0 }} animate={{ width: `${result.regretProbability}%` }} transition={{ duration: 2, ease: "circOut" }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-bold tracking-widest">
                        Calculation based on liquid reserves (₹{mockUser.currentSavings.toLocaleString()}) vs acquisition cost.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <div className="absolute -top-3 -right-3 p-3 opacity-10 bg-primary/20 rounded-full">
                      <Bot size={40} className="text-primary" />
                    </div>
                    <div className="glass-cyber bg-black/40 rounded-3xl p-8 border border-white/5 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                        <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em]">AI LOGIC STREAM</p>
                      </div>
                      <p className="text-xl text-white/90 leading-relaxed font-medium font-display italic">
                        "{result.reasoning}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getVerdictIcon(verdict: string) {
  if (verdict.includes('Approved')) return <CheckCircle className="text-success" size={40} />;
  if (verdict.includes('Delay')) return <Clock className="text-secondary" size={40} />;
  return <AlertTriangle className="text-destructive" size={40} />;
}

function getVerdictGlow(verdict: string) {
  if (verdict.includes('Approved')) return 'neon-border-success lg:shadow-[0_0_50px_rgba(34,197,94,0.1)]';
  if (verdict.includes('Delay')) return 'neon-border-blue lg:shadow-[0_0_50px_rgba(59,130,246,0.1)]';
  return 'neon-border-pink lg:shadow-[0_0_50px_rgba(244,114,182,0.1)]';
}
